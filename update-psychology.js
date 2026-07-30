const fs = require('fs');
let content = fs.readFileSync('index.html', 'utf8');

// Title / Metadata
content = content.replace(/Obesidade, Saúde da Mulher e Convênios/g, 'Ansiedade, Depressão e Saúde Mental');
content = content.replace(/obesidade, metabolismo, saúde da mulher na menopausa e doenças crônicas/g, 'ansiedade, depressão, estresse, autoconhecimento e regulação emocional');
content = content.replace(/obesidade, metabolismo, saúde da mulher/g, 'ansiedade, depressão, estresse, autoconhecimento');
content = content.replace(/emagrecimento, reeducação alimentar/g, 'terapia cognitivo-comportamental, saúde mental, bem-estar');
content = content.replace(/Dietician/g, 'Psychology');
content = content.replace(/Endocrine/g, 'MentalHealth');

// Hero
content = content.replace(/Obesidade &amp; Metabolismo/g, 'Ansiedade &amp; Depressão');
content = content.replace(/obesidade, saúde da mulher e convênios de saúde\./g, 'ansiedade, depressão e desenvolvimento pessoal.');
content = content.replace(/Dra\. Ana Luiza/g, 'Leticia Garcia');

// Sobre
content = content.replace(/conquistar autonomia alimentar, atingir seus objetivos estéticos ou de rendimento/g, 'desenvolver habilidades de enfrentamento, melhorar sua saúde mental e alcançar seus objetivos pessoais');
content = content.replace(/obesidade, doenças crônicas e questões de saúde da mulher/g, 'transtornos de ansiedade, depressão e questões de autoestima');
content = content.replace(/sem sacrificar o bem-estar mental\./g, 'priorizando sempre o seu bem-estar emocional e psicológico.');

// Filosofia
content = content.replace(/Alimentação Sem Frustrações, Resultados Sem Neurose/g, 'Mudança Sem Frustrações, Resultados Sustentáveis');
content = content.replace(/não apenas passa dietas\./g, 'não apenas escuta, mas intervém.');
content = content.replace(/Alimentar-se vai muito além de planilhas de calorias e listas de restrições\./g, 'A psicoterapia vai muito além de apenas desabafar.');
content = content.replace(/Meu compromisso é te dar apoio e conhecimento prático\./g, 'Meu compromisso é te dar apoio e ferramentas práticas para lidar com a vida.');
content = content.replace(/O que comer, a maioria das pessoas já sabe\./g, 'O que fazer, muitas vezes já sabemos.');
content = content.replace(/O desafio é <strong>aprender como comer<\/strong> de maneira <strong>equilibrada<\/strong> e que realmente <strong>funcione na rotina<\/strong>\./g, 'O desafio é <strong>aprender a lidar com as emoções</strong> de maneira <strong>equilibrada</strong> e que realmente <strong>funcione na rotina</strong>.');
content = content.replace(/Muitos problemas com a alimentação <strong>não se resolvem<\/strong> só com um cardápio pronto\./g, 'Muitos problemas emocionais <strong>não se resolvem</strong> sozinhos ou apenas com conselhos de amigos.');
content = content.replace(/Regras extremas falham a longo prazo\. Focamos em desenvolver sua autonomia para comer de tudo com liberdade e saúde\./g, 'Evitar os problemas falha a longo prazo. Focamos em desenvolver sua autonomia para lidar com a vida com mais liberdade e resiliência.');
content = content.replace(/<strong>entender os motivos<\/strong> por trás das escolhas alimentares e <strong>ajudar o paciente<\/strong> a lidar com essas questões de <strong>forma prática no dia a dia<\/strong>\./g, '<strong>entender os padrões</strong> de pensamento e comportamento, e <strong>ajudar o paciente</strong> a modificar o que não funciona mais de <strong>forma prática</strong>.');

// Especialidades
content = content.replace(/Saúde da Mulher/g, 'Autoconhecimento');
content = content.replace(/Acompanhamento psicológico especializado para menopausa, endometriose e as principais fases hormonais da vida da mulher\./g, 'Apoio especializado para fortalecer a autoestima, promover o autoconhecimento e lidar com transições de vida.');
content = content.replace(/Emagrecimento/g, 'Tratamento da Ansiedade');
content = content.replace(/Processo de perda de gordura sustentável baseado na ciência metabólica\. Sem dietas restritivas ou medicamentos agressivos\./g, 'Estratégias baseadas em evidências para o manejo e redução da ansiedade no dia a dia, promovendo maior controle emocional.');
content = content.replace(/Doenças Crônicas &amp; Bariátrica/g, 'Manejo da Depressão');
content = content.replace(/Acompanhamento psicológico para diabetes, hipertensão e outras condições crônicas, além de suporte completo no pré e pós-operatório bariátrico\./g, 'Acompanhamento focado na reativação comportamental e reestruturação cognitiva para superar quadros depressivos.');
content = content.replace(/Reeducação Alimentar/g, 'Regulação Emocional');
content = content.replace(/Desenvolvimento de hábitos duradouros e prazerosos\. Aprenda a comer de tudo de forma equilibrada e com consciência psicológico\./g, 'Desenvolvimento de habilidades para identificar, compreender e regular emoções de forma saudável e adaptativa.');
content = content.replace(/Mudança de Comportamento/g, 'Modificação de Padrões');
content = content.replace(/Abordagem integrativa para tratar a fome emocional, compulsão, ansiedade alimentar e desmitificar crenças sobre alimentos "proibidos"\./g, 'Trabalho focado em identificar padrões comportamentais disfuncionais e substituí-los por hábitos que geram bem-estar e qualidade de vida.');

// Timeline
content = content.replace(/🍏/g, '🧠');
content = content.replace(/Plano Alimentar Exclusivo/g, 'Plano Terapêutico');

// Beneficios
content = content.replace(/Plano Alimentar Personalizado/g, 'Plano Terapêutico Personalizado');
content = content.replace(/Cardápio estruturado para suas preferências e objetivos, de fácil adesão e com opções versáteis de substituição\./g, 'Estratégias terapêuticas estruturadas para suas necessidades e objetivos, de fácil adesão e aplicação no dia a dia.');
content = content.replace(/Avaliação psicológico Remota/g, 'Avaliação Psicológica Online');
content = content.replace(/Orientação para coleta de medidas, acompanhamento de evolução física e análise detalhada do seu perfil psicológico\./g, 'Orientação cuidadosa, acompanhamento da evolução emocional e análise detalhada do seu perfil psicológico.');
content = content.replace(/Estratégias psicológicas planejadas para durar, gerando mudanças consistentes e melhora real na saúde e na estética\./g, 'Estratégias baseadas na TCC, gerando mudanças consistentes e melhora real na saúde mental e qualidade de vida.');

// Instagram
content = content.replace(/Conteúdo Diário e Dicas Saudáveis/g, 'Conteúdo Diário e Saúde Mental');

// FAQ
content = content.replace(/estruturamos os primeiros pilares do seu plano alimentar\./g, 'estruturamos os primeiros pilares do seu plano terapêutico.');
content = content.replace(/Orientamos você a coletar suas próprias medidas \(circunferências e peso\) ou nos baseamos em fotos de evolução física e indicadores subjetivos de performance e bem-estar para acompanhar seus resultados\./g, 'Avaliamos indicadores subjetivos de bem-estar, melhora nos sintomas e progresso em direção aos seus objetivos para acompanhar seus resultados clínicos.');
content = content.replace(/O plano alimentar é entregue na hora da consulta\?/g, 'As estratégias são passadas na hora da consulta?');
content = content.replace(/o plano alimentar final e os guias práticos/g, 'os materiais de apoio da TCC e registros de pensamentos');
content = content.replace(/com receitas de apoio exclusivas/g, 'com técnicas exclusivas');

// Booking Form
content = content.replace(/Emagrecimento Saudável/g, 'Tratamento de Ansiedade');
content = content.replace(/Saúde da Mulher \(Menopausa\/Endometriose\)/g, 'Tratamento de Depressão');
content = content.replace(/Controle de Doenças Crônicas/g, 'Autoconhecimento e Autoestima');
content = content.replace(/Reeducação Alimentar/g, 'Desenvolvimento Pessoal');
content = content.replace(/Acompanhamento Pós-Bariátrica/g, 'Regulação Emocional');
content = content.replace(/Tratar Compulsão\/Fome Emocional/g, 'Mudança de Hábitos');

// Footer
content = content.replace(/Psicologia Clínica para Obesidade, Saúde da Mulher, Doenças Crônicas e Convênios de Saúde\./g, 'Psicologia Clínica focada em TCC, saúde mental, ansiedade e depressão.');

// Fix any leftover "psicológico" typos from earlier regex replacements that should be psychological or therapy terms
content = content.replace(/consciência psicológico/g, 'consciência psicológica');
content = content.replace(/Avaliação psicológico/g, 'Avaliação Psicológica');

fs.writeFileSync('index.html', content);
console.log('Update complete');
