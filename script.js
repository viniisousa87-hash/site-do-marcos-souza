// ============================================
// Marcos Vinicius · Técnico de Informática
// ============================================

document.addEventListener("DOMContentLoaded", () => {

  /* ---------- Menu mobile ---------- */
  const navToggle = document.getElementById("navToggle");
  const mainNav = document.getElementById("mainNav");

  if (navToggle && mainNav) {
    navToggle.addEventListener("click", () => {
      const isOpen = mainNav.classList.toggle("open");
      navToggle.setAttribute("aria-expanded", String(isOpen));
    });

    mainNav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        mainNav.classList.remove("open");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* ---------- Cabeçalho: sombra ao rolar ---------- */
  const header = document.querySelector(".site-header");
  const onScroll = () => {
    if (window.scrollY > 8) {
      header.style.boxShadow = "0 8px 24px -16px rgba(0,0,0,.6)";
    } else {
      header.style.boxShadow = "none";
    }
  };
  window.addEventListener("scroll", onScroll, { passive: true });

  /* ---------- Painel de diagnóstico animado (uma vez, no load) ---------- */
  const panel = document.getElementById("panelBody");
  if (panel && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    const linhas = [
      { text: "&gt; iniciando verificação do sistema…", delay: 200 },
      { text: "&gt; checando temperatura e coolers <span class=\"ok\">OK</span>", delay: 900 },
      { text: "&gt; testando memória e disco <span class=\"ok\">OK</span>", delay: 800 },
      { text: "&gt; verificando conexão de rede <span class=\"ok\">OK</span>", delay: 800 },
      { text: "&gt; diagnóstico concluído. pronto pra atender.", delay: 900 },
    ];

    panel.innerHTML = "";
    let acumulado = 0;

    linhas.forEach((linha, i) => {
      acumulado += linha.delay;
      setTimeout(() => {
        const p = document.createElement("p");
        p.style.animationDelay = "0s";
        p.innerHTML = linha.text;
        panel.appendChild(p);

        if (i === linhas.length - 1) {
          const cursorLine = document.createElement("p");
          cursorLine.innerHTML = '<span class="prompt">&gt;</span><span class="cursor"></span>';
          panel.appendChild(cursorLine);
        }
      }, acumulado);
    });
  } else if (panel) {
    // Movimento reduzido: mostra o resultado final direto, sem animação
    panel.innerHTML = `
      <p><span class="prompt">&gt;</span> diagnóstico concluído</p>
      <p>temperatura, memória, disco e rede <span class="ok">OK</span></p>
      <p><span class="prompt">&gt;</span> pronto pra atender<span class="cursor"></span></p>
    `;
  }

  /* ---------- Ano automático não é necessário (sem copyright dinâmico pedido) ---------- */
});
