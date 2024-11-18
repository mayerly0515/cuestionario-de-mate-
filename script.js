document.addEventListener("DOMContentLoaded", function () {
  const questionElement = document.querySelector('#question');
  const answerInput = document.querySelector('#answer');
  const resultElement = document.querySelector('#result');
  const buttonRespond = document.querySelector('#respond');
  const buttonNewQuestion = document.querySelector('#new-question');
  const usernameInput = document.querySelector('#username');
  const buttonRegister = document.querySelector('#register');
  const buttonDelete = document.querySelector('#delete');
  const userGreeting = document.querySelector('#user-greeting');

  let num1 = 0, num2 = 0, operation = '', correctAnswer = 0;

  // Función para generar una nueva pregunta
  function generateQuestion() {
    num1 = Math.floor(Math.random() * 10) + 1;
    num2 = Math.floor(Math.random() * 10) + 1;
    const operations = ['+', '-'];
    operation = operations[Math.floor(Math.random() * operations.length)];

    if (operation === '+') {
      correctAnswer = num1 + num2;
    } else if (operation === '-') {
      correctAnswer = num1 - num2;
    }

    questionElement.textContent = `¿Cuánto es ${num1} ${operation} ${num2}?`;
  }

  // Función para verificar la respuesta
  function checkAnswer() {
    const userAnswer = parseInt(answerInput.value, 10);
    if (isNaN(userAnswer)) {
      resultElement.textContent = 'Por favor, ingresa un número.';
      resultElement.style.color = 'red';
    } else if (userAnswer === correctAnswer) {
      resultElement.textContent = '¡Correcto!';
      resultElement.style.color = 'green';
    } else {
      resultElement.textContent = `Incorrecto. La respuesta correcta era ${correctAnswer}.`;
      resultElement.style.color = 'red';
    }

    generateQuestion();
    answerInput.value = '';
    answerInput.focus();
  }

  // Función para registrar un nombre de usuario
  function registerUser() {
    const username = usernameInput.value.trim();
    if (username !== '') {
      localStorage.setItem('username', username);
      displayUserGreeting();
      usernameInput.value = ''; // Limpiar el campo
    } else {
      alert("Por favor, ingresa un nombre.");
    }
  }

  // Función para eliminar el nombre registrado
  function deleteUser() {
    localStorage.removeItem('username');
    displayUserGreeting();
  }

  // Función para mostrar el saludo al usuario
  function displayUserGreeting() {
    const username = localStorage.getItem('username');
    if (username) {
      userGreeting.textContent = `Hola, ${username}!`;
    } else {
      userGreeting.textContent = 'No has registrado un nombre.';
    }
  }

  // Al cargar la página, mostrar el saludo si hay un nombre registrado
  displayUserGreeting();

  // Event listeners
  buttonRespond.addEventListener('click', checkAnswer);
  buttonNewQuestion.addEventListener('click', generateQuestion);
  buttonRegister.addEventListener('click', registerUser);
  buttonDelete.addEventListener('click', deleteUser);

  // Generar la primera pregunta
  generateQuestion();
});
