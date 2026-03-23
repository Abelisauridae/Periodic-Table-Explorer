const data = window.PERIODIC_TABLE_EXPLORER_DATA;
const GUIDE_COLLAPSE_STORAGE_KEY = "periodic-table-explorer:guide-collapsed";

const CATEGORY_META = {
  actinide: {
    label: "Actinide",
    tone: "#ff7b54",
    soft: "rgba(255, 123, 84, 0.24)",
  },
  "alkali-metal": {
    label: "Alkali metal",
    tone: "#ff8a4c",
    soft: "rgba(255, 138, 76, 0.24)",
  },
  "alkaline-earth-metal": {
    label: "Alkaline earth metal",
    tone: "#ffb347",
    soft: "rgba(255, 179, 71, 0.24)",
  },
  "diatomic-nonmetal": {
    label: "Diatomic nonmetal",
    tone: "#42c27f",
    soft: "rgba(66, 194, 127, 0.24)",
  },
  lanthanide: {
    label: "Lanthanide",
    tone: "#f469a9",
    soft: "rgba(244, 105, 169, 0.24)",
  },
  metalloid: {
    label: "Metalloid",
    tone: "#6bc3ff",
    soft: "rgba(107, 195, 255, 0.24)",
  },
  "noble-gas": {
    label: "Noble gas",
    tone: "#7d7cff",
    soft: "rgba(125, 124, 255, 0.24)",
  },
  "polyatomic-nonmetal": {
    label: "Polyatomic nonmetal",
    tone: "#1aa58e",
    soft: "rgba(26, 165, 142, 0.24)",
  },
  "post-transition-metal": {
    label: "Post-transition metal",
    tone: "#6fa6ff",
    soft: "rgba(111, 166, 255, 0.24)",
  },
  "transition-metal": {
    label: "Transition metal",
    tone: "#4f86f7",
    soft: "rgba(79, 134, 247, 0.24)",
  },
  unknown: {
    label: "Predicted properties",
    tone: "#97a8ba",
    soft: "rgba(151, 168, 186, 0.24)",
  },
};

const REACTION_LIBRARY = {
  "1-7": {
    title: "Ammonia synthesis",
    equation: "N2 + 3 H2 -> 2 NH3",
    products: "Ammonia (NH3)",
    conditions: "High pressure, elevated temperature, and an iron catalyst in the Haber process.",
    explanation:
      "Nitrogen and hydrogen can combine to form ammonia, one of the world's most important industrial chemicals.",
  },
  "1-8": {
    title: "Hydrogen combustion",
    equation: "2 H2 + O2 -> 2 H2O",
    products: "Water (H2O)",
    conditions: "Usually needs an ignition source.",
    explanation:
      "Hydrogen burns in oxygen to make water and release a large amount of energy.",
  },
  "1-17": {
    title: "Hydrogen chloride formation",
    equation: "H2 + Cl2 -> 2 HCl",
    products: "Hydrogen chloride (HCl)",
    conditions: "Often triggered by light or a spark.",
    explanation:
      "Hydrogen and chlorine react vigorously to make hydrogen chloride gas.",
  },
  "3-9": {
    title: "Lithium fluoride formation",
    equation: "2 Li + F2 -> 2 LiF",
    products: "Lithium fluoride (LiF)",
    conditions: "Highly vigorous due to fluorine's reactivity.",
    explanation:
      "Lithium readily transfers an electron to fluorine, producing an ionic compound.",
  },
  "6-8": {
    title: "Carbon combustion",
    equation: "C + O2 -> CO2",
    products: "Carbon dioxide (CO2)",
    conditions: "Sufficient oxygen gives complete combustion.",
    explanation:
      "Carbon burns in oxygen to produce carbon dioxide, although limited oxygen can also form carbon monoxide.",
  },
  "11-8": {
    title: "Sodium oxide formation",
    equation: "4 Na + O2 -> 2 Na2O",
    products: "Sodium oxide (Na2O)",
    conditions: "Product balance can vary because sodium may also form peroxides.",
    explanation:
      "Sodium is so reactive that exposure to oxygen quickly forms oxide-type products.",
  },
  "11-17": {
    title: "Table salt formation",
    equation: "2 Na + Cl2 -> 2 NaCl",
    products: "Sodium chloride (NaCl)",
    conditions: "Very exothermic.",
    explanation:
      "This classic metal-halogen reaction makes sodium chloride, the main compound in table salt.",
  },
  "12-8": {
    title: "Magnesium oxide formation",
    equation: "2 Mg + O2 -> 2 MgO",
    products: "Magnesium oxide (MgO)",
    conditions: "Burning magnesium produces an intense white light.",
    explanation:
      "Magnesium reacts strongly with oxygen, making a stable white oxide.",
  },
  "12-17": {
    title: "Magnesium chloride formation",
    equation: "Mg + Cl2 -> MgCl2",
    products: "Magnesium chloride (MgCl2)",
    conditions: "Direct halogen reaction.",
    explanation:
      "Magnesium donates electrons to chlorine to make an ionic chloride.",
  },
  "13-8": {
    title: "Aluminum oxide formation",
    equation: "4 Al + 3 O2 -> 2 Al2O3",
    products: "Aluminum oxide (Al2O3)",
    conditions: "A thin oxide layer forms naturally and protects the metal surface.",
    explanation:
      "Aluminum reacts with oxygen to make a tightly adhering oxide that helps prevent further corrosion.",
  },
  "13-17": {
    title: "Aluminum chloride formation",
    equation: "2 Al + 3 Cl2 -> 2 AlCl3",
    products: "Aluminum chloride (AlCl3)",
    conditions: "Dry chlorine is typically used.",
    explanation:
      "Aluminum and chlorine combine to form aluminum chloride, an important catalyst precursor.",
  },
  "14-8": {
    title: "Silicon dioxide formation",
    equation: "Si + O2 -> SiO2",
    products: "Silicon dioxide (SiO2)",
    conditions: "High temperature helps bulk reaction.",
    explanation:
      "Silicon oxidizes to silicon dioxide, the main chemical component of quartz and glassmaking feedstock.",
  },
  "15-8": {
    title: "Phosphorus oxidation",
    equation: "P4 + 5 O2 -> P4O10",
    products: "Phosphorus pentoxide family products",
    conditions: "White phosphorus reacts especially readily.",
    explanation:
      "Phosphorus burns in oxygen to form strongly dehydrating phosphorus oxides.",
  },
  "16-8": {
    title: "Sulfur combustion",
    equation: "S + O2 -> SO2",
    products: "Sulfur dioxide (SO2)",
    conditions: "Burning sulfur gives a blue flame.",
    explanation:
      "Sulfur reacts with oxygen to make sulfur dioxide, an important industrial but polluting gas.",
  },
  "19-35": {
    title: "Potassium bromide formation",
    equation: "2 K + Br2 -> 2 KBr",
    products: "Potassium bromide (KBr)",
    conditions: "Highly reactive alkali-metal halogen reaction.",
    explanation:
      "Potassium transfers an electron to bromine very readily, producing an ionic salt.",
  },
  "20-8": {
    title: "Calcium oxide formation",
    equation: "2 Ca + O2 -> 2 CaO",
    products: "Calcium oxide (CaO)",
    conditions: "Occurs readily on heating.",
    explanation:
      "Calcium combines with oxygen to form quicklime, a major industrial material.",
  },
  "20-17": {
    title: "Calcium chloride formation",
    equation: "Ca + Cl2 -> CaCl2",
    products: "Calcium chloride (CaCl2)",
    conditions: "Direct combination.",
    explanation:
      "Calcium and chlorine form a common ionic compound used for drying and de-icing.",
  },
  "26-8": {
    title: "Rusting pathway",
    equation: "4 Fe + 3 O2 -> 2 Fe2O3",
    products: "Iron(III) oxide family products",
    conditions: "Water usually accelerates the real corrosion process.",
    explanation:
      "Iron reacts with oxygen over time to form iron oxides, the chemistry behind rust.",
  },
  "29-8": {
    title: "Copper oxide formation",
    equation: "2 Cu + O2 -> 2 CuO",
    products: "Copper(II) oxide (CuO)",
    conditions: "Often seen when copper is strongly heated in air.",
    explanation:
      "Copper oxidizes more slowly than iron, but heating can produce a dark oxide layer.",
  },
  "47-17": {
    title: "Silver chloride formation",
    equation: "2 Ag + Cl2 -> 2 AgCl",
    products: "Silver chloride (AgCl)",
    conditions: "Direct chlorination.",
    explanation:
      "Silver reacts with chlorine to form light-sensitive silver chloride.",
  },
};

const elementsData = data.elements.map((element) => {
  const categoryKey = slugify(element.normalized_category || element.category || "unknown");
  const phaseKey = slugify(element.phase || "Unknown");
  return {
    ...element,
    categoryKey,
    phaseKey,
    categoryMeta: CATEGORY_META[categoryKey] || CATEGORY_META.unknown,
  };
});

const state = {
  search: "",
  category: "all",
  phase: "all",
  block: "all",
  period: "all",
  selectedNumber: 6,
  reactionLeft: 1,
  reactionRight: 8,
  guideCollapsed: loadStoredGuideState(),
  modalOpen: false,
};

const elements = {
  appGrid: document.querySelector("#app-grid"),
  heroStats: document.querySelector("#hero-stats"),
  searchInput: document.querySelector("#search-input"),
  categoryFilter: document.querySelector("#category-filter"),
  phaseFilter: document.querySelector("#phase-filter"),
  blockFilter: document.querySelector("#block-filter"),
  periodFilter: document.querySelector("#period-filter"),
  resetFiltersButton: document.querySelector("#reset-filters-button"),
  toggleGuideButton: document.querySelector("#toggle-guide-button"),
  tableHeading: document.querySelector("#table-heading"),
  tableCaption: document.querySelector("#table-caption"),
  periodicGrid: document.querySelector("#periodic-grid"),
  spotlightHeading: document.querySelector("#spotlight-heading"),
  spotlightCard: document.querySelector("#spotlight-card"),
  categoryLegend: document.querySelector("#category-legend"),
  historyCard: document.querySelector("#history-card"),
  sourcesPanel: document.querySelector("#sources-panel"),
  reactionLeftSelect: document.querySelector("#reaction-left-select"),
  reactionRightSelect: document.querySelector("#reaction-right-select"),
  reactionCard: document.querySelector("#reaction-card"),
  patternsHeading: document.querySelector("#patterns-heading"),
  patternsCaption: document.querySelector("#patterns-caption"),
  selectedContextCard: document.querySelector("#selected-context-card"),
  groupContextCard: document.querySelector("#group-context-card"),
  periodContextCard: document.querySelector("#period-context-card"),
  reactionShortcutsCard: document.querySelector("#reaction-shortcuts-card"),
  modal: document.querySelector("#element-modal"),
  modalTitle: document.querySelector("#modal-title"),
  modalContent: document.querySelector("#modal-content"),
  closeModalButton: document.querySelector("#close-modal-button"),
};

function loadStoredGuideState() {
  try {
    return window.localStorage.getItem(GUIDE_COLLAPSE_STORAGE_KEY) === "true";
  } catch (error) {
    return false;
  }
}

function persistGuideState() {
  try {
    window.localStorage.setItem(GUIDE_COLLAPSE_STORAGE_KEY, String(state.guideCollapsed));
  } catch (error) {
    // Ignore storage failures and keep the in-memory state.
  }
}

function slugify(value) {
  return String(value || "")
    .trim()
    .toLowerCase()
    .replaceAll(/[^a-z0-9]+/g, "-")
    .replaceAll(/^-+|-+$/g, "");
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function formatNumber(value, maximumFractionDigits = 2) {
  if (value == null || Number.isNaN(value)) return "Unknown";
  return new Intl.NumberFormat("en-US", {
    maximumFractionDigits,
  }).format(value);
}

function formatAtomicMass(value) {
  if (value == null) return "Unknown";
  if (value >= 250) return formatNumber(value, 0);
  if (value >= 100) return formatNumber(value, 3);
  return formatNumber(value, 4);
}

function formatTemperature(kelvin) {
  if (kelvin == null) return "Unknown";
  const celsius = kelvin - 273.15;
  return `${formatNumber(kelvin, 2)} K / ${formatNumber(celsius, 2)} °C`;
}

function formatDensity(element) {
  if (element.density == null) return "Unknown";
  const unit = element.phase === "Gas" ? "g/L" : "g/cm^3";
  return `${formatNumber(element.density, 4)} ${unit}`;
}

function formatFactValue(value, unit, digits = 2) {
  if (value == null) return "Unknown";
  return `${formatNumber(value, digits)} ${unit}`;
}

function formatCategoryLabel(key) {
  return (CATEGORY_META[key] || CATEGORY_META.unknown).label;
}

function getElementByNumber(number) {
  return elementsData.find((element) => element.number === number) || null;
}

function populateFilterSelect(select, label, options) {
  select.innerHTML = [
    `<option value="all">All ${escapeHtml(label)}</option>`,
    ...options.map(
      (option) =>
        `<option value="${escapeHtml(option.value)}">${escapeHtml(option.label)}</option>`
    ),
  ].join("");
}

function getDistinctOptions(values, formatter = (value) => value) {
  return Array.from(new Set(values.filter(Boolean)))
    .sort((left, right) => String(left).localeCompare(String(right), undefined, { numeric: true }))
    .map((value) => ({ value: String(value), label: formatter(value) }));
}

function getVisibleElements() {
  const query = state.search.trim().toLowerCase();
  return elementsData.filter((element) => {
    if (state.category !== "all" && element.categoryKey !== state.category) return false;
    if (state.phase !== "all" && element.phaseKey !== state.phase) return false;
    if (state.block !== "all" && element.block !== state.block) return false;
    if (state.period !== "all" && String(element.period) !== state.period) return false;
    if (query && !element.search_blob.includes(query)) return false;
    return true;
  });
}

function buildHeroStats(visibleElements) {
  const gases = visibleElements.filter((element) => element.phase === "Gas").length;
  const liquids = visibleElements.filter((element) => element.phase === "Liquid").length;
  const synthetic = visibleElements.filter((element) => element.number >= 93).length;
  const families = new Set(visibleElements.map((element) => element.categoryKey)).size;

  const cards = [
    ["Highlighted elements", formatNumber(visibleElements.length, 0)],
    ["Visible families", formatNumber(families, 0)],
    ["Gases at room temp", formatNumber(gases, 0)],
    ["Synthetic elements", formatNumber(synthetic, 0)],
  ];

  elements.heroStats.innerHTML = cards
    .map(
      ([label, value]) => `
        <article class="stat-card">
          <span>${escapeHtml(label)}</span>
          <strong>${escapeHtml(value)}</strong>
        </article>
      `
    )
    .join("");

  if (liquids) {
    elements.heroStats.insertAdjacentHTML(
      "beforeend",
      `
        <article class="stat-card">
          <span>Liquids at room temp</span>
          <strong>${escapeHtml(formatNumber(liquids, 0))}</strong>
        </article>
      `
    );
  }
}

function renderLegend() {
  const rows = Object.entries(CATEGORY_META)
    .map(
      ([key, meta]) => `
        <span class="legend-chip" style="--tone:${meta.tone}; --tone-soft:${meta.soft};">
          <i aria-hidden="true"></i>${escapeHtml(meta.label)}
        </span>
      `
    )
    .join("");

  elements.categoryLegend.innerHTML = `<div class="legend-row">${rows}</div>`;
}

function renderGuideVisibility() {
  elements.appGrid.classList.toggle("is-guide-collapsed", state.guideCollapsed);
  elements.toggleGuideButton.textContent = state.guideCollapsed ? "Show sidebar" : "Hide sidebar";
  elements.toggleGuideButton.setAttribute("aria-expanded", String(!state.guideCollapsed));
}

function getReactionKey(leftNumber, rightNumber) {
  return [leftNumber, rightNumber].sort((left, right) => left - right).join("-");
}

function renderReactionCard() {
  const left = elementsData.find((element) => element.number === state.reactionLeft);
  const right = elementsData.find((element) => element.number === state.reactionRight);

  if (!left || !right) {
    elements.reactionCard.innerHTML =
      `<p class="reaction-note">Choose two elements to explore a reaction example.</p>`;
    return;
  }

  if (left.number === right.number) {
    elements.reactionCard.innerHTML = `
      <h4>${escapeHtml(`${left.name} + ${right.name}`)}</h4>
      <p class="reaction-note">
        Pick two different elements. The reaction lab is focused on direct combination examples between element pairs.
      </p>
    `;
    return;
  }

  const reaction = REACTION_LIBRARY[getReactionKey(left.number, right.number)];

  if (!reaction) {
    elements.reactionCard.innerHTML = `
      <h4>${escapeHtml(`${left.name} + ${right.name}`)}</h4>
      <p class="reaction-note">
        No bundled direct-reaction card is included for this pair. That does not mean they never interact, only that the outcome depends on conditions, intermediates, or compound chemistry beyond this lightweight explorer.
      </p>
    `;
    return;
  }

  elements.reactionCard.innerHTML = `
    <h4>${escapeHtml(reaction.title)}</h4>
    <p class="reaction-equation">${escapeHtml(reaction.equation)}</p>
    <div class="spotlight-chip-row">
      <span class="spotlight-chip">${escapeHtml(`Products: ${reaction.products}`)}</span>
      <span class="spotlight-chip">${escapeHtml(`Conditions: ${reaction.conditions}`)}</span>
    </div>
    <p class="reaction-note">${escapeHtml(reaction.explanation)}</p>
  `;
}

function getGroupPeers(element) {
  return elementsData
    .filter((candidate) => candidate.group === element.group)
    .sort((left, right) => left.number - right.number);
}

function getPeriodPeers(element) {
  return elementsData
    .filter((candidate) => candidate.period === element.period)
    .sort((left, right) => left.number - right.number);
}

function getReactionEntriesForElement(number) {
  return Object.entries(REACTION_LIBRARY)
    .filter(([key]) => key.split("-").map(Number).includes(number))
    .map(([key, reaction]) => ({
      key,
      reaction,
      partnerNumbers: key.split("-").map(Number).filter((value) => value !== number),
    }));
}

function renderPatternDeck() {
  const element = getElementByNumber(state.selectedNumber) || elementsData[0];
  const groupPeers = getGroupPeers(element);
  const periodPeers = getPeriodPeers(element);
  const reactions = getReactionEntriesForElement(element.number);

  elements.patternsHeading.textContent = `${element.name} in context`;
  elements.patternsCaption.textContent =
    "Use the lower deck to compare the selected element with its column, row, and bundled reaction pathways.";

  elements.selectedContextCard.innerHTML = `
    <h3>Selected Element</h3>
    <div class="pattern-tile-row">
      <div
        class="mini-tile"
        style="--tone:${element.categoryMeta.tone}; --tone-soft:${element.categoryMeta.soft};"
      >
        <small>${escapeHtml(`No. ${element.number}`)}</small>
        <strong>${escapeHtml(element.symbol)}</strong>
        <small>${escapeHtml(formatAtomicMass(element.atomic_mass))}</small>
      </div>
      <div class="pattern-fact-list">
        <h4>${escapeHtml(element.name)}</h4>
        <p>${escapeHtml(
          `${formatCategoryLabel(element.categoryKey)} in period ${element.period}, group ${element.group}.`
        )}</p>
        <p>${escapeHtml(
          `Electron configuration: ${
            element.electron_configuration_semantic || element.electron_configuration || "Unknown"
          }.`
        )}</p>
        <p>${escapeHtml(`Phase: ${element.phase || "Unknown"}.`)}</p>
        <p>${escapeHtml(
          `First ionization energy: ${formatFactValue(
            element.ionization_energies?.[0],
            "kJ/mol",
            2
          )}.`
        )}</p>
      </div>
    </div>
  `;

  elements.groupContextCard.innerHTML = `
    <h3>Column Neighbors</h3>
    <p>${escapeHtml(
      `Group ${element.group} elements tend to share broad chemistry patterns even as size and reactivity shift down the column.`
    )}</p>
    <div class="context-chip-row">
      ${groupPeers
        .map(
          (peer) => `
            <button
              class="context-chip ${peer.number === element.number ? "is-selected" : ""}"
              type="button"
              data-jump-element-number="${peer.number}"
            >
              ${escapeHtml(`${peer.symbol} ${peer.name}`)}
            </button>
          `
        )
        .join("")}
    </div>
  `;

  elements.periodContextCard.innerHTML = `
    <h3>Row Neighbors</h3>
    <p>${escapeHtml(
      `Period ${element.period} shows how properties shift as atomic number increases across the row.`
    )}</p>
    <div class="context-chip-row">
      ${periodPeers
        .map(
          (peer) => `
            <button
              class="context-chip ${peer.number === element.number ? "is-selected" : ""}"
              type="button"
              data-jump-element-number="${peer.number}"
            >
              ${escapeHtml(`${peer.symbol} ${peer.name}`)}
            </button>
          `
        )
        .join("")}
    </div>
  `;

  elements.reactionShortcutsCard.innerHTML = `
    <h3>Reaction Pathways</h3>
    ${
      reactions.length
        ? `
          <div class="reaction-mini-list">
            ${reactions
              .map(({ reaction, partnerNumbers }) => {
                const partner = getElementByNumber(partnerNumbers[0]);
                return `
                  <article class="reaction-mini">
                    <h4>${escapeHtml(reaction.title)}</h4>
                    <p><span class="pattern-inline-code">${escapeHtml(reaction.equation)}</span></p>
                    <p>${escapeHtml(
                      partner
                        ? `Pair focus: ${element.name} with ${partner.name}.`
                        : `Products: ${reaction.products}.`
                    )}</p>
                    <p>${escapeHtml(reaction.conditions)}</p>
                  </article>
                `;
              })
              .join("")}
          </div>
        `
        : `
          <p>
            No curated direct-combination reactions are bundled yet for ${escapeHtml(
              element.name
            )}. The explorer keeps this section curated so it does not imply misleading chemistry for arbitrary pairs.
          </p>
        `
    }
  `;

  document.querySelectorAll("[data-jump-element-number]").forEach((button) => {
    button.addEventListener("click", () => {
      state.selectedNumber = Number(button.dataset.jumpElementNumber);
      render();
    });
  });
}

function renderPeriodicTable(visibleElements) {
  const visibleNumbers = new Set(visibleElements.map((element) => element.number));
  const selected = elementsData.find((element) => element.number === state.selectedNumber) || null;

  elements.tableHeading.textContent = `${formatNumber(visibleElements.length, 0)} highlighted elements`;

  if (!visibleElements.length) {
    elements.tableCaption.textContent =
      "No elements match the current filters. Reset filters or broaden the search to relight the table.";
  } else if (state.search || state.category !== "all" || state.phase !== "all" || state.block !== "all" || state.period !== "all") {
    elements.tableCaption.textContent =
      "The table keeps its real geometry while non-matching elements fade into the background.";
  } else {
    elements.tableCaption.textContent =
      "Click any element tile to open a lesson card with a shell visual, summary, and quick facts.";
  }

  const fixedLabels = `
    <div class="series-label" style="grid-column: 1 / span 2; grid-row: 9;">
      Lanthanides
    </div>
    <div class="series-label" style="grid-column: 1 / span 2; grid-row: 10;">
      Actinides
    </div>
  `;

  const tiles = elementsData
    .map((element) => {
      const isVisible = visibleNumbers.has(element.number);
      const isSelected = element.number === state.selectedNumber;
      const phaseLabel = element.phase === "Unknown" ? "?" : (element.phase || "?").slice(0, 1);
      return `
        <button
          class="element-card ${isVisible ? "" : "is-dimmed"} ${isSelected ? "is-selected" : ""}"
          type="button"
          data-element-number="${element.number}"
          style="grid-column:${element.xpos}; grid-row:${element.ypos}; --tone:${element.categoryMeta.tone}; --tone-soft:${element.categoryMeta.soft};"
          aria-label="${escapeHtml(`${element.name}, atomic number ${element.number}`)}"
        >
          <div class="element-number">${escapeHtml(String(element.number))}</div>
          <div class="element-phase">${escapeHtml(phaseLabel)}</div>
          <div class="element-symbol">${escapeHtml(element.symbol)}</div>
          <div class="element-name">${escapeHtml(element.name)}</div>
          <div class="element-mass">${escapeHtml(formatAtomicMass(element.atomic_mass))}</div>
        </button>
      `;
    })
    .join("");

  elements.periodicGrid.innerHTML = fixedLabels + tiles;

  elements.periodicGrid.querySelectorAll("[data-element-number]").forEach((button) => {
    button.addEventListener("click", () => {
      const number = Number(button.dataset.elementNumber);
      state.selectedNumber = number;
      openModal();
      render();
    });
  });

  if (selected && !visibleNumbers.has(selected.number) && visibleElements.length) {
    elements.tableCaption.textContent =
      "Your selected element is still outlined, even if it falls outside the current highlight filters.";
  }
}

function buildDiscoveryLine(element) {
  const parts = [];
  if (element.discovered_by) {
    parts.push(`Discovered by ${element.discovered_by}`);
  }
  if (element.named_by) {
    parts.push(`named by ${element.named_by}`);
  }
  if (element.appearance) {
    parts.push(`usually described as ${element.appearance}`);
  }
  return parts.length ? `${parts.join(", ")}.` : "Discovery or naming notes are not listed in this dataset.";
}

function isAncientDiscovery(value) {
  return /ancient|before|bc|middle east/i.test(String(value || ""));
}

function buildHistorySummary(element) {
  const lines = [];

  if (element.discovered_by) {
    if (isAncientDiscovery(element.discovered_by)) {
      lines.push(`${element.name} has been known since ${element.discovered_by}.`);
    } else {
      lines.push(`${element.name} is credited in this dataset to ${element.discovered_by}.`);
    }
  } else {
    lines.push(`This dataset does not list a single discoverer for ${element.name}.`);
  }

  if (element.named_by) {
    lines.push(`Its modern name is attributed to ${element.named_by}.`);
  }

  if (element.number >= 93) {
    lines.push("It is a synthetic element, so its history is tied to modern laboratory discovery rather than ancient use.");
  } else if (element.discovered_by && isAncientDiscovery(element.discovered_by)) {
    lines.push("That makes it part of the deep pre-modern history of chemistry, long before atomic theory organized the elements.");
  } else {
    lines.push("Its story belongs to the era when chemists were isolating, naming, and organizing matter into the periodic table.");
  }

  return lines.join(" ");
}

function renderHistoryCard() {
  const element = getElementByNumber(state.selectedNumber) || elementsData[0];
  const eraLabel =
    element.number >= 93
      ? "Synthetic era"
      : isAncientDiscovery(element.discovered_by)
        ? "Ancient use"
        : "Modern isolation";

  elements.historyCard.innerHTML = `
    <h3>History Note</h3>
    <p>${escapeHtml(buildHistorySummary(element))}</p>
    <div class="spotlight-chip-row">
      <span class="spotlight-chip">${escapeHtml(
        `Discovery: ${element.discovered_by || "Not listed"}`
      )}</span>
      ${
        element.named_by
          ? `<span class="spotlight-chip">${escapeHtml(`Named by: ${element.named_by}`)}</span>`
          : ""
      }
      <span class="spotlight-chip">${escapeHtml(`Era: ${eraLabel}`)}</span>
    </div>
  `;
}

function renderSpotlightCard() {
  const element = elementsData.find((entry) => entry.number === state.selectedNumber) || elementsData[0];
  elements.spotlightHeading.textContent = `${element.name} spotlight`;

  elements.spotlightCard.innerHTML = `
    <div class="spotlight-head">
      <div
        class="mini-tile"
        style="--tone:${element.categoryMeta.tone}; --tone-soft:${element.categoryMeta.soft};"
      >
        <small>${escapeHtml(`No. ${element.number}`)}</small>
        <strong>${escapeHtml(element.symbol)}</strong>
        <small>${escapeHtml(formatAtomicMass(element.atomic_mass))}</small>
      </div>
      <div>
        <h3>${escapeHtml(element.name)}</h3>
        <p class="spotlight-summary">
          ${escapeHtml(element.summary || buildDiscoveryLine(element))}
        </p>
      </div>
    </div>
    <div class="spotlight-chip-row">
      <span class="spotlight-chip" style="--tone:${element.categoryMeta.tone}; --tone-soft:${element.categoryMeta.soft};">
        <i aria-hidden="true"></i>${escapeHtml(formatCategoryLabel(element.categoryKey))}
      </span>
      <span class="spotlight-chip">${escapeHtml(`Period ${element.period}`)}</span>
      <span class="spotlight-chip">${escapeHtml(`Group ${element.group}`)}</span>
      <span class="spotlight-chip">${escapeHtml(`${String(element.block).toUpperCase()} block`)}</span>
    </div>
    <button class="spotlight-action" id="spotlight-open-button" type="button">
      Open lesson card
    </button>
  `;

  elements.spotlightCard.querySelector("#spotlight-open-button")?.addEventListener("click", () => {
    openModal();
  });
}

function renderSources() {
  elements.sourcesPanel.innerHTML = `
    Built as a static local app. The periodic-table layout is the primary interface because elements are not naturally mapped by geography the way dinosaurs or videogame regions are.
    Data is bundled locally from <a href="${escapeHtml(data.metadata.sourceUrl)}" target="_blank" rel="noreferrer">${escapeHtml(data.metadata.sourceName)}</a>.
    Summary text is adapted from Wikipedia via that dataset, so keep attribution in place if you publish this build.
    The reaction lab is curated and illustrative rather than predictive.
    Rebuild the bundle with <code>curl -Lsf ... | python3 periodic-table-explorer/scripts/build_periodic_data.py</code>.
  `;
}

function renderShellDiagram(element) {
  const shells = element.shells || [];
  const size = 260;
  const center = size / 2;
  const ringSpacing = 18;
  const startRadius = 34;
  const rings = shells
    .map((count, index) => {
      const radius = startRadius + index * ringSpacing;
      return `<circle cx="${center}" cy="${center}" r="${radius}" fill="none" stroke="rgba(15, 109, 255, 0.18)" stroke-width="2"></circle>`;
    })
    .join("");

  const electrons = shells
    .map((count, shellIndex) => {
      const radius = startRadius + shellIndex * ringSpacing;
      return Array.from({ length: count })
        .map((_, electronIndex) => {
          const angle = -Math.PI / 2 + (Math.PI * 2 * electronIndex) / count;
          const x = center + Math.cos(angle) * radius;
          const y = center + Math.sin(angle) * radius;
          const electronRadius = count > 18 ? 2.4 : count > 8 ? 2.8 : 3.2;
          return `<circle cx="${x.toFixed(2)}" cy="${y.toFixed(2)}" r="${electronRadius}" fill="${escapeHtml(
            element.categoryMeta.tone
          )}" opacity="0.92"></circle>`;
        })
        .join("");
    })
    .join("");

  return `
    <svg viewBox="0 0 ${size} ${size}" aria-label="${escapeHtml(`${element.name} shell diagram`)}">
      ${rings}
      ${electrons}
      <circle cx="${center}" cy="${center}" r="24" fill="${escapeHtml(element.categoryMeta.tone)}" opacity="0.9"></circle>
      <text x="${center}" y="${center - 4}" text-anchor="middle" fill="#ffffff" font-family="Avenir Next Condensed, Arial Narrow, sans-serif" font-size="26" font-weight="700">
        ${escapeHtml(element.symbol)}
      </text>
      <text x="${center}" y="${center + 16}" text-anchor="middle" fill="rgba(255,255,255,0.88)" font-family="Avenir Next, Gill Sans, sans-serif" font-size="12">
        ${escapeHtml(String(element.number))}
      </text>
    </svg>
  `;
}

function buildModalFacts(element) {
  return [
    ["Atomic mass", formatAtomicMass(element.atomic_mass)],
    ["Category", formatCategoryLabel(element.categoryKey)],
    ["Phase", element.phase || "Unknown"],
    ["Block", `${String(element.block).toUpperCase()} block`],
    ["Period / group", `Period ${element.period}, group ${element.group}`],
    ["Electron config", element.electron_configuration_semantic || element.electron_configuration || "Unknown"],
    ["Electron shells", (element.shells || []).join(" / ") || "Unknown"],
    ["Electronegativity", formatFactValue(element.electronegativity_pauling, "Pauling", 2)],
    ["Electron affinity", formatFactValue(element.electron_affinity, "kJ/mol", 2)],
    ["First ionization", formatFactValue(element.ionization_energies?.[0], "kJ/mol", 2)],
    ["Density", formatDensity(element)],
    ["Melting point", formatTemperature(element.melt)],
    ["Boiling point", formatTemperature(element.boil)],
    ["Molar heat", formatFactValue(element.molar_heat, "J/(mol*K)", 3)],
  ];
}

function renderModal() {
  const element = elementsData.find((entry) => entry.number === state.selectedNumber);
  if (!element) return;

  elements.modalTitle.textContent = `${element.name} (${element.symbol})`;

  const factCards = buildModalFacts(element)
    .map(
      ([label, value]) => `
        <article class="fact-card">
          <span>${escapeHtml(label)}</span>
          <strong>${escapeHtml(value)}</strong>
        </article>
      `
    )
    .join("");

  elements.modalContent.innerHTML = `
    <div class="modal-grid">
      <section
        class="modal-banner"
        style="--tone:${element.categoryMeta.tone}; --tone-soft:${element.categoryMeta.soft};"
      >
        <div class="modal-banner-head">
          <div class="modal-tile">
            <small>${escapeHtml(`Atomic no. ${element.number}`)}</small>
            <strong>${escapeHtml(element.symbol)}</strong>
            <small>${escapeHtml(formatAtomicMass(element.atomic_mass))}</small>
          </div>
          <div>
            <h3>${escapeHtml(element.name)}</h3>
            <p class="modal-subtitle">
              ${escapeHtml(
                `${formatCategoryLabel(element.categoryKey)} in period ${element.period}, group ${element.group}`
              )}
            </p>
            <div class="modal-chip-row">
              <span class="modal-chip" style="--tone:${element.categoryMeta.tone}; --tone-soft:${element.categoryMeta.soft};">
                <i aria-hidden="true"></i>${escapeHtml(element.phase || "Unknown")}
              </span>
              <span class="modal-chip">${escapeHtml(`${String(element.block).toUpperCase()} block`)}</span>
            </div>
          </div>
        </div>
        <div class="atom-visual">
          ${renderShellDiagram(element)}
        </div>
      </section>

      <div class="modal-detail-column">
        <section class="fact-grid">${factCards}</section>

        <section class="modal-story">
          <h3>Chemistry Notes</h3>
          <p>${escapeHtml(element.summary || "No summary is bundled for this element.")}</p>
          <p>${escapeHtml(buildDiscoveryLine(element))}</p>
        </section>

        <section class="modal-story">
          <h3>Source</h3>
          <p>
            Read more on
            <a href="${escapeHtml(element.source || data.metadata.sourceUrl)}" target="_blank" rel="noreferrer">
              ${escapeHtml(element.source || data.metadata.sourceName)}
            </a>.
          </p>
        </section>
      </div>
    </div>
  `;
}

function openModal() {
  state.modalOpen = true;
  elements.modal.hidden = false;
  document.body.classList.add("modal-open");
  renderModal();
}

function closeModal() {
  state.modalOpen = false;
  elements.modal.hidden = true;
  document.body.classList.remove("modal-open");
}

function render() {
  const visibleElements = getVisibleElements();
  renderGuideVisibility();
  buildHeroStats(visibleElements);
  renderPeriodicTable(visibleElements);
  renderSpotlightCard();
  renderHistoryCard();
  renderReactionCard();
  renderPatternDeck();
  renderSources();
  if (state.modalOpen) {
    renderModal();
  }
}

function bindEvents() {
  elements.searchInput.addEventListener("input", (event) => {
    state.search = event.target.value;
    render();
  });

  elements.categoryFilter.addEventListener("change", (event) => {
    state.category = event.target.value;
    render();
  });

  elements.phaseFilter.addEventListener("change", (event) => {
    state.phase = event.target.value;
    render();
  });

  elements.blockFilter.addEventListener("change", (event) => {
    state.block = event.target.value;
    render();
  });

  elements.periodFilter.addEventListener("change", (event) => {
    state.period = event.target.value;
    render();
  });

  elements.resetFiltersButton.addEventListener("click", () => {
    state.search = "";
    state.category = "all";
    state.phase = "all";
    state.block = "all";
    state.period = "all";
    elements.searchInput.value = "";
    elements.categoryFilter.value = "all";
    elements.phaseFilter.value = "all";
    elements.blockFilter.value = "all";
    elements.periodFilter.value = "all";
    render();
  });

  elements.toggleGuideButton.addEventListener("click", () => {
    state.guideCollapsed = !state.guideCollapsed;
    persistGuideState();
    render();
  });

  elements.reactionLeftSelect.addEventListener("change", (event) => {
    state.reactionLeft = Number(event.target.value);
    renderReactionCard();
  });

  elements.reactionRightSelect.addEventListener("change", (event) => {
    state.reactionRight = Number(event.target.value);
    renderReactionCard();
  });

  elements.closeModalButton.addEventListener("click", closeModal);

  elements.modal.addEventListener("click", (event) => {
    const closeTarget = event.target.closest("[data-close-modal='true']");
    if (closeTarget) {
      closeModal();
    }
  });

  window.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && state.modalOpen) {
      closeModal();
    }
  });
}

function populateControls() {
  populateFilterSelect(
    elements.categoryFilter,
    "families",
    getDistinctOptions(elementsData.map((element) => element.categoryKey), (value) =>
      formatCategoryLabel(value)
    )
  );
  populateFilterSelect(
    elements.phaseFilter,
    "phases",
    getDistinctOptions(elementsData.map((element) => element.phaseKey), (value) =>
      String(value).replace(/^./, (char) => char.toUpperCase())
    )
  );
  populateFilterSelect(
    elements.blockFilter,
    "blocks",
    getDistinctOptions(elementsData.map((element) => element.block), (value) =>
      `${String(value).toUpperCase()} block`
    )
  );
  populateFilterSelect(
    elements.periodFilter,
    "periods",
    getDistinctOptions(elementsData.map((element) => element.period), (value) => `Period ${value}`)
  );

  const reactionOptions = elementsData
    .slice()
    .sort((left, right) => left.number - right.number)
    .map((element) => ({
      value: String(element.number),
      label: `${element.number} · ${element.symbol} · ${element.name}`,
    }));

  const reactionMarkup = reactionOptions
    .map(
      (option) =>
        `<option value="${escapeHtml(option.value)}">${escapeHtml(option.label)}</option>`
    )
    .join("");
  elements.reactionLeftSelect.innerHTML = reactionMarkup;
  elements.reactionRightSelect.innerHTML = reactionMarkup;
  elements.reactionLeftSelect.value = String(state.reactionLeft);
  elements.reactionRightSelect.value = String(state.reactionRight);
}

populateControls();
renderLegend();
bindEvents();
render();
