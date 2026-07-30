
const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'index.html');

// Read the file as a Buffer (raw bytes)
const rawBuffer = fs.readFileSync(filePath);

// The file has a UTF-8 BOM (EF BB BF) and triple-encoded content
// Strategy: decode latin1 -> re-encode as latin1 bytes -> decode as UTF-8 (repeat as needed)

function fixEncoding(buffer) {
  // Remove BOM if present
  let start = 0;
  if (buffer[0] === 0xEF && buffer[1] === 0xBB && buffer[2] === 0xBF) {
    start = 3;
    console.log('BOM detected, skipping first 3 bytes');
  }
  
  let bytes = buffer.slice(start);
  
  // The content was saved multiple times with wrong encoding
  // Each time: interpret UTF-8 bytes as latin1, then save as UTF-8 again
  // To reverse: decode as latin1 string, get bytes back as latin1, decode as UTF-8
  
  function reverseOnce(buf) {
    // Decode bytes as latin1 (1:1 byte to char mapping)
    const latin1String = buf.toString('latin1');
    // Get the "original" bytes back (each char code = byte value)
    const originalBytes = Buffer.from(latin1String, 'latin1');
    return originalBytes;
  }
  
  // Try multiple passes and check if text improves
  let current = bytes;
  
  for (let pass = 1; pass <= 3; pass++) {
    const reversed = reverseOnce(current);
    const asUtf8 = reversed.toString('utf8');
    
    // Check if we have common Portuguese chars (good sign)
    const hasPortuguese = /[ãõçáéíóúâêô]/i.test(asUtf8);
    // Check for garbage (bad sign)  
    const hasGarbage = /ÃƒÂ/.test(asUtf8) || /ÃÆÃÂ/.test(asUtf8);
    
    console.log(`Pass ${pass}: hasPortuguese=${hasPortuguese}, hasGarbage=${hasGarbage}`);
    console.log(`Sample: ${asUtf8.substring(300, 400)}`);
    
    if (hasPortuguese && !hasGarbage) {
      console.log(`\nSuccess at pass ${pass}!`);
      return asUtf8;
    }
    
    current = reversed;
  }
  
  // If not successful, try the final result anyway
  return current.toString('utf8');
}

const fixed = fixEncoding(rawBuffer);

// Save without BOM
fs.writeFileSync(filePath, fixed, 'utf8');
console.log('\nFile saved successfully!');
console.log('Sample of fixed content:');
console.log(fixed.substring(200, 500));
