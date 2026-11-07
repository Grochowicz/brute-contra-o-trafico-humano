/* Privacidade: sem cookies, analytics, armazenamento local, sessão ou envio de formulários.
   As escolhas existem somente na memória desta página enquanto ela está aberta. */

function copyText(text){
  if(navigator.clipboard && window.isSecureContext){
    navigator.clipboard.writeText(text).then(()=>alert('Número copiado.')).catch(()=>alert('Não foi possível copiar automaticamente. Anote: '+text));
  }else{alert('Anote este número: '+text);}
}

function quickExit(){
  document.title=' ';
  document.body.innerHTML=' ';
  try{history.replaceState(null,'','about:blank')}catch(e){}
}

const LAWS_HTML = `
  <div class="callout law">
    <b>O que a legislação brasileira prevê</b>
    <ul class="list">
      <li><cite>Constituição Federal, art. 1º, III, e art. 5º, III</cite> — a dignidade da pessoa humana é fundamento da República, e ninguém será submetido a tratamento desumano ou degradante.</li>
      <li><cite>Lei nº 13.344/2016, art. 1º</cite> — a lei trata do tráfico cometido no Brasil e também do tráfico cometido no exterior contra vítima brasileira. O enfrentamento inclui atenção às vítimas, não só repressão.</li>
      <li><cite>Lei nº 13.344/2016, art. 2º, VI</cite> — a atenção integral às vítimas diretas e indiretas independe de nacionalidade e de colaboração em investigações ou processos judiciais.</li>
      <li><cite>Lei nº 13.344/2016, art. 6º</cite> — a proteção compreende assistência jurídica, social, de trabalho e emprego e de saúde; acolhimento e abrigo provisório; preservação da intimidade e da identidade; prevenção à revitimização; atendimento humanizado; e informação sobre procedimentos. O § 3º inclui recuperação física e psicológica.</li>
      <li><cite>Lei nº 13.344/2016, art. 6º, § 2º</cite> — no exterior, a assistência imediata a vítimas brasileiras está a cargo da rede consular brasileira, independentemente da situação migratória, da ocupação ou de outro status.</li>
      <li><cite>Código Penal, art. 149-A</cite> (incluído pela Lei nº 13.344/2016) — é crime agenciar, aliciar, recrutar, transportar, transferir, comprar, alojar ou acolher pessoa, mediante grave ameaça, violência, coação, fraude ou abuso, para exploração sexual, trabalho em condições análogas à de escravo, servidão, remoção de órgãos ou adoção ilegal.</li>
      <li><cite>Código Penal, art. 22</cite> — se o fato é praticado sob coação irresistível, só é punível quem coage. Isso não é uma garantia automática: a avaliação é do caso concreto, com defesa técnica.</li>
      <li><cite>Decreto nº 5.017/2004</cite> — promulga o Protocolo de Palermo. O art. 6 trata de assistência, alojamento, informação sobre direitos, cuidados de saúde e proteção da identidade. O art. 8 determina que o país de nacionalidade facilite o regresso com atenção à segurança e, se faltarem documentos, emita autorização de viagem.</li>
    </ul>
    <p class="small">Citações informativas. Não substituem atendimento consular, da Defensoria Pública ou de advogado.</p>
  </div>`;

document.querySelectorAll('[data-laws]').forEach(el=>{ el.innerHTML=LAWS_HTML; });

function showLocationInfo(){
  const city=document.getElementById('city').value.trim();
  const box=document.getElementById('locationInfo');
  box.classList.remove('hidden');
  box.textContent=city
    ? 'Você informou "'+city+'". Este protótipo não consulta nem envia sua localização. Não há uma lista validada de abrigos por cidade disponível aqui. Para evitar indicar um endereço inseguro, peça à assistência consular encaminhamento para uma organização de proteção com atendimento confirmado.'
    : 'Você pode deixar o campo vazio. A localização exata não é necessária para consultar os contatos e as orientações desta página.';
}
