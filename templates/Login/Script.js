const validUsers = {
    user1: 'Password123!',
    user2: 'Pass@word456',
};

const form = document.getElementById('loginForm');
const errorMessage = document.getElementById('error-message');

form.addEventListener('submit', (event) => {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (validUsers[username] && validUsers[username] === password) {
        window.location.href = './tus_proyectos.html';
    } else {
        errorMessage.style.display = 'block';
        errorMessage.textContent = 'Usuario o contraseña incorrectos. Asegúrate de que sean válidos.';
    }
});
