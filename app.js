// ============================================================
// SkillMatch JS — app.js  (lógica da interface web)
// Este arquivo integra skillmatch.js com o DOM do index.html
// ============================================================

// ── RF09 ─ CLASSE BASE ──────────────────────────────────────
class Vaga {
  constructor(id, empresa, cargo, requisitos, salario, modalidade) {
    this.id        = id;
    this.empresa   = empresa;
    this.cargo     = cargo;
    this.requisitos = requisitos;
    this.salario   = salario;
    this.modalidade = modalidade;
  }

  // RF11 ─ uso do this dentro de método
  exibirResumo() {
    return `[${this.modalidade}] ${this.cargo} na ${this.empresa} — R$ ${this.salario.toLocaleString("pt-BR")}/mês`;
  }
}

// ── RF10 ─ HERANÇA ──────────────────────────────────────────
class VagaFrontEnd extends Vaga {
  constructor(id, empresa, cargo, requisitos, salario, modalidade, nivel) {
    super(id, empresa, cargo, requisitos, salario, modalidade);
    this.nivel = nivel;
  }
  exibirNivel() {
    return `Nível: ${this.nivel}`;
  }
  exibirResumo() {
    return `${super.exibirResumo()} | ${this.exibirNivel()}`;
  }
}

// ── RF02 ─ ARRAY DE VAGAS ───────────────────────────────────
const vagasBase = [
  new VagaFrontEnd(1, "TechStart",    "Dev Front-End Júnior",        ["JavaScript","GitHub","Lógica de Programação","HTML","CSS"],        2800, "Remoto",     "Júnior"),
  new VagaFrontEnd(2, "CodeLab",      "Estágio Front-End",           ["JavaScript","Kanban","GitHub"],                                    1800, "Híbrido",    "Estágio"),
  new VagaFrontEnd(3, "WebSolutions", "Programador JS Júnior",       ["JavaScript","Arrays","Objetos","Funções","Lógica de Programação"], 3000, "Presencial", "Júnior"),
  new VagaFrontEnd(4, "DevHouse",     "Front-End Trainee",           ["HTML","CSS","JavaScript","GitHub","Kanban"],                       2200, "Remoto",     "Trainee"),
];

// ── RF13 ─ CLOSURE: contador de análises ────────────────────
function criarContadorDeAnalises() {
  let total = 0;
  return function () {
    total++;
    return total;
  };
}
const contarAnalise = criarContadorDeAnalises();

// ── FUNÇÕES AUXILIARES ─────────────────────────────────────
/**
 * Normaliza array de strings para lowercase
 * RF08 — map
 */
const normalizar = (arr) => arr.map((h) => h.toLowerCase().trim());

/**
 * RF08 — filter: habilidades da vaga que o candidato possui
 */
function habilidadesEncontradas(habilidades, requisitos) {
  return requisitos.filter((r) =>
    normalizar(habilidades).includes(r.toLowerCase())
  );
}

/**
 * RF05 + RF08 — filter: habilidades da vaga que o candidato NÃO possui
 */
function habilidadesFaltantes(habilidades, requisitos) {
  return requisitos.filter(
    (r) => !normalizar(habilidades).includes(r.toLowerCase())
  );
}

/**
 * RF03 — calcula percentual de compatibilidade
 */
function calcularCompatibilidade(habilidades, requisitos) {
  const atendidos = habilidadesEncontradas(habilidades, requisitos).length;
  return Math.round((atendidos / requisitos.length) * 100);
}

/**
 * RF04 — classifica compatibilidade com if-else
 */
function classificar(pct) {
  if (pct >= 80) return { texto: "Alta compatibilidade",  classe: "cl-high", barClass: "fill-high" };
  else if (pct >= 50) return { texto: "Média compatibilidade", classe: "cl-mid",  barClass: "fill-mid"  };
  else                return { texto: "Baixa compatibilidade", classe: "cl-low",  barClass: "fill-low"  };
}

/**
 * RF08 — map: gera array com resultado de cada vaga
 * RF08 — every: verifica se candidato atende 100% dos requisitos
 */
function analisarVagas(candidatoObj, vagas) {
  return vagas.map((vaga) => {
    const pct         = calcularCompatibilidade(candidatoObj.habilidades, vaga.requisitos);
    const encontradas = habilidadesEncontradas(candidatoObj.habilidades, vaga.requisitos);
    const faltantes   = habilidadesFaltantes(candidatoObj.habilidades, vaga.requisitos);
    const atendeTotal = vaga.requisitos.every((r) =>
      normalizar(candidatoObj.habilidades).includes(r.toLowerCase())
    );
    return { vaga, pct, encontradas, faltantes, atendeTotal };
  });
}

/**
 * RF06 — reduce: encontra a vaga com maior compatibilidade
 */
function melhorVaga(resultados) {
  return resultados.reduce((best, cur) => (cur.pct > best.pct ? cur : best));
}

/**
 * RF07 — recomendação de estudo
 * RF08 — reduce: agrega e deduplicação de habilidades faltantes
 */
function gerarRecomendacao(resultados) {
  const unicas = resultados.reduce((acc, r) => {
    r.faltantes.forEach((h) => { if (!acc.includes(h)) acc.push(h); });
    return acc;
  }, []);

  if (unicas.length === 0) {
    return "🎉 Você atende todos os requisitos das vagas analisadas!";
  }
  return `Priorize estudar: <strong>${unicas.join(", ")}</strong>. Esses conteúdos aparecem nas vagas analisadas.`;
}

/**
 * RF14 — Promise simulada (imita busca em servidor)
 */
function buscarVagasSimuladas() {
  return new Promise((resolve) => {
    setTimeout(() => resolve(vagasBase), 1200);
  });
}


/**
 * RF12 — Callback: ação pós-análise
 */
function finalizarAnalise(nome, callback) {
  console.log("✅ Análise finalizada para:", nome);
  callback(nome);
}

function exibirMensagemFinal(nome) {
  const num = contarAnalise();
  console.log(`💡 ${nome}, revise suas habilidades faltantes.`);
  console.log(`📊 Análise nº ${num} realizada nesta sessão.`);
}

// ── LEITURA DOS INPUTS ──────────────────────────────────────
function lerCandidato() {
  const nome  = document.getElementById("inputNome").value.trim() || "Candidato";
  const exp   = parseInt(document.getElementById("inputExp").value) || 0;
  const raw   = document.getElementById("inputSkills").value;
  const habilidades = raw.split(",").map((h) => h.trim()).filter(Boolean);
  return { nome, area: "Front-End", habilidades, experienciaMeses: exp };
}

// ── ATUALIZA PREVIEW DO CANDIDATO ───────────────────────────
function atualizarPreview(candidatoObj) {
  document.getElementById("displayName").textContent = candidatoObj.nome;
  document.getElementById("displayMeta").textContent =
    `${candidatoObj.area} · ${candidatoObj.experienciaMeses} mês(es) de experiência`;

  const initials = candidatoObj.nome
    .split(" ")
    .map((w) => w[0])
    .join("")
    .substring(0, 2)
    .toUpperCase();
  document.getElementById("avatarEl").textContent = initials;

  const skillsEl = document.getElementById("displaySkills");
  skillsEl.innerHTML = candidatoObj.habilidades
    .map((h) => `<span class="skill-chip">${h}</span>`)
    .join("");
}

// ── RENDERIZA STATS ─────────────────────────────────────────
function renderStats(resultados, candidatoObj) {
  // RF08 — reduce: média de compatibilidade
  const media = Math.round(
    resultados.reduce((s, r) => s + r.pct, 0) / resultados.length
  );
  // RF08 — filter: vagas com alta compat
  const altasCompat = resultados.filter((r) => r.pct >= 80).length;

  const statsEl = document.getElementById("statsRow");
  statsEl.innerHTML = `
    <div class="stat-card">
      <span class="stat-value" style="color:var(--accent)">${resultados.length}</span>
      <span class="stat-label">Vagas analisadas</span>
    </div>
    <div class="stat-card">
      <span class="stat-value" style="color:var(--accent2)">${candidatoObj.habilidades.length}</span>
      <span class="stat-label">Suas habilidades</span>
    </div>
    <div class="stat-card">
      <span class="stat-value" style="color:var(--warn)">${media}%</span>
      <span class="stat-label">Média de compat.</span>
    </div>
    <div class="stat-card">
      <span class="stat-value" style="color:var(--accent)">${altasCompat}</span>
      <span class="stat-label">Alta compat. (≥80%)</span>
    </div>
  `;
  requestAnimationFrame(() => statsEl.classList.add("visible"));
}

// ── RENDERIZA CARDS DE VAGAS ─────────────────────────────── 
function renderResults(resultados, best, recomendacao) {
  const section = document.getElementById("resultsSection");

  // RF08 — find: busca vaga por ID
  const vagaEspecifica = vagasBase.find((v) => v.id === 1);
  console.log("🔍 Vaga encontrada por ID 1:", vagaEspecifica.exibirResumo());

  const cardsHTML = resultados.map((r, i) => {
    const { texto, classe, barClass } = classificar(r.pct);
    const isBest = r.vaga.id === best.vaga.id;
    return `
      <div class="job-card ${isBest ? "best" : ""}" style="animation-delay:${i * 0.08}s">
        <div class="job-card-header">
          <div>
            <div class="company-name">${r.vaga.empresa}</div>
            <div class="job-title">${r.vaga.cargo}</div>
          </div>
          ${isBest ? `<span class="best-badge">⭐ Melhor match</span>` : ""}
        </div>

        <div>
          <div class="compat-label">
            <span>Compatibilidade</span>
            <span>${r.pct}%</span>
          </div>
          <div class="progress-bar">
            <div class="progress-fill ${barClass}" data-width="${r.pct}" style="width:0%"></div>
          </div>
          <div class="classification ${classe}">${texto}</div>
        </div>

        <div class="skill-section">
          <div class="skill-row">
            <span class="skill-row-label">✅ ok</span>
            ${r.encontradas.map((h) => `<span class="tag tag-ok">${h}</span>`).join("") || "<span style='color:var(--txt-muted);font-size:11px'>Nenhuma</span>"}
          </div>
          <div class="skill-row">
            <span class="skill-row-label">❌ faltam</span>
            ${r.faltantes.map((h) => `<span class="tag tag-miss">${h}</span>`).join("") || "<span style='color:var(--accent);font-size:11px'>Nenhuma 🎉</span>"}
          </div>
        </div>

        <div class="job-meta">
          <span class="meta-chip">${r.vaga.modalidade}</span>
          <span class="meta-chip">R$ ${r.vaga.salario.toLocaleString("pt-BR")}</span>
          <span class="meta-chip">${r.vaga.nivel}</span>
        </div>
      </div>`;
  }).join("");

  section.innerHTML = `
    <p class="section-label">// Resultados da análise</p>
    <div class="results-grid">${cardsHTML}</div>

    <p class="section-label">// Melhor compatibilidade</p>
    <div class="best-banner">
      <span class="trophy">🏆</span>
      <div class="best-info">
        <div class="best-company">${best.vaga.empresa}</div>
        <div class="best-role">${best.vaga.cargo}</div>
        <div class="best-compat">Compatibilidade: ${best.pct}% · ${best.vaga.modalidade} · R$ ${best.vaga.salario.toLocaleString("pt-BR")}</div>
      </div>
      <div style="font-size:13px;color:var(--txt-muted)">
        ${best.atendeTotal
          ? "✅ Você atende 100% dos requisitos!"
          : `Faltam: <strong style="color:var(--danger)">${best.faltantes.join(", ")}</strong>`}
      </div>
    </div>

    <p class="section-label">// Plano de estudos recomendado</p>
    <div class="recommendation">
      <h3>📚 Recomendação</h3>
      <p>${recomendacao}</p>
    </div>
  `;

  requestAnimationFrame(() => {
    section.classList.add("visible");
    document.querySelectorAll(".progress-fill").forEach((el) => {
      setTimeout(() => { el.style.width = el.dataset.width + "%"; }, 150);
    });
  });
}

// ── RF14 ─ ASYNC/AWAIT: função principal ─────────────────────
async function executarAnalise() {
  const btn    = document.getElementById("btnAnalisar");
  const loader = document.getElementById("loader");

  const candidatoObj = lerCandidato();
  atualizarPreview(candidatoObj);

  btn.disabled = true;
  loader.classList.add("active");
  document.getElementById("statsRow").classList.remove("visible");
  document.getElementById("resultsSection").classList.remove("visible");
  document.getElementById("resultsSection").innerHTML = "";

  try {
    // RF14 — await da Promise simulada
    const vagasCarregadas = await buscarVagasSimuladas();
    console.log(`✅ ${vagasCarregadas.length} vagas carregadas!`);

    const resultados   = analisarVagas(candidatoObj, vagasCarregadas);
    const best         = melhorVaga(resultados);
    const recomendacao = gerarRecomendacao(resultados);

    renderStats(resultados, candidatoObj);
    renderResults(resultados, best, recomendacao);

    // RF12 — callback pós-análise
    finalizarAnalise(candidatoObj.nome, exibirMensagemFinal);

  } finally {
    btn.disabled = false;
    loader.classList.remove("active");
  }
}

// ── LIVE PREVIEW ao digitar ──────────────────────────────────
["inputNome", "inputExp", "inputSkills"].forEach((id) => {
  document.getElementById(id).addEventListener("input", () =>
    atualizarPreview(lerCandidato())
  );
});