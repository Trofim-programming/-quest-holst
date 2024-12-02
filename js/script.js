document.addEventListener("DOMContentLoaded", () => {
  const tasks = [
    {
      question: "Украсьте ёлку! Сколько украшений на ёлке, если на каждой ветке 5 шаров, а веток 8?",
      answer: "40"
    },
    {
      question: "Санта потерял свои сани! Найдите их. Какая форма следа у саней?",
      answer: "лыжи"
    },
    {
      question: "Сколько дней в декабре нужно ждать до Нового года?",
      answer: "31"
    }
  ];

  const tasksContainer = document.getElementById("tasks");
  const successMessage = document.getElementById("success");
  const restartButton = document.getElementById("restart");
  const loadingScreen = document.getElementById("loading");
  const winSound = document.getElementById("win-sound");

  // Снежинки
  function createSnowflakes() {
    for (let i = 0; i < 50; i++) {
      const snowflake = document.createElement("div");
      snowflake.className = "snowflake";
      snowflake.style.left = Math.random() * 100 + "vw";
      snowflake.style.fontSize = Math.random() * 10 + 10 + "px";
      snowflake.style.animationDuration = Math.random() * 3 + 7 + "s";
      snowflake.textContent = "❄";
      document.body.appendChild(snowflake);

      // Удаляем снежинки после анимации
      snowflake.addEventListener("animationend", () => snowflake.remove());
    }
  }

  setInterval(createSnowflakes, 500);

  // Загрузка экрана
  setTimeout(() => {
    loadingScreen.style.display = "none";
  }, 2000);

  // Генерация задач
  function generateTasks() {
    tasksContainer.innerHTML = ""; // Очищаем контейнер
    tasks.forEach((task, index) => {
      const taskDiv = document.createElement("div");
      taskDiv.className = "task";

      const question = document.createElement("p");
      question.textContent = `${index + 1}. ${task.question}`;

      const input = document.createElement("input");
      input.type = "text";
      input.placeholder = "Ваш ответ...";

      const button = document.createElement("button");
      button.textContent = "Проверить";

      button.addEventListener("click", () => {
        if (input.value.trim().toLowerCase() === task.answer.toLowerCase()) {
          taskDiv.style.background = "rgba(46, 204, 113, 0.3)";
          input.disabled = true;
          button.disabled = true;
          checkCompletion();
        } else {
          alert("Неправильный ответ, попробуйте снова!");
        }
      });

      taskDiv.appendChild(question);
      taskDiv.appendChild(input);
      taskDiv.appendChild(button);
      tasksContainer.appendChild(taskDiv);
    });
  }

  // Проверка выполнения всех задач
  function checkCompletion() {
    const allCompleted = Array.from(document.querySelectorAll(".task"))
      .every(task => task.style.background === "rgba(46, 204, 113, 0.3)");

    if (allCompleted) {
      successMessage.style.display = "block";
      restartButton.style.display = "block";
      winSound.play(); // Играем победный звук
    }
  }

  // Перезапуск квеста
  restartButton.addEventListener("click", () => {
    successMessage.style.display = "none";
    restartButton.style.display = "none";
    generateTasks();
  });

  // Генерация задач при загрузке
  generateTasks();
});
