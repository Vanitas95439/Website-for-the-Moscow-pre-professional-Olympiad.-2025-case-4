// Модель данных скриншотов
const screenshotsData = {
  basic: [
    {
      image:
        "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      title: "Основы работы с файлами",
      description:
        "На этом скриншоте показано, как создавать папки и перемещать файлы. Обратите внимание на контекстное меню, которое появляется при нажатии правой кнопки мыши. Это меню позволяет выполнять основные операции с файлами: копирование, удаление, переименование.",
    },
    {
      image:
        "https://images.unsplash.com/photo-1545235617-9465d2a55698?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1480&q=80",
      title: "Работа с текстовым редактором",
      description:
        "Здесь показан интерфейс текстового редактора. Основные элементы: панель инструментов с кнопками форматирования, область ввода текста и линейка для установки отступов. Обратите внимание на кнопки сохранения и печати в верхнем левом углу.",
    },
    {
      image:
        "https://images.unsplash.com/photo-1611224923853-80b023f02d71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1469&q=80",
      title: "Настройки интернета",
      description:
        "Это окно настроек подключения к интернету. Важные элементы: переключатель Wi-Fi, список доступных сетей и кнопка подключения. Обратите внимание на значок уровня сигнала рядом с каждой сетью - он показывает качество соединения.",
    },
    {
      image:
        "https://images.unsplash.com/photo-1581276879432-15e50529f34b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      title: "Безопасность в браузере",
      description:
        "Скриншот показывает, как проверить безопасность сайта в браузере. Обратите внимание на значок замка рядом с адресной строкой - он указывает на безопасное соединение. Также важно проверять разрешения, которые запрашивает сайт.",
    },
    {
      image:
        "https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1468&q=80",
      title: "Работа с электронной почтой",
      description:
        "Интерфейс почтового клиента. Основные элементы: список писем, область просмотра выбранного письма и панель инструментов для создания новых писем. Обратите внимание на кнопки ответа, пересылки и удаления писем.",
    },
  ],
  advanced: [
    {
      image:
        "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfDH8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1474&q=80",
      title: "Настройки командной строки",
      description:
        "Продвинутые настройки командной строки для автоматизации задач. Скриншот показывает использование переменных окружения и создание пакетных файлов. Обратите внимание на синтаксис команд и структуру каталогов.",
    },
    {
      image:
        "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      title: "Редактирование системного реестра",
      description:
        "Работа с редактором реестра Windows. Важно быть осторожным при изменении записей реестра, так как это может повлиять на стабильность системы. На скриншоте показана структура разделов реестра и типы данных.",
    },
    {
      image:
        "https://images.unsplash.com/photo-1627398242454-45a1465c2479?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80",
      title: "Настройки сети TCP/IP",
      description:
        "Продвинутые настройки сетевых протоколов. Скриншот показывает конфигурацию статического IP-адреса, маски подсети и шлюза по умолчанию. Также показаны настройки DNS-серверов для доменного имени.",
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
