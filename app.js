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