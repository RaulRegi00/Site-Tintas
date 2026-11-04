(function () {
  const WPP = "554330277157";
  const NOMES_LINHA = { P: "Premium", S: "Standard", E: "Econômica" };

  const cartelaEl = document.getElementById("cartela");
  const notaEl = document.getElementById("nota");
  const filtrosEl = document.getElementById("filtros");
  const abas = document.querySelectorAll(".aba");
  const chips = document.querySelectorAll(".chip");
  const escolha = document.getElementById("escolha");
  const flutuante = document.getElementById("wppFlutuante");

  let tipoAtual = "acrilica";
  let linhaAtual = "";

  function linkWpp(texto) {
    return "https://wa.me/" + WPP + "?text=" + encodeURIComponent(texto);
  }

  function render() {
    const grupo = CARTELA[tipoAtual];
    filtrosEl.hidden = tipoAtual !== "acrilica";
    const cores = grupo.cores.filter(
      (c) => !linhaAtual || (c[2] || "").includes(linhaAtual)
    );
    cartelaEl.innerHTML = cores
      .map(([nome, hex, linhas]) => {
        const selos = linhas
          ? '<span class="selos">' +
            [...linhas]
              .map((l) => `<i class="sel sel--${l}" title="${NOMES_LINHA[l]}"></i>`)
              .join("") +
            "</span>"
          : "";
        return `<li><button class="cor" data-nome="${nome}" data-hex="${hex}" data-linhas="${linhas || ""}">
          <span class="cor__amostra" style="background:${hex}"></span>
          <span class="cor__nome">${nome}${selos}</span>
        </button></li>`;
      })
      .join("");
    notaEl.textContent = grupo.nota;
  }

  function selecionarAba(tipo) {
    tipoAtual = tipo;
    linhaAtual = "";
    abas.forEach((a) => a.setAttribute("aria-selected", a.dataset.tipo === tipo));
    chips.forEach((c) => c.setAttribute("aria-pressed", c.dataset.linha === ""));
    render();
  }

  abas.forEach((a) => a.addEventListener("click", () => selecionarAba(a.dataset.tipo)));

  chips.forEach((c) =>
    c.addEventListener("click", () => {
      linhaAtual = c.dataset.linha;
      chips.forEach((x) => x.setAttribute("aria-pressed", x === c));
      render();
    })
  );

  document.querySelectorAll("[data-ir]").forEach((a) =>
    a.addEventListener("click", () => selecionarAba(a.dataset.ir))
  );

  cartelaEl.addEventListener("click", (e) => {
    const btn = e.target.closest(".cor");
    if (!btn) return;
    cartelaEl.querySelectorAll(".cor[aria-pressed]").forEach((b) => b.removeAttribute("aria-pressed"));
    btn.setAttribute("aria-pressed", "true");

    const { nome, hex, linhas } = btn.dataset;
    const tipo = CARTELA[tipoAtual].titulo;
    let linhaTxt = "";
    if (linhas) {
      linhaTxt = linhaAtual
        ? " (linha " + NOMES_LINHA[linhaAtual] + ")"
        : " (disponível em: " + [...linhas].map((l) => NOMES_LINHA[l]).join(", ") + ")";
    }
    document.getElementById("escolhaAmostra").style.background = hex;
    document.getElementById("escolhaTipo").textContent = tipo + linhaTxt;
    document.getElementById("escolhaNome").textContent = nome;
    document.getElementById("escolhaLink").href = linkWpp(
      `Olá! Vim pelo site e gostaria de um orçamento da cor *${nome}*, ${tipo}${linhaTxt}.`
    );
    escolha.hidden = false;
    flutuante.classList.add("escondido");
  });

  document.getElementById("escolhaFechar").addEventListener("click", () => {
    escolha.hidden = true;
    flutuante.classList.remove("escondido");
    cartelaEl.querySelectorAll(".cor[aria-pressed]").forEach((b) => b.removeAttribute("aria-pressed"));
  });

  // Leque de cores decorativo no topo
  const leque = document.getElementById("leque");
  const tiras = [
    ["#F0E3C8", "#EED9BC", "#E2CDB6", "#C9A88A"],
    ["#DCE0DF", "#C8CACB", "#9D9E9F", "#5B5D5F"],
    ["#E2BC6A", "#E3B92B", "#E9693A", "#C9302F"],
    ["#D3B596", "#9A6A55", "#8E5A45", "#4E3F3A"],
    ["#7EC0E8", "#2C5DA5", "#6CC35A", "#1F6B3A"],
    ["#D9612F", "#B84A2E", "#A92A24", "#3A3D42"],
  ];
  leque.innerHTML = tiras
    .map(
      (cores, i) =>
        `<div class="tira" style="--i:${i};--n:${tiras.length}">${cores
          .map((c) => `<span style="background:${c}"></span>`)
          .join("")}<b></b></div>`
    )
    .join("");

  document.getElementById("ano").textContent = new Date().getFullYear();
  render();
})();
