document.addEventListener('DOMContentLoaded', () => {
    const loginToggle = document.getElementById('login-toggle');
    const registerToggle = document.getElementById('register-toggle');
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');

    // Function to switch active form
    const showForm = (formToShow, buttonToActivate) => {
        // Deactivate all forms and buttons first
        loginForm.classList.remove('active');
        registerForm.classList.remove('active');
        loginToggle.classList.remove('active');
        registerToggle.classList.remove('active');

        // Activate the selected form and button
        formToShow.classList.add('active');
        buttonToActivate.classList.add('active');
    };

    // Event listeners for the toggle buttons
    if (loginToggle && registerToggle && loginForm && registerForm) {
        loginToggle.addEventListener('click', () => {
            showForm(loginForm, loginToggle);
        });

        registerToggle.addEventListener('click', () => {
            showForm(registerForm, registerToggle);
        });
    }

    // Basic client-side password matching for registration
    const registerPassword = document.getElementById('register-password');
    const confirmPassword = document.getElementById('confirm-password');

    if (registerPassword && confirmPassword) {
        const validatePasswords = () => {
            if (registerPassword.value !== confirmPassword.value) {
                confirmPassword.setCustomValidity('Las contraseñas no coinciden.');
            } else {
                confirmPassword.setCustomValidity(''); // Clear the error message
            }
        };

        registerPassword.addEventListener('input', validatePasswords);
        confirmPassword.addEventListener('input', validatePasswords);
    }

    // Example of form submission (you'll need backend for actual processing)
    loginForm.addEventListener('submit', (event) => {
        event.preventDefault(); // Prevent default form submission
        console.log('Login form submitted!');
        // In a real application, you'd send data to your backend here:
        // const formData = new FormData(loginForm);
        // fetch('/api/login', { method: 'POST', body: formData })
        // .then(response => response.json())
        // .then(data => { /* handle response */ })
        // .catch(error => console.error('Error:', error));
        alert('Inicio de sesión simulado. ¡Conéctate a tu backend para que funcione de verdad!');
    });

    registerForm.addEventListener('submit', (event) => {
        event.preventDefault(); // Prevent default form submission
        if (registerPassword.value !== confirmPassword.value) {
            alert('Error: Las contraseñas no coinciden. Por favor, revísalas.');
            return; // Stop submission if passwords don't match
        }
        console.log('Register form submitted!');
        // In a real application, you'd send data to your backend here:
        // const formData = new FormData(registerForm);
        // fetch('/api/register', { method: 'POST', body: formData })
        // .then(response => response.json())
        // .then(data => { /* handle response */ })
        // .catch(error => console.error('Error:', error));
        alert('Registro simulado. ¡Conéctate a tu backend para guardar el usuario!');
    });
});