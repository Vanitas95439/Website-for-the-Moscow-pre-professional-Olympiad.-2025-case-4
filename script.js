// Модель данных скриншотов
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
        "Здесь показана информация об услуге. Основные элементы: панель инструментов с кнопками форматирования, область ввода текста и линейка для установки отступов. Обратите внимание на кнопки сохранения и печати в верхнем левом углу.",
    },
    {
      image: "src/3.jpg",
      title: "Настройки интернета",
      description:
        "Это окно настроек подключения к интернету. Важные элементы: переключатель Wi-Fi, список доступных сетей и кнопка подключения. Обратите внимание на значок уровня сигнала рядом с каждой сетью - он показывает качество соединения.",
    },
    {
      image: "src/4.jpg",
      title: "Безопасность в браузере",
      description:
        "Скриншот показывает, как проверить безопасность сайта в браузере. Обратите внимание на значок замка рядом с адресной строкой - он указывает на безопасное соединение. Также важно проверять разрешения, которые запрашивает сайт.",
    },
    {
      image: "src/5.jpg",
      title: "Работа с электронной почтой",
      description:
        "Интерфейс почтового клиента. Основные элементы: список писем, область просмотра выбранного письма и панель инструментов для создания новых писем. Обратите внимание на кнопки ответа, пересылки и удаления писем.",
    },
    {
      image: "src/6.jpg",
      title: "Работа с электоннй потой",
      description:
        "Интерфейс почтового клиента. Основные элементы: список писем, область просмотра выбранного письма и панель инструментов для создания новых писем. Обратите внимание на кнопки ответа, пересылки и удаления писем.",
    },
    {
      image: "src/7.jpg",
      title: "Рабта с эетоо пчтй",
      description:
        "Интерфейс почтового клиента. Основные элементы: список писем, область просмотра выбранного письма и панель инструментов для создания новых писем. Обратите внимание на кнопки ответа, пересылки и удаления писем.",
    },
  ],
  advanced: [
    {
      image: "src/8.jpg",
      title: "Когда же собака сутулая скинет мне то, что надо?",
      description:
        "Продвинутые настройки командной строки для автоматизации задач. Скриншот показывает использование переменных окружения и создание пакетных файлов. Обратите внимание на синтаксис команд и структуру каталогов.",
    },
  ],
};

// Состояние приложения
let currentStep = 0;
let currentDifficulty = "basic";
let isVoiceEnabled = false;
let speech = null;
let cursorHintTimeout = null;

// Элементы DOM
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

// Инициализация голосового синтеза
function initializeSpeech() {
  if ("speechSynthesis" in window) {
    speech = new SpeechSynthesisUtterance();
    speech.lang = "ru-RU";
    speech.rate = 0.9;
    speech.pitch = 1;

    // Устанавливаем голос для русского языка
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

// Загрузка данных скриншота
function loadScreenshot(step) {
  const screenshots = screenshotsData[currentDifficulty];

  if (step >= 0 && step < screenshots.length) {
    const screenshot = screenshots[step];

    screenshotImg.src = screenshot.image;
    screenshotTitle.textContent = screenshot.title;
    screenshotText.textContent = screenshot.description;

    // Обновление состояния кнопок
    prevBtn.disabled = step === 0;
    nextBtn.disabled = step === screenshots.length - 1;

    // Обновление прогресса
    const progress = ((step + 1) / screenshots.length) * 100;
    progressFill.style.width = `${progress}%`;

    currentStepElement.textContent = `Шаг ${step + 1} из ${screenshots.length}`;
    difficultyIndicator.textContent = `Уровень: ${currentDifficulty === "basic" ? "Базовый" : "Расширенный"}`;

    // Остановить голос, если активен
    if (isVoiceEnabled) {
      speechSynthesis.cancel();
      setTimeout(() => speakCurrentDescription(), 300);
    }

    // Показать анимированный курсор через 1 секунду
    clearTimeout(cursorHintTimeout);
    cursorHintTimeout = setTimeout(showCursorHint, 1000);

    // Подсветить активные зоны
    highlightActiveAreas();
  }
}

// Показать анимированный курсор
function showCursorHint() {
  const container = document.querySelector(".screenshot-container");
  const rect = container.getBoundingClientRect();

  // Позиционируем курсор в интересной точке
  const x = rect.left + rect.width * 0.7;
  const y = rect.top + rect.height * 0.3;

  cursorHint.style.left = `${x}px`;
  cursorHint.style.top = `${y}px`;
  cursorHint.style.opacity = "1";

  // Перемещаем курсор через некоторое время
  setTimeout(() => {
    const newX = rect.left + rect.width * 0.3;
    const newY = rect.top + rect.height * 0.6;

    cursorHint.style.left = `${newX}px`;
    cursorHint.style.top = `${newY}px`;
  }, 1000);

  // Скрыть курсор через 3 секунды
  setTimeout(() => {
    cursorHint.style.opacity = "0";
  }, 3000);
}

// Подсветка активных зон
function highlightActiveAreas() {
  // Убираем предыдущие подсветки
  const previousHighlights = document.querySelectorAll(".highlight");
  previousHighlights.forEach((el) => el.classList.remove("highlight"));

  // Добавляем подсветку к кнопкам навигации
  setTimeout(() => {
    if (currentStep < screenshotsData[currentDifficulty].length - 1) {
      nextBtn.classList.add("highlight");
    }

    if (currentStep > 0) {
      prevBtn.classList.add("highlight");
    }

    // Убираем подсветку через 2 секунды
    setTimeout(() => {
      nextBtn.classList.remove("highlight");
      prevBtn.classList.remove("highlight");
    }, 2000);
  }, 500);
}

// Озвучивание текущего описания
function speakCurrentDescription() {
  if (!isVoiceEnabled || !speech) return;

  const screenshots = screenshotsData[currentDifficulty];
  const screenshot = screenshots[currentStep];

  speech.text = `${screenshot.title}. ${screenshot.description}`;
  speechSynthesis.speak(speech);
}

// Переключение голосового сопровождения
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

// Смена уровня сложности
function changeDifficulty(difficulty) {
  currentDifficulty = difficulty;
  currentStep = 0;

  // Обновление кнопок
  basicBtn.classList.toggle("active", difficulty === "basic");
  advancedBtn.classList.toggle("active", difficulty === "advanced");

  // Загрузка первого скриншота нового уровня
  loadScreenshot(currentStep);
}

// Инициализация приложения
function init() {
  // Загрузка первого скриншота
  loadScreenshot(currentStep);

  // Инициализация голосового синтеза
  initializeSpeech();

  // Обработчики событий
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

  // Инициализация голосов при загрузке страницы
  window.speechSynthesis.onvoiceschanged = initializeSpeech;

  // Подсветка кнопки помощи при первом посещении
  setTimeout(() => {
    helpBtn.classList.add("highlight");
    setTimeout(() => helpBtn.classList.remove("highlight"), 3000);
  }, 2000);
}

// Запуск приложения после загрузки страницы
document.addEventListener("DOMContentLoaded", init);

let progressStore = JSON.parse(localStorage.getItem("progress")) || {};

// восстановление прогресса
function restoreProgress() {
  if (progressStore[currentDifficulty] !== undefined) {
    currentStep = progressStore[currentDifficulty];
    loadScreenshot(currentStep);
  }
}

// сохранение
function saveProgress() {
  progressStore[currentDifficulty] = currentStep;
  localStorage.setItem("progress", JSON.stringify(progressStore));
}

// перехват загрузки шага
const oldLoadScreenshot = loadScreenshot;
loadScreenshot = function (step) {
  oldLoadScreenshot(step);
  saveProgress();

  // ВСЕГДА прячем практику и тест при смене шага
  const taskBox = document.getElementById("task-box");
  const testBox = document.getElementById("test-box");
  if (taskBox) taskBox.classList.add("hidden");
  if (testBox) testBox.classList.add("hidden");

  // практика после 3 шага
  if (currentDifficulty === "basic" && step === 2) {
    showTask("Что нужно нажать, чтобы выбрать услугу?");
  }

  // тест в конце
  if (step === screenshotsData[currentDifficulty].length - 1) {
    showTest();
  }
};

// ===== практика =====
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

// ===== тест =====
function showTest() {
  const box = document.getElementById("test-box");
  if (!box) return;
  box.classList.remove("hidden");
}

function finishTest() {
  alert("🏆 Достижение: курс пройден!");
  document.getElementById("test-box").classList.add("hidden");
}

// восстановление при старте
const oldInit = init;
init = function () {
  oldInit();
  restoreProgress();
};
