const fs = require('fs');
let content = fs.readFileSync('index.html', 'utf8');

// The new TCC section
const tccSection = `
    <!-- TCC SECTION -->
    <section id="tcc" class="especialidades-section section-padding">
      <div class="container">
        <div class="section-header text-center reveal-fade">
          <span class="section-tagline tag-teal">A Abordagem</span>
          <h2 class="section-title">A Terapia Cognitivo-Comportamental</h2>
          <p class="section-subtitle" style="margin-top:15px; color:var(--color-text-muted); max-width:600px; margin-inline:auto;">
            A TCC é uma abordagem prática, focada no presente e baseada em evidências científicas, projetada para te ajudar a entender a relação entre o que você pensa, sente e faz.
          </p>
          <div class="title-bar"></div>
        </div>

        <div class="especialidades-grid grid-3">
          <article class="specialty-card card-hover-lift reveal-fade" style="transition-delay: 0.1s;">
            <div class="card-top-accent"></div>
            <div class="specialty-icon" style="font-size:32px; display:flex; align-items:center; justify-content:center;">💭</div>
            <h3 class="specialty-title">Pensamentos</h3>
            <p class="specialty-desc">Identificamos padrões de pensamento distorcidos que geram sofrimento e aprendemos a reestruturá-los de forma mais realista e funcional.</p>
          </article>
          <article class="specialty-card card-hover-lift reveal-fade" style="transition-delay: 0.2s;">
            <div class="card-top-accent"></div>
            <div class="specialty-icon" style="font-size:32px; display:flex; align-items:center; justify-content:center;">❤️</div>
            <h3 class="specialty-title">Emoções</h3>
            <p class="specialty-desc">Desenvolvemos estratégias sólidas de regulação emocional para manejar a ansiedade, a tristeza profunda, a raiva e o estresse cotidiano.</p>
          </article>
          <article class="specialty-card card-hover-lift reveal-fade" style="transition-delay: 0.3s;">
            <div class="card-top-accent"></div>
            <div class="specialty-icon" style="font-size:32px; display:flex; align-items:center; justify-content:center;">🚀</div>
            <h3 class="specialty-title">Comportamentos</h3>
            <p class="specialty-desc">Modificamos hábitos disfuncionais através de ferramentas práticas, ativação comportamental e exposição gradual às dificuldades.</p>
          </article>
        </div>
      </div>
    </section>
`;

// Replace the old convenios section block with the new TCC block
// Note: We'll do this by matching the <section id="convenios"... up to the closing </section>
const conveniosRegex = /<section id="convenios"[\s\S]*?<\/section>/;
content = content.replace(conveniosRegex, tccSection);

// Update nav links
content = content.replace(/<li><a href="#convenios" class="nav-link highlight-nav-link">Convênios<\/a><\/li>/g, '<li><a href="#tcc" class="nav-link highlight-nav-link">A TCC</a></li>');
content = content.replace(/<li><a href="#convenios" class="mobile-link highlight-nav-link">Convênios<\/a><\/li>/g, '<li><a href="#tcc" class="mobile-link highlight-nav-link">A TCC</a></li>');

// Update Hero Badge
content = content.replace(/<span class="badge-text">Convênios de Saúde<\/span>/g, '<span class="badge-text">Terapia Baseada em Evidências</span>');

fs.writeFileSync('index.html', content);
console.log('TCC section replaced successfully.');
