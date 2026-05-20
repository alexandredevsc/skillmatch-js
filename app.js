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