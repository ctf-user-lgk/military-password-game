// --------- SMALL HELPERS ---------

function normalize(str) {
  return str
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-") // spaces & symbols → hyphen
    .replace(/^-+|-+$/g, "");
}

function byId(id) {
  return document.getElementById(id);
}

// --------- GAME DATA ---------

// Identity levels: ONLY class and surname now.
const identityLevels = [
  {
    id: "class",
    prompt: "Level 1 — Type your CLASS (e.g. 10-B). This will appear in your final flag.",
    hint: "Example: 10-B, 11-A, 9-В."
  },
  {
    id: "surname",
    prompt: "Level 2 — Type your SURNAME (e.g. Shevchenko).",
    hint: "Use Latin letters if possible, like on a passport."
  }
];

// --------- VOCAB LEVELS ---------
const vocabLevels = [
  {
    termKey: "cca",
    answers: ["cca", "collaborative-combat-aircraft"],
    definition: "Autonomous drone that cooperates with a fighter jet to extend combat capability.",
    hint: "Used alongside aircraft like the F-35 in loyal wingman roles."
  },
  {
    termKey: "cockpit",
    answers: ["cockpit"],
    definition: "Pilot’s control area in an aircraft.",
    hint: "The pilot sits here to operate all flight controls."
  },
  {
    termKey: "jet",
    answers: ["jet"],
    definition: "High-speed military aircraft powered by turbines.",
    hint: "Used for air superiority, interception, and strike missions."
  },
  {
    termKey: "engine",
    answers: ["engine"],
    definition: "The power unit of an aircraft.",
    hint: "Provides thrust needed for flight."
  },
  {
    termKey: "coating",
    answers: ["coating"],
    definition: "Special surface layer used for protection or stealth.",
    hint: "Stealth aircraft often rely on it to reduce radar visibility."
  },
  {
    termKey: "payload",
    answers: ["payload"],
    definition: "Weapons or equipment carried by an aircraft or drone.",
    hint: "Can include bombs, missiles, sensors, or fuel tanks."
  },
  {
    termKey: "runway",
    answers: ["runway"],
    definition: "Surface where aircraft take off and land.",
    hint: "Often reinforced concrete at military airbases."
  },
  {
    termKey: "decoy",
    answers: ["decoy"],
    definition: "Object used to mislead the enemy.",
    hint: "Can imitate vehicles, radars, or heat sources."
  },
  {
    termKey: "surveillance",
    answers: ["surveillance"],
    definition: "Continuous monitoring or observation of targets.",
    hint: "Drones often perform this mission over long distances."
  },
  {
    termKey: "electronic-warfare",
    answers: ["electronic-warfare"],
    definition: "System used for electromagnetic-spectrum operations such as jamming, spoofing, and SIGINT.",
    hint: "Used by systems like Bukovel, Nota, Krasukha, and NATO REB units."
  },
  {
    termKey: "handgun",
    answers: ["handgun"],
    definition: "Short-range personal firearm held in one hand.",
    hint: "Sidearm typically issued to officers or vehicle crews."
  },
  {
    termKey: "shotgun",
    answers: ["shotgun"],
    definition: "Smoothbore or pump-action long gun for close-range engagements.",
    hint: "Often used for breaching doors."
  },
  {
    termKey: "rifle",
    answers: ["rifle"],
    definition: "Long gun used for accurate fire, including assault rifle variants.",
    hint: "Examples: M16, AK-74, HK416."
  },
  {
    termKey: "carbine",
    answers: ["carbine"],
    definition: "Shorter, lighter version of a rifle.",
    hint: "Common among paratroopers and vehicle crews."
  },
  {
    termKey: "short-barrel-rifle",
    answers: ["short-barrel-rifle", "short-barreled-rifle"],
    definition: "Compact rifle with a reduced barrel length for close-quarters use.",
    hint: "Use hyphens: xxxx-xxxxxx-rifle."
  },
  {
    termKey: "light-machine-gun",
    answers: ["light-machine-gun", "lmg"],
    definition: "Automatic weapon providing suppressive fire for infantry units.",
    hint: "Examples: M249, RPK-74."
  },
  {
    termKey: "machine-gun",
    answers: ["machine-gun"],
    definition: "Fully automatic support gun, often crew-served.",
    hint: "Examples include the PKM and M240."
  },
  {
    termKey: "grenade-launcher",
    answers: ["grenade-launcher"],
    definition: "Weapon that fires explosive grenades.",
    hint: "Common calibers include 30mm and 40mm."
  },
  {
    termKey: "manpat",
    answers: ["manpat"],
    definition: "Short form of a man-portable anti-tank weapon system.",
    hint: "Example: FGM-148 Javelin."
  },
  {
    termKey: "manpad",
    answers: ["manpad"],
    definition: "Shoulder-launched air-defence missile system used to destroy aircraft.",
    hint: "Example: FIM-92 Stinger."
  },
  {
    termKey: "mortar",
    answers: ["mortar"],
    definition: "Short tube weapon for firing shells at high angles.",
    hint: "Common calibers: 60mm, 82mm, 120mm."
  },
  {
    termKey: "armor-piercing",
    answers: ["armor-piercing", "armour-piercing"],
    definition: "Type of ammunition designed to penetrate armor.",
    hint: "Often used against fortified or protected targets."
  },
  {
    termKey: "booby-trap",
    answers: ["booby-trap"],
    definition: "Hidden explosive device set as a trap.",
    hint: "Can be triggered by movement or pressure."
  },
  {
    termKey: "ugv",
    answers: ["ugv", "unmanned-ground-vehicle"],
    definition: "Robotic vehicle operating on land without a crew.",
    hint: "Ukrainian examples include Ironclad and Ratel-S."
  },
  {
    termKey: "assault",
    answers: ["assault"],
    definition: "An attack on an enemy position.",
    hint: "Often coordinated with artillery or armored vehicles."
  },
  {
    termKey: "casevac",
    answers: ["casevac", "casualty-evacuation"],
    definition: "Emergency removal of wounded personnel from the battlefield.",
    hint: "May involve helicopters, APCs, or armored ambulances."
  },
  {
    termKey: "jamming",
    answers: ["jamming"],
    definition: "Interfering with radio or GPS signals.",
    hint: "Used to disrupt drone communication links."
  },
  {
    termKey: "ads",
    answers: ["ads", "air-defence-system", "air-defense-system"],
    definition: "Network for detecting, tracking, and destroying aircraft or missiles.",
    hint: "Examples include Patriot, NASAMS, and IRIS-T."
  },
  {
    termKey: "cruise-missile",
    answers: ["cruise-missile"],
    definition: "Guided missile that flies at low altitude along a planned route.",
    hint: "Often terrain-following and highly accurate."
  },
  {
    termKey: "ballistic-missile",
    answers: ["ballistic-missile"],
    definition: "Missile that follows a high, curved trajectory.",
    hint: "Launched into sub-orbital flight paths."
  }
];

const TOTAL_LEVELS = identityLevels.length + vocabLevels.length;

const FLAG_PHRASES = [
  "IRONFALCON",
  "STRIKEFAST",
  "NIGHTWATCH",
  "STEELRAIN",
  "SHADOWSPEAR",
  "BRAVO6"
];

// --------- GAME STATE ---------

let currentIndex = 0;
let classRaw = "";
let surnameRaw = "";
let solvedAnswers = [];

// --------- INITIAL SETUP ---------

const levelLabelEl = byId("level-label");
const levelCountEl = byId("level-count");
const promptEl = byId("prompt");
const answerInputEl = byId("answer-input");
const submitBtnEl = byId("submit-btn");
const hintEl = byId("hint");
const feedbackEl = byId("feedback");
const progressBarEl = byId("progress-bar");
const identityBoxEl = byId("identity-box");
const identityTextEl = byId("identity-text");
const levelBoxEl = byId("level-box");
const finalBoxEl = byId("final-box");
const flagOutputEl = byId("flag-output");
const copyFlagBtnEl = byId("copy-flag-btn");
const copyFeedbackEl = byId("copy-feedback");

// NEW ELEMENTS
const passwordBoxEl = byId("password-box");
const passwordDisplayEl = byId("password-display");

vocabLevels.forEach((lvl) => {
  lvl.normalizedAnswers = lvl.answers.map((a) => normalize(a));
});

// --------- RENDER END ---------

function updateProgress() {
  const percent = (currentIndex / TOTAL_LEVELS) * 100;
  progressBarEl.style.width = `${percent}%`;
}

function showIdentity() {
  if (classRaw && surnameRaw) {
    identityTextEl.textContent = `${classRaw} — ${surnameRaw}`;
    identityBoxEl.classList.remove("hidden");
  }
}

function updatePasswordField() {
  passwordDisplayEl.textContent = solvedAnswers.join(" ");
}

function renderCurrentLevel() {
  feedbackEl.textContent = "";
  feedbackEl.classList.remove("ok", "error");
  answerInputEl.value = "";
  answerInputEl.focus();

  levelLabelEl.textContent = `Level ${currentIndex + 1}`;
  levelCountEl.textContent = `${currentIndex + 1}/${TOTAL_LEVELS}`;

  if (currentIndex < identityLevels.length) {
    const lvl = identityLevels[currentIndex];
    promptEl.textContent = lvl.prompt;
    hintEl.textContent = lvl.hint || "";
  } else {
    const vocabIndex = currentIndex - identityLevels.length;
    const lvl = vocabLevels[vocabIndex];
    promptEl.textContent = `Definition: ${lvl.definition}`;
    hintEl.textContent = lvl.hint
      ? `Hint: ${lvl.hint} (remember: use hyphens for multi-word terms).`
      : "Remember: use hyphens for multi-word terms.";
  }

  updateProgress();
}

// --------- CHECK ANSWERS ---------

function handleIdentityAnswer(raw) {
  const trimmed = raw.trim();
  if (!trimmed) {
    feedbackEl.textContent = "Please type something.";
    feedbackEl.classList.add("error");
    return false;
  }

  if (currentIndex === 0) {
    classRaw = trimmed;
    showIdentity();
    return true;
  }

  if (currentIndex === 1) {
    surnameRaw = trimmed;
    showIdentity();
    return true;
  }

  return false;
}

function handleVocabAnswer(raw) {
  const vocabIndex = currentIndex - identityLevels.length;
  const lvl = vocabLevels[vocabIndex];
  const userNorm = normalize(raw);

  if (lvl.normalizedAnswers.includes(userNorm)) {
    solvedAnswers.push(userNorm);
    updatePasswordField();
    return true;
  }

  feedbackEl.textContent = "Not correct yet. Check spelling and hyphens.";
  feedbackEl.classList.add("error");
  return false;
}

function handleSubmit() {
  const val = answerInputEl.value.trim();
  feedbackEl.textContent = "";
  feedbackEl.classList.remove("ok", "error");

  if (!val) {
    feedbackEl.textContent = "Answer cannot be empty.";
    feedbackEl.classList.add("error");
    return;
  }

  let ok = false;

  if (currentIndex < identityLevels.length) {
    ok = handleIdentityAnswer(val);
  } else {
    ok = handleVocabAnswer(val);
  }

  if (ok) {
    feedbackEl.textContent = "Correct!";
    feedbackEl.classList.add("ok");

    currentIndex += 1;
    if (currentIndex >= TOTAL_LEVELS) {
      finishGame();
    } else {
      setTimeout(renderCurrentLevel, 450);
    }
  }
}

// --------- FINAL FLAG ---------

function generateFlag() {
  const phrase = FLAG_PHRASES[Math.floor(Math.random() * FLAG_PHRASES.length)];
  return `LGK{${classRaw}-${surnameRaw}-${phrase}}`;
}

function finishGame() {
  levelBoxEl.classList.add("hidden");
  finalBoxEl.classList.remove("hidden");

  const flag = generateFlag();
  flagOutputEl.textContent = flag;
  copyFeedbackEl.textContent = "";
}

// --------- EVENTS ---------

submitBtnEl.addEventListener("click", handleSubmit);
answerInputEl.addEventListener("keydown", (e) => {
  if (e.key === "Enter") handleSubmit();
});

copyFlagBtnEl.addEventListener("click", () => {
  const text = flagOutputEl.textContent.trim();
  if (!text) return;

  navigator.clipboard
    .writeText(text)
    .then(() => (copyFeedbackEl.textContent = "Flag copied."))
    .catch(() => (copyFeedbackEl.textContent = "Copy failed."));
});

// --------- START ---------

renderCurrentLevel();
updateProgress();
updatePasswordField();
