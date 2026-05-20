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