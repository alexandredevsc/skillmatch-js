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

// RF04 — classificação com if-else
function classificarCompatibilidade(percentual) {
  if (percentual >= 80)      return "🟢 Alta compatibilidade";
  else if (percentual >= 50) return "🟡 Média compatibilidade";
  else                       return "🔴 Baixa compatibilidade";
}

// RF08 — map: gera resultados de cada vaga
// RF08 — every: verifica 100% dos requisitos
function analisarTodasAsVagas(candidatoObj, listaVagas) {
  return listaVagas.map((vaga) => {
    const percentual  = calcularCompatibilidade(candidatoObj.habilidades, vaga.requisitos);
    const encontradas = habilidadesEncontradas(candidatoObj.habilidades, vaga.requisitos);
    const faltantes   = habilidadesFaltantes(candidatoObj.habilidades, vaga.requisitos);
    const classificacao = classificarCompatibilidade(percentual);
    const atendeTotal = vaga.requisitos.every((r) =>
      candidatoObj.habilidades.map((h) => h.toLowerCase()).includes(r.toLowerCase())
    );
    return { vaga, percentual, encontradas, faltantes, classificacao, atendeTotal };
  });
}

// RF06 — reduce: melhor vaga
function encontrarMelhorVaga(resultados) {
  return resultados.reduce((melhor, atual) =>
    atual.percentual > melhor.percentual ? atual : melhor
  );
}

// RF07 — recomendação + RF08 — reduce
function gerarRecomendacao(resultados) {
  const todasFaltantes = resultados.reduce((acc, r) => {
    r.faltantes.forEach((h) => { if (!acc.includes(h)) acc.push(h); });
    return acc;
  }, []);

  if (todasFaltantes.length === 0) {
    return "Parabéns! Você atende todos os requisitos das vagas analisadas. 🎉";
  }
  return `Priorize estudar: ${todasFaltantes.join(", ")}. Esses conteúdos aparecem nas vagas analisadas.`;
}

// ── RF12 ─ CALLBACK ──────────────────────────────────────────
function finalizarAnalise(nomeCandidato, callback) {
  console.log("\n✅ Análise finalizada para:", nomeCandidato);
  callback(nomeCandidato);
}

function exibirMensagemFinal(nome) {
  console.log(`💡 ${nome}, revise suas habilidades faltantes e atualize seu plano de estudos.`);
  console.log(`📊 Total de análises realizadas nesta sessão: ${contarAnalise()}`);
}

// ── RF14 ─ PROMISE + ASYNC/AWAIT ─────────────────────────────
function buscarVagasSimuladas() {
  return new Promise((resolve) => {
    setTimeout(() => resolve(vagas), 1000);
  });
}

async function iniciarSistema() {
  console.log("⏳ Carregando vagas do servidor...");
  const vagasCarregadas = await buscarVagasSimuladas();
  console.log(`✅ ${vagasCarregadas.length} vagas carregadas com sucesso!\n`);

  const resultados  = analisarTodasAsVagas(candidato, vagasCarregadas);
  const melhorVaga  = encontrarMelhorVaga(resultados);
  const recomendacao = gerarRecomendacao(resultados);

  // RF08 — find: busca vaga por ID
  const vagaEspecifica = vagasCarregadas.find((v) => v.id === 1);
  console.log("🔍 Vaga encontrada pelo ID 1:", vagaEspecifica.exibirResumo());

  console.log("\n" + "=".repeat(60));
  console.log(`🧑‍💻 CANDIDATO: ${candidato.nome}`);
  console.log(`📌 Área: ${candidato.area} | Experiência: ${candidato.experienciaMeses} meses`);
  console.log(`🛠️  Habilidades: ${candidato.habilidades.join(", ")}`);
  console.log("=".repeat(60));

  resultados.forEach((r) => {
    console.log(`\n📋 ${r.vaga.empresa} — ${r.vaga.cargo}`);
    console.log(`   Modalidade: ${r.vaga.modalidade} | Salário: R$ ${r.vaga.salario.toLocaleString("pt-BR")}`);
    console.log(`   Compatibilidade: ${r.percentual}%  ${r.classificacao}`);
    console.log(`   ✅ Encontradas: ${r.encontradas.length > 0 ? r.encontradas.join(", ") : "Nenhuma"}`);
    console.log(`   ❌ Faltantes:   ${r.faltantes.length > 0 ? r.faltantes.join(", ") : "Nenhuma"}`);
    console.log(`   Atende 100%: ${r.atendeTotal ? "Sim 🎉" : "Não"}`);
  });

  console.log("\n" + "=".repeat(60));
  console.log("🏆 VAGA MAIS COMPATÍVEL:");
  console.log(`   ${melhorVaga.vaga.empresa} — ${melhorVaga.vaga.cargo}`);
  console.log(`   Compatibilidade: ${melhorVaga.percentual}%`);

  console.log("\n📚 RECOMENDAÇÃO DE ESTUDO:");
  console.log(`   ${recomendacao}`);
  console.log("=".repeat(60));
