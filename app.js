const questions = [
  {
    name: "Fuehlen Sie sich haeufig muede und erschoepft",
    text: "Fühlen Sie sich häufig müde und erschöpft?"
  },
  {
    name: "Faellt es Ihnen schwer sich ueber laengere Zeit zu konzentrieren",
    text: "Fällt es Ihnen schwer, sich über längere Zeit zu konzentrieren?"
  },
  {
    name: "Fuehlen Sie sich haeufig gestresst",
    text: "Fühlen Sie sich häufig gestresst?"
  },
  {
    name: "Sind Sie anfaellig fuer Erkaeltungen oder Infektionen",
    text: "Sind Sie anfällig für Erkältungen oder Infektionen?"
  },
  {
    name: "Haben Sie Probleme mit Ihrer Verdauung oder Darmfunktion",
    text: "Haben Sie Probleme mit Ihrer Verdauung oder Darmfunktion?"
  },
  {
    name: "Haben Sie Probleme durchzuschlafen",
    text: "Haben Sie Probleme durchzuschlafen?"
  },
  {
    name: "Wachen Sie morgens haeufig auf ohne richtig erholt zu sein",
    text: "Wachen Sie morgens häufig auf, ohne richtig erholt zu sein?"
  },
  {
    name: "Haben Sie haeufig Wadenkraempfe oder Morgensteifigkeit",
    text: "Haben Sie häufig Wadenkrämpfe oder Morgensteifigkeit?"
  },
  {
    name: "Sind Sie mit Ihrer Haut Ihren Haaren oder Ihren Naegeln unzufrieden",
    text: "Sind Sie mit Ihrer Haut, Ihren Haaren oder Ihren Nägeln unzufrieden?"
  },
  {
    name: "Leiden Sie unter Arthrose oder Arthritis",
    text: "Leiden Sie unter Arthrose oder Arthritis?"
  },
  {
    name: "Treiben Sie regelmaessig Sport",
    text: "Treiben Sie regelmäßig Sport?"
  },
  {
    name: "Essen Sie zwei bis dreimal pro Woche frischen Lachs Makrele oder Thunfisch",
    text: "Essen Sie zwei- bis dreimal pro Woche frischen Lachs, Makrele oder Thunfisch?"
  },
  {
    name: "Leiden Sie als Frau unter typischen peri oder menopausalen Beschwerden",
    text: "Leiden Sie als Frau unter typischen peri- oder menopausalen Beschwerden?",
    options: [
      { value: "Ja", label: "Ja" },
      { value: "Nein", label: "Nein" },
      { value: "Ich bin maennlich", label: "Ich bin männlich" }
    ]
  },
  {
    name: "Moechten Sie als Mann Ihren Testosteronspiegel verbessern",
    text: "Möchten Sie als Mann Ihren Testosteronspiegel verbessern?",
    options: [
      { value: "Ja", label: "Ja" },
      { value: "Nein", label: "Nein" },
      { value: "Ich bin weiblich", label: "Ich bin weiblich" }
    ]
  },
  {
    name: "Moechten Sie Ihr Gewicht optimieren",
    text: "Möchten Sie Ihr Gewicht optimieren?",
    type: "weight"
  },
  {
    name: "Gibt es Lebensmittel die Sie nicht vertragen",
    text: "Gibt es Lebensmittel, die Sie nicht vertragen?",
    type: "intolerance"
  },
  {
    name: "Treiben Ihre Kinder Sport",
    text: "Treiben Ihre Kinder Sport?"
  },
  {
    name: "Haben Sie ein Kind mit Konzentrations oder Aufmerksamkeitsstoerungen",
    text: "Haben Sie ein Kind mit Konzentrations- oder Aufmerksamkeitsstörungen?"
  },
  {
    name: "Essen Sie taeglich weniger als fuenf Portionen Obst und Gemuese",
    text: "Essen Sie täglich weniger als fünf Portionen Obst und Gemüse?"
  },
  {
    name: "Essen Sie mehrfach in der Woche Fast Food",
    text: "Essen Sie mehrfach in der Woche Fast Food ?"
  }
];

const form = document.getElementById("contactForm");
const questionSteps = document.getElementById("questionSteps");
const formError = document.getElementById("formError");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const submitBtn = document.getElementById("submitBtn");
const stepText = document.getElementById("stepText");
const progressText = document.getElementById("progressText");
const progressFill = document.getElementById("progressFill");
const successMessage = document.getElementById("successMessage");
const startButton = document.getElementById("startButton");

const DEFAULT_OPTIONS = [
  { value: "Ja", label: "Ja" },
  { value: "Nein", label: "Nein" }
];

function createOptionCard(questionName, option, required = false) {
  return `
    <label class="option-card">
      <input
        type="radio"
        name="${questionName}"
        value="${option.value}"
        ${required ? "required" : ""}
      >
      <span>${option.label}</span>
    </label>
  `;
}

function createStandardQuestion(question, index) {
  const options = question.options || DEFAULT_OPTIONS;

  return `
    <section
      class="step health-question"
      data-question-type="standard"
      data-auto-advance="true"
    >
      <p class="step-kicker">
        Gesundheitsfrage ${index + 1} von ${questions.length}
      </p>

      <h2>${question.text}</h2>

      <div class="choice-grid ${options.length === 2 ? "two" : ""}">
        ${options
          .map((option, optionIndex) =>
            createOptionCard(question.name, option, optionIndex === 0)
          )
          .join("")}
      </div>
    </section>
  `;
}

function createWeightQuestion(question, index) {
  return `
    <section
      class="step health-question"
      data-question-type="weight"
      data-auto-advance="conditional"
    >
      <p class="step-kicker">
        Gesundheitsfrage ${index + 1} von ${questions.length}
      </p>

      <h2>${question.text}</h2>

      <div class="choice-grid two">
        ${createOptionCard(question.name, { value: "Ja", label: "Ja" }, true)}
        ${createOptionCard(question.name, { value: "Nein", label: "Nein" })}
      </div>

      <div class="conditional-box" data-weight-box hidden>
        <p class="conditional-title">Was möchten Sie erreichen?</p>

        <div class="choice-grid two">
          <label class="option-card">
            <input
              type="radio"
              name="Gewichtsziel"
              value="Abnehmen"
              data-conditional-required
            >
            <span>Abnehmen</span>
          </label>

          <label class="option-card">
            <input
              type="radio"
              name="Gewichtsziel"
              value="Zunehmen"
            >
            <span>Zunehmen</span>
          </label>
        </div>
      </div>
    </section>
  `;
}

function createIntoleranceQuestion(question, index) {
  return `
    <section
      class="step health-question"
      data-question-type="intolerance"
      data-auto-advance="conditional"
    >
      <p class="step-kicker">
        Gesundheitsfrage ${index + 1} von ${questions.length}
      </p>

      <h2>${question.text}</h2>

      <div class="choice-grid two">
        ${createOptionCard(question.name, { value: "Ja", label: "Ja" }, true)}
        ${createOptionCard(question.name, { value: "Nein", label: "Nein" })}
      </div>

      <div class="conditional-box" data-intolerance-box hidden>
        <label>
          Welche Unverträglichkeiten liegen vor?
          <input
            type="text"
            name="Lebensmittel Unvertraeglichkeiten"
            placeholder="z. B. Gluten, Laktose, Fruktose"
            data-conditional-required
          >
        </label>
      </div>
    </section>
  `;
}

function renderQuestions() {
  questionSteps.innerHTML = questions
    .map((question, index) => {
      if (question.type === "weight") {
        return createWeightQuestion(question, index);
      }

      if (question.type === "intolerance") {
        return createIntoleranceQuestion(question, index);
      }

      return createStandardQuestion(question, index);
    })
    .join("");
}

renderQuestions();

const steps = [...document.querySelectorAll(".step")];
let currentStep = 0;
let autoAdvanceTimer = null;

function showError(message) {
  formError.textContent = message;
}

function clearError() {
  formError.textContent = "";
}

function clearAutoAdvanceTimer() {
  if (autoAdvanceTimer) {
    window.clearTimeout(autoAdvanceTimer);
    autoAdvanceTimer = null;
  }
}

function scheduleNextStep(delay = 180) {
  clearAutoAdvanceTimer();

  autoAdvanceTimer = window.setTimeout(() => {
    autoAdvanceTimer = null;
    nextStep();
  }, delay);
}

function getFields(step) {
  return [...step.querySelectorAll("input, select, textarea")].filter(
    field => field.name !== "botcheck" && !field.disabled
  );
}

function updateConditionalRequirement(container, active) {
  if (!container) return;

  const conditionalField = container.querySelector("[data-conditional-required]");

  if (conditionalField) {
    conditionalField.required = active;
  }
}

function resetConditionalFields(container) {
  if (!container) return;

  container.querySelectorAll("input").forEach(input => {
    if (input.type === "radio" || input.type === "checkbox") {
      input.checked = false;
    } else {
      input.value = "";
    }

    input.required = false;
  });
}

function validateCurrentStep() {
  const step = steps[currentStep];

  if (!step) {
    return false;
  }

  if (step.classList.contains("priority-step")) {
    const selected = step.querySelectorAll(
      'input[type="checkbox"]:checked'
    ).length;

    if (selected === 0) {
      showError("Bitte wählen Sie mindestens eine Antwort aus.");
      return false;
    }

    if (selected > 3) {
      showError("Bitte wählen Sie maximal drei Antworten aus.");
      return false;
    }

    return true;
  }

  const fields = getFields(step);

  for (const field of fields) {
    if (!field.checkValidity()) {
      showError(
        "Bitte beantworten Sie diese Frage bzw. füllen Sie alle Pflichtfelder korrekt aus."
      );
      field.reportValidity();
      return false;
    }
  }

  return true;
}

function updateWizard() {
  clearAutoAdvanceTimer();

  steps.forEach((step, index) => {
    step.classList.toggle("active", index === currentStep);
  });

  const total = steps.length;
  const percent =
    total > 1 ? Math.round((currentStep / (total - 1)) * 100) : 100;

  stepText.textContent = `Schritt ${currentStep + 1} von ${total}`;
  progressText.textContent = `${percent}%`;
  progressFill.style.width = `${percent}%`;

  prevBtn.style.visibility = currentStep === 0 ? "hidden" : "visible";
  nextBtn.style.display =
    currentStep === total - 1 ? "none" : "inline-flex";
  submitBtn.style.display =
    currentStep === total - 1 ? "inline-flex" : "none";

  clearError();

  const cardTop = form.getBoundingClientRect().top + window.scrollY - 12;

  window.scrollTo({
    top: cardTop,
    behavior: "smooth"
  });
}

function nextStep() {
  if (!validateCurrentStep()) {
    return;
  }

  if (currentStep < steps.length - 1) {
    currentStep += 1;
    updateWizard();
  }
}

function prevStep() {
  if (currentStep > 0) {
    currentStep -= 1;
    updateWizard();
  }
}

function handlePrioritySelection(field) {
  const step = field.closest(".priority-step");

  if (!step) {
    return false;
  }

  const selected = [
    ...step.querySelectorAll('input[type="checkbox"]:checked')
  ];

  if (selected.length > 3) {
    field.checked = false;
    showError("Bitte wählen Sie maximal drei Antworten aus.");
  } else {
    clearError();
  }

  return true;
}

function handleWeightQuestion(field, step) {
  const weightBox = step.querySelector("[data-weight-box]");

  if (field.name === "Moechten Sie Ihr Gewicht optimieren") {
    const isYes = field.value === "Ja";

    weightBox.hidden = !isYes;
    updateConditionalRequirement(weightBox, isYes);

    if (isYes) {
      clearError();
      return true;
    }

    resetConditionalFields(weightBox);
    scheduleNextStep();
    return true;
  }

  if (field.name === "Gewichtsziel") {
    scheduleNextStep();
    return true;
  }

  return false;
}

function handleIntoleranceQuestion(field, step) {
  if (field.name !== "Gibt es Lebensmittel die Sie nicht vertragen") {
    return false;
  }

  const intoleranceBox = step.querySelector("[data-intolerance-box]");
  const isYes = field.value === "Ja";

  intoleranceBox.hidden = !isYes;
  updateConditionalRequirement(intoleranceBox, isYes);

  if (isYes) {
    clearError();

    const textField = intoleranceBox.querySelector('input[type="text"]');

    window.setTimeout(() => {
      textField?.focus();
    }, 50);

    return true;
  }

  resetConditionalFields(intoleranceBox);
  scheduleNextStep();
  return true;
}

nextBtn.addEventListener("click", nextStep);
prevBtn.addEventListener("click", prevStep);

form.addEventListener("keydown", event => {
  if (event.key !== "Enter" || event.target.tagName === "TEXTAREA") {
    return;
  }

  if (
    event.target.name === "Lebensmittel Unvertraeglichkeiten" ||
    event.target.type === "text" ||
    event.target.type === "email" ||
    event.target.type === "tel" ||
    event.target.type === "number"
  ) {
    return;
  }

  event.preventDefault();

  if (currentStep < steps.length - 1) {
    nextStep();
  }
});

form.addEventListener("input", event => {
  const field = event.target;

  if (field.name === "Vouchernummer") {
    field.value = field.value.replace(/\D/g, "").slice(0, 6);
  }
});

form.addEventListener("change", event => {
  const field = event.target;
  const step = field.closest(".step");

  if (!step) {
    return;
  }

  if (handlePrioritySelection(field)) {
    return;
  }

  const questionType = step.dataset.questionType;

  if (questionType === "weight" && handleWeightQuestion(field, step)) {
    return;
  }

  if (
    questionType === "intolerance" &&
    handleIntoleranceQuestion(field, step)
  ) {
    return;
  }

  if (
    field.type === "radio" &&
    step.dataset.autoAdvance === "true"
  ) {
    scheduleNextStep();
  }
});

form.addEventListener("submit", async event => {
  event.preventDefault();
  clearError();

  if (!validateCurrentStep()) {
    return;
  }

  if (!form.checkValidity()) {
    showError("Bitte prüfen Sie Ihre Angaben.");
    form.reportValidity();
    return;
  }

  submitBtn.disabled = true;
  submitBtn.textContent = "Wird gesendet...";

  try {
    const data = new FormData(form);

    const response = await fetch(form.action, {
      method: "POST",
      body: data,
      headers: {
        Accept: "application/json"
      }
    });

    const result = await response.json();

    if (!response.ok || !result.success) {
      throw new Error(result.message || "Fehler bei der Übermittlung");
    }

    form.hidden = true;
    successMessage.hidden = false;
    successMessage.focus();

    window.scrollTo({
      top: successMessage.offsetTop - 40,
      behavior: "smooth"
    });
  } catch (error) {
    console.error(error);

    showError(
      "Die Übermittlung ist fehlgeschlagen. Bitte versuchen Sie es erneut."
    );

    submitBtn.disabled = false;
    submitBtn.textContent = "Fitness-Check absenden";
  }
});

startButton.addEventListener("click", () => {
  window.setTimeout(updateWizard, 250);
});

window.history.scrollRestoration = "manual";

document.addEventListener("DOMContentLoaded", () => {
  updateWizard();

  window.setTimeout(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant"
    });
  }, 10);
});
