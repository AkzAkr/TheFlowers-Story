// js/relationship.js
(function () {
  "use strict";

  const relationshipData = {
    "nayara-kayshila": {
      title: "Nayara ↔ Kayshila",
      desc: 'Dulu sahabat karib dari TK sampai kelas 5 SD. Kayshila pergi tanpa kata dan melukai Nayara. Kini bertemu lagi di SMP, tapi Kayshila bersikap dingin dan asing. Nayara masih mencari "kepingan yang hilang" dalam dirinya.',
      type: "Sahabat Masa Kecil (Retak)",
      typeClass: "type-strained",
    },
    "nayara-talia": {
      title: "Nayara ↔ Talia",
      desc: "Teman pertama Nayara di SMP. Mereka sekelas dan langsung akrab. Talia dengan kelakuan kocaknya berhasil membuat Nayara tersenyum, meski kadang bikin onar (kayak maling mangga).",
      type: "Teman SMP",
      typeClass: "type-friend",
    },
    "nayara-mika": {
      title: "Nayara ↔ Mika",
      desc: "Dikenalkan oleh Talia. Mika adalah penyeimbang yang tenang di antara kekocakan Talia dan keceriaan Nayara. Mereka saling menghormati ruang masing-masing.",
      type: "Teman SMP",
      typeClass: "type-friend",
    },
    "talia-mika": {
      title: "Talia ↔ Mika",
      desc: "Sahabat masa kecil yang saling kontras. Talia hiperaktif dan ceroboh, Mika lebih tenang dan bijak. Mika adalah SATU-SATUNYA yang tahu perasaan dan kesedihan tersembunyi Talia di balik tawa.",
      type: "Sahabat Masa Kecil",
      typeClass: "type-childhood",
    },
    "talia-kayshila": {
      title: "Talia → Kayshila",
      desc: "Talia suka usil dan jail ke Kayshila yang kaku. Kayshila merasa Talia annoying, tapi Talia justru senang melihat reaksi datar Kayshila. Hubungan love-hate yang lucu.",
      type: "Usilan / Annoying",
      typeClass: "type-neutral",
    },
    "kayshila-mika": {
      title: "Kayshila ↔ Mika",
      desc: "Teman sekelas yang netral. Tidak ada konflik, tapi juga tidak ada kedalaman. Mereka saling menghargai batasan dan jarang berinteraksi langsung.",
      type: "Netral",
      typeClass: "type-neutral",
    },
  };

  const tooltip = document.getElementById("relationshipTooltip");
  const tooltipTitle = document.getElementById("tooltipTitle");
  const tooltipDesc = document.getElementById("tooltipDesc");
  const tooltipType = document.getElementById("tooltipType");

  function updateTooltip(data, x, y) {
    if (!data) return;
    tooltipTitle.textContent = data.title;
    tooltipDesc.textContent = data.desc;
    tooltipType.textContent = data.type;
    tooltipType.className = "tooltip-type " + data.typeClass;
    tooltip.style.left = x + 15 + "px";
    tooltip.style.top = y - 10 + "px";
    tooltip.classList.add("active");
  }

  function hideTooltip() {
    tooltip.classList.remove("active");
  }

  function handleNodeClick(node) {
    const char = node.dataset.character;
    const charSection = document.querySelector("#karakter");
    if (!charSection) return;

    charSection.scrollIntoView({ behavior: "smooth" });
    setTimeout(() => {
      document.querySelectorAll(".character-card").forEach((card) => {
        const name = card.querySelector(".character-name");
        if (name && name.textContent.toLowerCase().includes(char)) {
          card.style.transform = "scale(1.02)";
          card.style.boxShadow = "0 25px 50px rgba(0,0,0,0.15)";
          setTimeout(() => {
            card.style.transform = "";
            card.style.boxShadow = "";
          }, 2000);
        }
      });
    }, 800);
  }

  function highlightConnections(node) {
    const char = node.dataset.character;
    document.querySelectorAll(".connection-svg").forEach((line) => {
      if (line.id.includes(char)) {
        line.style.opacity = "1";
        line.style.strokeWidth = "5";
      } else {
        line.style.opacity = "0.2";
      }
    });
  }

  function resetConnections() {
    document.querySelectorAll(".connection-svg").forEach((line) => {
      line.style.opacity = "";
      line.style.strokeWidth = "";
    });
  }

  window.RelationshipMap = {
    init() {
      // Node interactions
      document.querySelectorAll(".relationship-node").forEach((node) => {
        node.addEventListener("click", () => handleNodeClick(node));
        node.addEventListener("mouseenter", () => highlightConnections(node));
        node.addEventListener("mouseleave", resetConnections);
      });

      // SVG lines tooltip
      document.querySelectorAll(".connection-svg").forEach((line) => {
        line.addEventListener("mouseenter", (e) => {
          const lineId = line.id.replace("line-", "");
          updateTooltip(relationshipData[lineId], e.clientX, e.clientY);
        });
        line.addEventListener("mousemove", (e) => {
          tooltip.style.left = e.clientX + 15 + "px";
          tooltip.style.top = e.clientY - 10 + "px";
        });
        line.addEventListener("mouseleave", hideTooltip);
      });

      // Labels tooltip
      document
        .querySelectorAll(".relationship-label")
        .forEach((label, index) => {
          const keys = Object.keys(relationshipData);
          label.addEventListener("mouseenter", (e) => {
            updateTooltip(relationshipData[keys[index]], e.clientX, e.clientY);
          });
          label.addEventListener("mousemove", (e) => {
            tooltip.style.left = e.clientX + 15 + "px";
            tooltip.style.top = e.clientY - 10 + "px";
          });
          label.addEventListener("mouseleave", hideTooltip);
        });
    },
  };
})();
