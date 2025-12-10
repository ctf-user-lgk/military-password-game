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

// Identity "levels": class, surname, combined
const identityLevels = [
  {
    id: "class",
    prompt: "Level 1 — Type your CLASS (e.g. 10-B). This will appear in your final flag.",
    hint: "Example: 10-B, 11-A, 9-В.",
  },
  {
    id: "surname",
    prompt: "Level 2 — Type your SURNAME (e.g. Shevchenko).",
    hint: "Use Latin letters if possible, like on a passport.",
  }
];

// Vocabulary levels — singular, hyphenated where needed
// Each level: { termKey, answers: [...], definition, hint }
const vocabLevels = [
  {
    termKey: "cca",
    answers: ["cca", "collaborative-combat-aircraft"],
    definition: "Autonomous drone that works together with a fighter jet.",
    hint: "Abbreviation: CCA.",
  },
  {
    termKey: "cockpit",
    answers: ["cockpit"],
    definition: "Pilot’s control area in an aircraft.",
    hint: "Starts with 'c'.",
  },
  {
    termKey: "jet",
    answers: ["jet"],
    definition: "High-speed military aircraft powered by turbines.",
    hint: "Three letters.",
  },
  {
    termKey: "engine",
    answers: ["engine"],
    definition: "The power unit of an aircraft.",
    hint: "Also found in cars.",
  },
  {
    termKey: "coating",
    answers: ["coating"],
    definition: "Special surface layer for protection or stealth.",
    hint: "Radar-absorbing ______.",
  },
  {
    termKey: "payload",
    answers: ["payload"],
    definition: "Weapons or equipment an aircraft or drone carries.",
    hint: "Also used in rockets and UGVs.",
  },
  {
    termKey: "runway",
    answers: ["runway"],
    definition: "Surface where aircraft take off and land.",
    hint: "A plane rolls along this.",
  },
  {
    termKey: "decoy",
    answers: ["decoy"],
    definition: "Object used to mislead the enemy.",
    hint: "Fake target.",
  },
  {
    termKey: "surveillance",
    answers: ["surveillance"],
    definition: "Continuous monitoring or observation of targets.",
    hint: "Video _____ cameras.",
  },
  {
    termKey: "electronic-warfare",
    answers: ["electronic-warfare"],
    definition:
      "Use of the electromagnetic spectrum to attack or defend (jamming, spoofing, SIGINT).",
    hint: "Two words: _________ warfare (use hyphen).",
  },
  {
    termKey: "handgun",
    answers: ["handgun"],
    definition: "Short-range personal firearm held in one hand.",
    hint: "Pistol is a type of this.",
  },
  {
    termKey: "shotgun",
    answers: ["shotgun"],
    definition: "Smoothbore or pump-action long gun, often for close range.",
    hint: "Common in breaching and police work.",
  },
  {
    termKey: "rifle",
    answers: ["rifle"],
    definition: "Long gun, including assault rifle types.",
    hint: "Used by infantry as main weapon.",
  },
  {
    termKey: "carbine",
    answers: ["carbine"],
    definition: "Shorter, lighter version of a rifle.",
    hint: "Often for paratroopers or vehicle crews.",
  },
  {
    termKey: "short-barrel-rifle",
    answers: ["short-barrel-rifle", "short-barreled-rifle"],
    definition: "Rifle with a shortened barrel for compact use (SBR).",
    hint: "Use hyphens: _____-barrel-rifle.",
  },
  {
    termKey: "light-machine-gun",
    answers: ["light-machine-gun", "lmg"],
    definition: "Lightweight automatic weapon providing support fire (LMG).",
    hint: "Three words: light-_____-gun.",
  },
  {
    termKey: "machine-gun",
    answers: ["machine-gun"],
    definition: "Fully automatic, often crew-served support gun.",
    hint: "Classic belt-fed weapon.",
  },
  {
    termKey: "grenade-launcher",
    answers: ["grenade-launcher"],
    definition: "Weapon that fires explosive grenades.",
    hint: "40mm rounds are common.",
  },
  {
    termKey: "manpat",
    answers: ["manpat"],
    definition: "Man-portable anti-tank weapon system (short form).",
    hint: "Abbreviation: MANPAT.",
  },
  {
    termKey: "manpads",
    answers: ["manpads"],
    definition: "Man-portable air-defence missile system.",
    hint: "Abbreviation: MANPADS.",
  },
  {
    termKey: "mortar",
    answers: ["mortar"],
    definition: "Short tube weapon for firing shells at high angles.",
    hint: "Used for indirect fire from trenches.",
  },
  {
    termKey: "armor-piercing",
    answers: ["armor-piercing", "armour-piercing"],
    definition: "Type of ammunition designed to penetrate armor.",
    hint: "Two words, use hyphen.",
  },
  {
    termKey: "booby-trap",
    answers: ["booby-trap"],
    definition: "Hidden explosive device or mine set as a trap.",
    hint: "Two words, use hyphen.",
  },
  {
    termKey: "ugv",
    answers: ["ugv", "unmanned-ground-vehicle"],
    definition: "Robot operating on land without a crew (Unmanned Ground Vehicle).",
    hint: "Abbreviation: UGV.",
  },
  {
    termKey: "assault",
    answers: ["assault"],
    definition: "An attack on an enemy position.",
    hint: "Also the name of a type of rifle.",
  },
  {
    termKey: "casevac",
    answers: ["casevac", "casualty-evacuation"],
    definition: "Removing wounded from the battlefield (casualty evacuation).",
    hint: "Abbreviation: CASEVAC.",
  },
  {
    termKey: "jamming",
    answers: ["jamming"],
    definition: "Blocking or interfering with radio or GPS signals.",
    hint: "Important part of electronic warfare.",
  },
  {
    termKey: "ads",
    answers: ["ads", "air-defence-system", "air-defense-system"],
    definition:
      "Network designed to detect, track, and destroy enemy aircraft or missiles.",
    hint: "Abbreviation: ADS.",
  },
  {
    termKey: "cruise-missile",
    answers: ["cruise-missile"],
    definition: "Guided missile that flies at low altitude along a planned route.",
    hint: "Two words, use hyphen.",
  },
  {
    termKey: "ballistic-missile",
    answers: ["ballistic-missile"],
    definition: "Missile that follows a high, curved trajectory.",
    hint: "Two words, use hyphen.",
  },
];

// Total number of levels (identity + vocab)
const TOTAL_LEVELS = identityLevels.length + vocabLevels.length;

// Flag phrases
const FLAG_PHRASES = [
  "IRONFALCON",
  "STRIKEFAST",
  "NIGHTWATCH",
  "STEELRAIN",
  "SHADOWSPEAR",
  "BRAVO6",
];

// --------- GAME STATE ---------

let currentIndex = 0; // global index across identity + vocab
let classRaw = "";
let surnameRaw = "";

// --------- INITIALISATION ---------

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

// Pre-normalise vocab answers for faster checking
vocabLevels.forEach((lvl) => {
  lvl.normalizedAnswers = lvl.answers.map((a) => normalize(a));
});

// --------- RENDERING ---------

function updateProgress() {
  const percent = ((currentIndex) / TOTAL_LEVELS) * 100;
  progressBarEl.style.width = `${percent}%`;
}

function showIdentity() {
  if (classRaw && surnameRaw) {
    identityTextEl.textContent = `${classRaw} — ${surnameRaw}`;
    identityBoxEl.classList.remove("hidden");
  }
}

function renderCurrentLevel() {
  feedbackEl.textContent = "";
  feedbackEl.classList.remove("ok", "error");
  answerInputEl.value = "";
  answerInputEl.focus();

  levelLabelEl.textContent = `Level ${currentIndex + 1}`;
  levelCountEl.textContent = `${currentIndex + 1}/${TOTAL_LEVELS}`;

  if (currentIndex < identityLevels.length) {
    // Identity phase
    const lvl = identityLevels[currentIndex];
    promptEl.textContent = lvl.prompt;
    hintEl.textContent = lvl.hint || "";
  } else {
    // Vocab phase
    const vocabIndex = currentIndex - identityLevels.length;
    const lvl = vocabLevels[vocabIndex];
    promptEl.textContent = `Definition: ${lvl.definition}`;
    hintEl.textContent = lvl.hint
      ? `Hint: ${lvl.hint} (remember: use hyphens for multi-word terms).`
      : "Remember: multi-word terms use hyphens.";
  }

  updateProgress();
}

// --------- CHECKING ANSWERS ---------

function handleIdentityAnswer(raw) {
  const trimmed = raw.trim();
  if (!trimmed) {
    feedbackEl.textContent = "Please type something.";
    feedbackEl.classList.add("error");
    return false;
  }

  if (currentIndex === 0) {
    // Class
    classRaw = trimmed;
    showIdentity();
    return true;
  }

  if (currentIndex === 1) {
    // Surname
    surnameRaw = trimmed;
    showIdentity();
    return true;
  }

  if (currentIndex === 2) {
    // Combined CLASS-SURNAME, check structure
    if (!classRaw || !surnameRaw) {
      feedbackEl.textContent = "You must complete class and surname first.";
      feedbackEl.classList.add("error");
      return false;
    }

    const expected = normalize(`${classRaw}-${surnameRaw}`);
    const given = normalize(trimmed);

    if (expected === given) {
      return true;
    } else {
      feedbackEl.textContent =
        "Check the format: CLASS-SURNAME with a hyphen, exactly like your own data.";
      feedbackEl.classList.add("error");
      return false;
    }
  }

  return false;
}

function handleVocabAnswer(raw) {
  const vocabIndex = currentIndex - identityLevels.length;
  const lvl = vocabLevels[vocabIndex];
  const userNorm = normalize(raw);

  if (lvl.normalizedAnswers.includes(userNorm)) {
    return true;
  } else {
    feedbackEl.textContent = "Not correct yet. Check spelling and hyphens.";
    feedbackEl.classList.add("error");
    return false;
  }
}

function handleSubmit() {
  const val = answerInputEl.value;
  feedbackEl.textContent = "";
  feedbackEl.classList.remove("ok", "error");

  if (!val.trim()) {
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
    feedbackEl.classList.remove("error");
    feedbackEl.classList.add("ok");

    currentIndex += 1;
    if (currentIndex >= TOTAL_LEVELS) {
      finishGame();
    } else {
      setTimeout(renderCurrentLevel, 500);
    }
  }
}

// --------- FINAL FLAG ---------

function generateFlag() {
  const phrase =
    FLAG_PHRASES[Math.floor(Math.random() * FLAG_PHRASES.length)] || "IRONFALCON";
  const cls = classRaw || "10-B";
  const name = surnameRaw || "Cadet";

  // Format required:
  // LGK{10-B-Shevchenko-phrase}
  return `LGK{${cls}-${name}-${phrase}}`;
}

function finishGame() {
  levelBoxEl.classList.add("hidden");
  finalBoxEl.classList.remove("hidden");
  updateProgress();

  const flag = generateFlag();
  flagOutputEl.textContent = flag;
  copyFeedbackEl.textContent = "";
}

// --------- EVENTS ---------

submitBtnEl.addEventListener("click", handleSubmit);

answerInputEl.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    handleSubmit();
  }
});

copyFlagBtnEl.addEventListener("click", () => {
  const text = flagOutputEl.textContent.trim();
  if (!text) return;

  navigator.clipboard
    .writeText(text)
    .then(() => {
      copyFeedbackEl.textContent = "Flag copied to clipboard.";
    })
    .catch(() => {
      copyFeedbackEl.textContent = "Could not copy automatically, copy it manually.";
    });
});

// --------- START ---------

renderCurrentLevel();
updateProgress();
