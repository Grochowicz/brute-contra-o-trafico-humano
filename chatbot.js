/* Assistente Sirius — arquivo separado. Não grava conversas. */
const SIRIUS_CONTACTS_HTML = `
  <p><b>Embaixada do Brasil em Bangkok (Camboja atendido por Bangkok)</b><br>
  +66 2 679-8567 / +66 2 679-8568<br>
  consular.bangkok@itamaraty.gov.br</p>
  <p><b>Plantão consular (emergências extremas)</b><br>+55 (61) 98260-0610</p>
  <p><b>Ministério da Justiça – Tráfico de Pessoas</b><br>
  +55 (61) 2025-9663<br>traficodepessoas@mj.gov.br</p>
  <p class="small muted">Confirme os dados por canal oficial quando for seguro.</p>`;

const SIRIUS_RETURN_HTML = `
  <p>O retorno é avaliado caso a caso. Em resumo:</p>
  <ul>
    <li>Fale com a assistência consular e peça atendimento reservado.</li>
    <li>Conte necessidades urgentes (segurança, saúde, documentos retidos).</li>
    <li>Peça avaliação de documentação e repatriação.</li>
    <li>Se aprovado, o retorno é organizado com apoio no Brasil.</li>
  </ul>
  <p>Você pode pedir orientação mesmo sem passaporte ou dinheiro.</p>
  <p>O <cite>Decreto nº 5.017/2004</cite> (Protocolo de Palermo), art. 8, prevê facilitar o regresso com atenção à segurança e emitir documento de viagem quando ele faltar. A <cite>Lei nº 13.344/2016, art. 6º, § 2º</cite>, põe a assistência imediata no exterior a cargo da rede consular.</p>`;

const siriusReplies = {
  welcome: {
    html: `<p>Olá. Eu sou o <b>Assistente Sirius</b>.</p>
      <p>Posso te ajudar a encontrar orientação neste espaço — no seu ritmo, sem pedir nome ou documentos.</p>
      <p><b>Você está em perigo agora?</b></p>`,
    chips: [
      {label:'Sim, estou em perigo', action:'danger'},
      {label:'Não neste momento', action:'safe'},
      {label:'Ver contatos', action:'contacts'},
      {label:'Como voltar ao Brasil?', action:'return'}
    ]
  },
  danger: {
    html: `<p>Se houver risco imediato, tente chegar a um local público ou serviço de saúde confiável <b>só se isso não aumentar o perigo</b>.</p>
      <p>Para brasileiros em emergência extrema no exterior, há o <b>plantão consular: +55 (61) 98260-0610</b>.</p>
      <p>Se alguém monitora este celular, considere usar outro dispositivo ou pedir ajuda presencial a alguém de confiança.</p>
      <p>Quando estiver um pouco mais seguro(a), posso mostrar próximos passos.</p>`,
    chips: [
      {label:'Ver todos os contatos', action:'contacts'},
      {label:'Continuar com orientação', action:'safe'},
      {label:'Saída rápida da página', action:'exit'}
    ]
  },
  safe: {
    html: `<p>Certo. O que mais se aproxima da sua situação?</p>
      <p>Escolha um botão ou escreva com suas palavras.</p>`,
    chips: [
      {label:'Golpes / scam forçado', action:'sit:scam'},
      {label:'Violência ou abuso', action:'sit:abuse'},
      {label:'Não posso sair / documentos retidos', action:'sit:confined'},
      {label:'Já consegui sair', action:'sit:escaped'},
      {label:'Não tenho certeza', action:'sit:other'},
      {label:'Ver contatos', action:'contacts'}
    ]
  },
  sit_scam: {
    html: `<p><b>Golpes virtuais forçados</b> podem ser exploração / tráfico. Você merece proteção, independentemente do que foi obrigado(a) a fazer.</p>
      <p>Priorize contato discreto com assistência consular ou organização especializada. Evite confrontar responsáveis ou anunciar planos de saída se isso aumentar o risco.</p>
      <p><cite>Código Penal, art. 149-A</cite> descreve esse tipo de exploração como tráfico de pessoas. Se você foi obrigado(a) a cometer um crime, o <cite>art. 22 do Código Penal</cite> trata da coação irresistível — quem decide isso é a defesa, no caso concreto.</p>`,
    chips: [
      {label:'Ver contatos', action:'contacts'},
      {label:'Como funciona o retorno?', action:'return'},
      {label:'Abrir orientação no site', action:'nav:orientacao.html?tipo=scam'},
      {label:'Outra situação', action:'safe'}
    ]
  },
  sit_abuse: {
    html: `<p>Se houve violência: <b>saúde e segurança vêm primeiro</b>.</p>
      <p>Se for seguro, busque atendimento médico ou emergência local. Avise a assistência consular brasileira e peça acolhimento, orientação e avaliação de risco.</p>
      <p>A <cite>Lei nº 13.344/2016, art. 6º, I e § 3º</cite>, inclui assistência de saúde física e psicológica entre as medidas de proteção à vítima.</p>`,
    chips: [
      {label:'Ver contatos', action:'contacts'},
      {label:'Estou em perigo agora', action:'danger'},
      {label:'Abrir orientação no site', action:'nav:orientacao.html?tipo=abuse'},
      {label:'Outra situação', action:'safe'}
    ]
  },
  sit_confined: {
    html: `<p>Se está sob vigilância ou sem liberdade: <b>não se coloque em mais perigo</b> para pedir ajuda.</p>
      <p>Evite confrontar quem controla o local. Se possível, use um aparelho não monitorado. Peça à assistência consular um plano seguro de saída e acolhimento.</p>
      <p>Pela <cite>Lei nº 13.344/2016, art. 6º, § 2º</cite>, essa assistência imediata no exterior cabe à rede consular, mesmo sem documentos regulares.</p>`,
    chips: [
      {label:'Ver contatos', action:'contacts'},
      {label:'Estou em perigo agora', action:'danger'},
      {label:'Abrir orientação no site', action:'nav:orientacao.html?tipo=confined'},
      {label:'Outra situação', action:'safe'}
    ]
  },
  sit_escaped: {
    html: `<p>Você conseguiu sair. Não precisa resolver tudo de uma vez.</p>
      <p>Tente permanecer em ambiente seguro, evite compartilhar seu endereço com quem possa representar risco, e peça à assistência consular acolhimento, saúde, documentos e avaliação de retorno.</p>
      <p>A <cite>Lei nº 13.344/2016, art. 6º, II</cite>, prevê acolhimento e abrigo provisório como parte da proteção à vítima.</p>`,
    chips: [
      {label:'Ver contatos', action:'contacts'},
      {label:'Como funciona o retorno?', action:'return'},
      {label:'Abrir orientação no site', action:'nav:orientacao.html?tipo=escaped'},
      {label:'Outra situação', action:'safe'}
    ]
  },
  sit_other: {
    html: `<p>Não é preciso saber o “nome jurídico” do que aconteceu.</p>
      <p>Promessas falsas de trabalho, ameaças, retenção de documentos, dívidas impostas ou restrição de liberdade merecem avaliação especializada. Peça apoio consular ou de proteção compartilhando só o que for seguro contar.</p>
      <p>A <cite>Lei nº 13.344/2016, art. 2º, VI</cite>, diz que a atenção à vítima não depende de colaborar com investigação ou processo.</p>`,
    chips: [
      {label:'Ver contatos', action:'contacts'},
      {label:'Como funciona o retorno?', action:'return'},
      {label:'Abrir orientação no site', action:'nav:orientacao.html?tipo=other'},
      {label:'Outra situação', action:'safe'}
    ]
  },
  contacts: {
    html: `<p>Canais oficiais úteis:</p>${SIRIUS_CONTACTS_HTML}
      <p>Não listamos endereços de abrigos sem validação — um endereço errado pode aumentar o risco. Peça encaminhamento seguro ao consulado.</p>`,
    chips: [
      {label:'Copiar plantão consular', action:'copy:+55 61 98260-0610'},
      {label:'Copiar Bangkok', action:'copy:+66 2 679-8567'},
      {label:'Como voltar ao Brasil?', action:'return'},
      {label:'Abrir página de apoio', action:'nav:apoio.html'},
      {label:'Voltar ao início do chat', action:'welcome'}
    ]
  },
  return: {
    html: SIRIUS_RETURN_HTML + `<p>Quer que eu abra a página completa de repatriação?</p>`,
    chips: [
      {label:'Abrir repatriação no site', action:'nav:retorno.html'},
      {label:'Ver contatos', action:'contacts'},
      {label:'Escolher outra situação', action:'safe'},
      {label:'Voltar ao início do chat', action:'welcome'}
    ]
  },
  privacy: {
    html: `<p>Este protótipo <b>não grava</b> conversas, não usa cookies de rastreio e não pede nome, telefone ou documentos.</p>
      <p>Suas escolhas ficam só na memória desta página enquanto ela estiver aberta. Use <b>Saída rápida</b> se precisar limpar a tela imediatamente.</p>`,
    chips: [
      {label:'Continuar', action:'safe'},
      {label:'Ver contatos', action:'contacts'},
      {label:'Saída rápida', action:'exit'}
    ]
  },
  shelter: {
    html: `<p>Por segurança, <b>não publicamos endereços de abrigos</b> sem confirmação de disponibilidade e critérios de acolhimento.</p>
      <p>Peça à assistência consular encaminhamento para uma organização de proteção com atendimento confirmado.</p>`,
    chips: [
      {label:'Ver contatos', action:'contacts'},
      {label:'Como voltar ao Brasil?', action:'return'},
      {label:'Voltar', action:'safe'}
    ]
  },
  fallback: {
    html: `<p>Entendi. Posso ajudar melhor com um destes caminhos:</p>
      <ul>
        <li>orientação por tipo de situação</li>
        <li>contatos oficiais</li>
        <li>como pode funcionar o retorno ao Brasil</li>
      </ul>
      <p>Use um botão ou tente palavras como: <i>contato, consulado, repatriação, perigo, abrigo, golpe, violência</i>.</p>`,
    chips: [
      {label:'Escolher situação', action:'safe'},
      {label:'Ver contatos', action:'contacts'},
      {label:'Repatriação', action:'return'},
      {label:'Estou em perigo', action:'danger'}
    ]
  }
};

function escapeHtml(str){
  return String(str)
    .replace(/&/g,'&amp;').replace(/</g,'&lt;')
    .replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

function mountSirius(){
  const fab=document.createElement('button');
  fab.className='sirius-fab';
  fab.id='siriusFab';
  fab.type='button';
  fab.setAttribute('aria-controls','siriusPanel');
  fab.setAttribute('aria-expanded','false');
  fab.innerHTML='<span class="dot" aria-hidden="true"></span> Assistente Sirius';

  const panel=document.createElement('div');
  panel.className='sirius-panel';
  panel.id='siriusPanel';
  panel.setAttribute('role','dialog');
  panel.setAttribute('aria-label','Assistente Sirius');
  panel.innerHTML=`
    <div class="sirius-head">
      <div class="who">
        <div class="sirius-avatar" aria-hidden="true">S</div>
        <div>
          <strong>Assistente Sirius</strong>
          <span>Orientação segura · sem cadastro</span>
        </div>
      </div>
      <div class="sirius-head-actions">
        <button class="sirius-iconbtn" type="button" id="siriusExit" title="Sair rapidamente">Saída ×</button>
        <button class="sirius-iconbtn ghost" type="button" id="siriusClose" aria-label="Fechar chat">Fechar</button>
      </div>
    </div>
    <div class="sirius-msgs" id="siriusMsgs" aria-live="polite"></div>
    <div class="sirius-foot">
      <form class="sirius-form" id="siriusForm">
        <input id="siriusInput" type="text" placeholder="Escreva ou use os botões…" autocomplete="off" />
        <button type="submit">Enviar</button>
      </form>
      <div class="sirius-note">Sirius não grava conversas e não pede nome ou documentos. Orientação geral — confirme com canais oficiais.</div>
    </div>`;

  document.body.append(fab, panel);
  fab.addEventListener('click', ()=>toggleSirius());
  panel.querySelector('#siriusExit').addEventListener('click', quickExit);
  panel.querySelector('#siriusClose').addEventListener('click', ()=>toggleSirius(false));
  panel.querySelector('#siriusForm').addEventListener('submit', sendSiriusText);
  window.openSirius=()=>toggleSirius(true);
}

function toggleSirius(forceOpen){
  const panel=document.getElementById('siriusPanel');
  const fab=document.getElementById('siriusFab');
  const open = forceOpen===true ? true : forceOpen===false ? false : !panel.classList.contains('open');
  panel.classList.toggle('open', open);
  fab.setAttribute('aria-expanded', open ? 'true' : 'false');
  if(open){
    const box=document.getElementById('siriusMsgs');
    if(!box.dataset.started){
      box.dataset.started='1';
      pushSirius('welcome');
    }
    setTimeout(()=>document.getElementById('siriusInput').focus(), 50);
  }
}

function pushSirius(key, asUserText){
  const conf=siriusReplies[key] || siriusReplies.fallback;
  const box=document.getElementById('siriusMsgs');
  if(asUserText){
    const u=document.createElement('div');
    u.className='sirius-msg user';
    u.innerHTML=`<span class="label">Você</span>${escapeHtml(asUserText)}`;
    box.appendChild(u);
  }
  const b=document.createElement('div');
  b.className='sirius-msg bot';
  let chips='';
  if(conf.chips && conf.chips.length){
    chips='<div class="sirius-chips">'+conf.chips.map(c=>
      `<button type="button" class="sirius-chip" data-action="${escapeHtml(c.action)}">${escapeHtml(c.label)}</button>`
    ).join('')+'</div>';
  }
  b.innerHTML=`<span class="label">Sirius</span>${conf.html}${chips}`;
  b.querySelectorAll('.sirius-chip').forEach(btn=>{
    btn.addEventListener('click', ()=>siriusAction(btn.dataset.action, btn));
  });
  box.appendChild(b);
  box.scrollTop=box.scrollHeight;
}

function pushUserBubble(text){
  const box=document.getElementById('siriusMsgs');
  const u=document.createElement('div');
  u.className='sirius-msg user';
  u.innerHTML=`<span class="label">Você</span>${escapeHtml(text)}`;
  box.appendChild(u);
}

function siriusAction(action, btn){
  const label=btn ? btn.textContent : action;
  if(action==='exit'){ quickExit(); return; }
  if(action.startsWith('copy:')){
    const num=action.slice(5);
    pushUserBubble(label);
    copyText(num);
    const b=document.createElement('div');
    b.className='sirius-msg bot';
    b.innerHTML=`<span class="label">Sirius</span><p>Se a cópia não funcionar, anote: <b>${escapeHtml(num)}</b></p>
      <div class="sirius-chips">
        <button type="button" class="sirius-chip" data-action="contacts">Ver contatos</button>
        <button type="button" class="sirius-chip" data-action="return">Repatriação</button>
        <button type="button" class="sirius-chip" data-action="welcome">Início</button>
      </div>`;
    b.querySelectorAll('.sirius-chip').forEach(el=>{
      el.addEventListener('click', ()=>siriusAction(el.dataset.action, el));
    });
    document.getElementById('siriusMsgs').appendChild(b);
    document.getElementById('siriusMsgs').scrollTop=99999;
    return;
  }
  if(action.startsWith('nav:')){
    window.location.href=action.slice(4);
    return;
  }
  if(action.startsWith('sit:')){
    pushSirius('sit_'+action.slice(4), label);
    return;
  }
  pushSirius(action, label);
}

function sendSiriusText(e){
  e.preventDefault();
  const input=document.getElementById('siriusInput');
  const text=input.value.trim();
  if(!text) return false;
  input.value='';
  pushSirius(matchSiriusIntent(text), text);
  return false;
}

function matchSiriusIntent(raw){
  const t=raw.toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g,'');

  if(/(perig|emergenc|risco|me mat|ajuda urgente|agora|policia|socorro)/.test(t)) return 'danger';
  if(/(privac|dado|grava|salva|anonim|seguro falar|nome|documento)/.test(t)) return 'privacy';
  if(/(abrigo|albergue|onde dormir|moradia|casa de apoio)/.test(t)) return 'shelter';
  if(/(contato|telefone|ligar|embaixada|consul|plantao|itamaraty|email|e-mail|ministerio|justica)/.test(t)) return 'contacts';
  if(/(repatri|voltar|retorno|brasil|passaporte|viajar|voo|documentacao)/.test(t)) return 'return';
  if(/(golpe|scam|fraude|cassino|call center|central)/.test(t)) return 'sit_scam';
  if(/(violen|abuso|estupro|agress|ameac|bateram|bati)/.test(t)) return 'sit_abuse';
  if(/(sai do|consegui sair|fug|escapei|ja sai)/.test(t)) return 'sit_escaped';
  if(/(nao posso sair|confin|vigil|documento retid|passaporte retid|preso|cativeiro)/.test(t)) return 'sit_confined';
  if(/(nao sei|incerte|outra situ|o que fazer|ajuda|orient)/.test(t)) return 'sit_other';
  if(/(oi|ola|bom dia|boa tarde|menu|inicio)/.test(t)) return 'welcome';
  return 'fallback';
}

if(document.readyState==='loading') document.addEventListener('DOMContentLoaded', mountSirius);
else mountSirius();
