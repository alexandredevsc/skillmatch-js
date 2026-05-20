// ============================================================
// SkillMatch JS — skillmatch.js
// Versão console pura (cole no DevTools ou rode com Node.js)
// Todos os Requisitos Funcionais RF01–RF14 estão aqui.
// ============================================================

// ── RF01 ─ PERFIL DO CANDIDATO ──────────────────────────────
const candidato = {
    nome: "Alexandre Milton Alves",
    area: "Front-End",
    habilidades: ["JavaScript", "GitHub", "Lógica de Programação", "kanban", "HTML", "CSS"],
    experienciaMeses: 4,
};

// ── RF09 ─ CLASSE BASE ──────────────────────────────────────
class vaga {
    constructor(id, empresa, cargo, requisitos, salario, modalidade){
        this.id = id;
        this.empresa = empresa;
        this.cargo = cargo;
        this.requisitos = requisitos;
        this.salario = salario;
        this.modalidade = modalidade;
    }
 // RF11 — uso do this
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
    return `Nível da vaga: ${this.nivel}`;
  }
  exibirResumo() {
    return `${super.exibirResumo()} | ${this.exibirNivel()}`;
  }
}

// ── RF02 ─ LISTA DE VAGAS ───────────────────────────────────
const vagas = [
  new VagaFrontEnd(1, "TechStart",    "Dev Front-End Júnior",        ["JavaScript","GitHub","Lógica de Programação","HTML","CSS"],        2800, "Remoto",     "Júnior"),
  new VagaFrontEnd(2, "CodeLab",      "Estágio Front-End",           ["JavaScript","Kanban","GitHub"],                                    1800, "Híbrido",    "Estágio"),
  new VagaFrontEnd(3, "WebSolutions", "Programador JS Júnior",       ["JavaScript","Arrays","Objetos","Funções","Lógica de Programação"], 3000, "Presencial", "Júnior"),
  new VagaFrontEnd(4, "DevHouse",     "Front-End Trainee",           ["HTML","CSS","JavaScript","GitHub","Kanban"],                       2200, "Remoto",     "Trainee"),
];

  // ── RF13 ─ CLOSURE: contador ────────────────────────────────
function criarContadorDeAnalises() {
  let total = 0;
  return function () { total++; return total; };
}
const contarAnalise = criarContadorDeAnalises();

// ── FUNÇÕES AUXILIARES ─────────────────────────────────────

// RF08 — map + filter: habilidades encontradas
function habilidadesEncontradas(habilidades, requisitos) {
  const normalizadas = habilidades.map((h) => h.toLowerCase().trim());
  return requisitos.filter((r) => normalizadas.includes(r.toLowerCase()));
}

// RF05 + RF08 — filter: habilidades faltantes
function habilidadesFaltantes(habilidades, requisitos) {
  const normalizadas = habilidades.map((h) => h.toLowerCase().trim());
  return requisitos.filter((r) => !normalizadas.includes(r.toLowerCase()));
}

// RF03 — cálculo do percentual
function calcularCompatibilidade(habilidades, requisitos) {
  const atendidos = habilidadesEncontradas(habilidades, requisitos).length;
  return Math.round((atendidos / requisitos.length) * 100);
}