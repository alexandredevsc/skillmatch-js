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


  