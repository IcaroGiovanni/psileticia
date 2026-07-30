const fs = require('fs');
let content = fs.readFileSync('index.html', 'utf8');

// Replace Hero section description
content = content.replace(/<p class="hero-description">[\s\S]*?<\/p>/, '<p class="hero-description">\n           MEU NOME É LETICIA GARCIA, SOU PSICÓLOGA CLÍNICA, E ATENDO PELA ABORDAGEM TCC (TERAPIA COGNITIVO-COMPORTAMENTAL) PARA PODER GUIAR MEUS PACIENTES EM UMA JORNADA DE AUTODESCOBERTA E FORTALECIMENTO EMOCIONAL. ACREDITO QUE A BASE DE QUALQUER MUDANÇA REAL É O ALINHAMENTO ENTRE QUEM SOMOS E O QUE VALORIZAMOS. MEU PAPEL É CAMINHAR AO SEU LADO, AJUDANDO VOCÊ A DESBRAVAR SEUS PRÓPRIOS VALORES E APRENDER A NAVEGAR A PRÓPRIA VIDA COM MAIS SENTIDO, CONSCIÊNCIA E ESTRATÉGIA.\n          </p>');

// Replace Sobre section headers
content = content.replace(/<h2 class="section-title">Alimentação, Saúde e Qualidade de Vida<\/h2>/, '<h2 class="section-title">Autodescoberta e Fortalecimento Emocional</h2>');
content = content.replace(/<h3 class="bio-subtitle">Sua jornada para uma vida mais saudável começa aqui<\/h3>/, '<h3 class="bio-subtitle">Caminhando ao seu lado</h3>');

// Replace Sobre bio texts
let newBioText = '<p class="bio-text">\n              MEU NOME É LETICIA GARCIA, SOU PSICÓLOGA CLÍNICA, E ATENDO PELA ABORDAGEM TCC (TERAPIA COGNITIVO-COMPORTAMENTAL) PARA PODER GUIAR MEUS PACIENTES EM UMA JORNADA DE AUTODESCOBERTA E FORTALECIMENTO EMOCIONAL. ACREDITO QUE A BASE DE QUALQUER MUDANÇA REAL É O ALINHAMENTO ENTRE QUEM SOMOS E O QUE VALORIZAMOS. MEU PAPEL É CAMINHAR AO SEU LADO, AJUDANDO VOCÊ A DESBRAVAR SEUS PRÓPRIOS VALORES E APRENDER A NAVEGAR A PRÓPRIA VIDA COM MAIS SENTIDO, CONSCIÊNCIA E ESTRATÉGIA.\n            </p>';

content = content.replace(/<p class="bio-text">\s*Psicóloga Clínica dedicada[\s\S]*?<\/p>\s*<p class="bio-text">\s*Quer emagrecer[\s\S]*?<\/p>/, newBioText);

// Remove links from nav
content = content.replace(/<li><a href="#depoimentos" class="nav-link">Avaliações<\/a><\/li>\n?/g, '');
content = content.replace(/<li><a href="#depoimentos" class="mobile-link">Avaliações<\/a><\/li>\n?/g, '');

// Remove the two sections
let lines = content.split('\n');
let newLines = [];
let skip = false;
for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes('<section id="depoimentos"')) {
        skip = true;
    }
    if (lines[i].includes('<section id="convenios"')) {
        skip = false;
    }
    if (!skip) {
        newLines.push(lines[i]);
    }
}
content = newLines.join('\n');

fs.writeFileSync('index.html', content);
console.log('Update complete.');
