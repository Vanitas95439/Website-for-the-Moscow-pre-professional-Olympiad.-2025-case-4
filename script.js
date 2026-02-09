const screenshotsData = {
  basic: [
    {
      image: "src/1.jpg",
      title: "Выбор услуги",
      description: "На этом скриншоте показано, как выбрать услугу на сайте.",
    },
    {
      image: "src/2.jpg",
      title: "Подтверждение выбора услуги",
      description:
        "Здесь показана информация об услуге. Подтвердите получение услуги, нажав на кнопку 'Начать'",
    },
    {
      image: "src/3.jpg",
      title: "Указание полиса ОМС",
      description: "На данной странице необходимо указать полис ОМС",
    },
    {
      image: "src/4.jpg",
      title: "Выбор врача",
      description:
        "Скриншот показывает, как выбрать специальность врача на сайте",
    },
    {
      image: "src/5.jpg",
      title: "Выбор специалиста",
      description: "Скриншот показывает, как выбрать ФИО врача на сайте",
    },
    {
      image: "src/6.jpg",
      title: "Выбор места поликлинники",
      description:
        "Выбор места, в котором будет проходить приём. Найдите его на карте и нажмите на него",
    },
    {
      image: "src/7.jpg",
      title: "Выбор даты и времени",
      description:
        "Укажите удобную вам дату и время, как показано на скриншоте",
    },
  ],
  advanced: [
    {
      image: "src/8.jpg",
      title: "Получение электронного свидетельства пенсионера",
      description:
        "На данном скриншоте показана инструкция от робота МАКС, как получить электронное свидетельство пенсионера",
    },
  ],
};

let currentStep = 0;
let currentDifficulty = "basic";
let isVoiceEnabled = false;
let speech = null;
let cursorHintTimeout = null;

const screenshotImg = document.getElementById("screenshot-img");
const screenshotTitle = document.getElementById("screenshot-title");
const screenshotText = document.getElementById("screenshot-text");
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");
const basicBtn = document.getElementById("basic-btn");
const advancedBtn = document.getElementById("advanced-btn");
const voiceBtn = document.getElementById("voice-btn");
const voiceStatus = document.getElementById("voice-status");
const helpBtn = document.getElementById("help-btn");
const helpOverlay = document.getElementById("help-overlay");
const closeHelp = document.getElementById("close-help");
const progressFill = document.getElementById("progress-fill");
const currentStepElement = document.getElementById("current-step");
const difficultyIndicator = document.getElementById("difficulty-indicator");
const cursorHint = document.getElementById("cursor-hint");

function initializeSpeech() {
  if ("speechSynthesis" in window) {
    speech = new SpeechSynthesisUtterance();
    speech.lang = "ru-RU";
    speech.rate = 0.9;
    speech.pitch = 1;
    const voices = speechSynthesis.getVoices();
    const russianVoice = voices.find((voice) => voice.lang.startsWith("ru"));
    if (russianVoice) {
      speech.voice = russianVoice;
    }
  } else {
    voiceBtn.disabled = true;
    voiceStatus.textContent =
      "Голосовое сопровождение не поддерживается в вашем браузере";
  }
}

function loadScreenshot(step) {
  const screenshots = screenshotsData[currentDifficulty];

  if (step >= 0 && step < screenshots.length) {
    const screenshot = screenshots[step];

    screenshotImg.src = screenshot.image;
    screenshotTitle.textContent = screenshot.title;
    screenshotText.textContent = screenshot.description;

    prevBtn.disabled = step === 0;
    nextBtn.disabled = step === screenshots.length - 1;

    const progress = ((step + 1) / screenshots.length) * 100;
    progressFill.style.width = `${progress}%`;

    currentStepElement.textContent = `Шаг ${step + 1} из ${screenshots.length}`;
    difficultyIndicator.textContent = `Уровень: ${currentDifficulty === "basic" ? "Базовый" : "Расширенный"}`;

    if (isVoiceEnabled) {
      speechSynthesis.cancel();
      setTimeout(() => speakCurrentDescription(), 300);
    }

    clearTimeout(cursorHintTimeout);
    cursorHintTimeout = setTimeout(showCursorHint, 1000);

    highlightActiveAreas();
  }
}

function showCursorHint() {
  const container = document.querySelector(".screenshot-container");
  const rect = container.getBoundingClientRect();

  const x = rect.left + rect.width * 0.7;
  const y = rect.top + rect.height * 0.3;

  cursorHint.style.left = `${x}px`;
  cursorHint.style.top = `${y}px`;
  cursorHint.style.opacity = "1";

  setTimeout(() => {
    const newX = rect.left + rect.width * 0.3;
    const newY = rect.top + rect.height * 0.6;

    cursorHint.style.left = `${newX}px`;
    cursorHint.style.top = `${newY}px`;
  }, 1000);

  setTimeout(() => {
    cursorHint.style.opacity = "0";
  }, 3000);
}

function highlightActiveAreas() {
  const previousHighlights = document.querySelectorAll(".highlight");
  previousHighlights.forEach((el) => el.classList.remove("highlight"));

  setTimeout(() => {
    if (currentStep < screenshotsData[currentDifficulty].length - 1) {
      nextBtn.classList.add("highlight");
    }

    if (currentStep > 0) {
      prevBtn.classList.add("highlight");
    }

    setTimeout(() => {
      nextBtn.classList.remove("highlight");
      prevBtn.classList.remove("highlight");
    }, 2000);
  }, 500);
}

function speakCurrentDescription() {
  if (!isVoiceEnabled || !speech) return;

  const screenshots = screenshotsData[currentDifficulty];
  const screenshot = screenshots[currentStep];

  speech.text = `${screenshot.title}. ${screenshot.description}`;
  speechSynthesis.speak(speech);
}

function toggleVoice() {
  isVoiceEnabled = !isVoiceEnabled;

  if (isVoiceEnabled) {
    voiceBtn.classList.add("active");
    voiceBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
    voiceStatus.textContent = "Голосовое сопровождение включено";
    speakCurrentDescription();
  } else {
    voiceBtn.classList.remove("active");
    voiceBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
    voiceStatus.textContent = "Голосовое сопровождение выключено";
    speechSynthesis.cancel();
  }
}

function changeDifficulty(difficulty) {
  currentDifficulty = difficulty;
  currentStep = 0;

  basicBtn.classList.toggle("active", difficulty === "basic");
  advancedBtn.classList.toggle("active", difficulty === "advanced");

  loadScreenshot(currentStep);
}

function init() {
  loadScreenshot(currentStep);

  initializeSpeech();

  prevBtn.addEventListener("click", () => {
    if (currentStep > 0) {
      currentStep--;
      loadScreenshot(currentStep);
    }
  });

  nextBtn.addEventListener("click", () => {
    const screenshots = screenshotsData[currentDifficulty];
    if (currentStep < screenshots.length - 1) {
      currentStep++;
      loadScreenshot(currentStep);
    }
  });

  basicBtn.addEventListener("click", () => changeDifficulty("basic"));
  advancedBtn.addEventListener("click", () => changeDifficulty("advanced"));

  voiceBtn.addEventListener("click", toggleVoice);

  helpBtn.addEventListener("click", () => {
    helpOverlay.classList.add("active");
  });

  closeHelp.addEventListener("click", () => {
    helpOverlay.classList.remove("active");
  });

  helpOverlay.addEventListener("click", (e) => {
    if (e.target === helpOverlay) {
      helpOverlay.classList.remove("active");
    }
  });

  window.speechSynthesis.onvoiceschanged = initializeSpeech;

  setTimeout(() => {
    helpBtn.classList.add("highlight");
    setTimeout(() => helpBtn.classList.remove("highlight"), 3000);
  }, 2000);
}

document.addEventListener("DOMContentLoaded", init);

let progressStore = JSON.parse(localStorage.getItem("progress")) || {};

function restoreProgress() {
  if (progressStore[currentDifficulty] !== undefined) {
    currentStep = progressStore[currentDifficulty];
    loadScreenshot(currentStep);
  }
}

function saveProgress() {
  progressStore[currentDifficulty] = currentStep;
  localStorage.setItem("progress", JSON.stringify(progressStore));
}

const oldLoadScreenshot = loadScreenshot;
loadScreenshot = function (step) {
  oldLoadScreenshot(step);
  saveProgress();

  const taskBox = document.getElementById("task-box");
  const testBox = document.getElementById("test-box");
  if (taskBox) taskBox.classList.add("hidden");
  if (testBox) testBox.classList.add("hidden");

  if (currentDifficulty === "basic" && step === 2) {
    showTask("Что нужно нажать, чтобы выбрать услугу?");
  }

  if (
    step === screenshotsData[currentDifficulty].length - 1 &&
    currentDifficulty == "basic"
  ) {
    showTest();
  }
};

function showTask(text) {
  const box = document.getElementById("task-box");
  if (!box) return;
  document.getElementById("task-text").textContent = text;
  box.classList.remove("hidden");
}

function checkTask() {
  alert("Верно!");
  document.getElementById("task-box").classList.add("hidden");
}

function showTest() {
  const box = document.getElementById("test-box");
  if (!box) return;
  box.classList.remove("hidden");
}

function finishTest() {
  alert("🏆 Достижение: курс пройден!");
  document.getElementById("test-box").classList.add("hidden");
}

const oldInit = init;
init = function () {
  oldInit();
  restoreProgress();
};
