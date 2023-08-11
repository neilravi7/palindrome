(function () {
    'use strict';

    // Fetch the form
    var form = document.querySelector('.needs-validation');

    form.addEventListener('submit', async function (event) {
        event.preventDefault();
        event.stopPropagation();

        if (!form.checkValidity()) {
            form.classList.add('was-validated');
            return;
        }

        // Custom email validation
        var emailInput = document.querySelector('input[name="email"]');
        if (!validateEmail(emailInput.value)) {
            emailInput.classList.remove('is-valid');
            emailInput.classList.add('is-invalid');
            form.classList.add('was-validated');
            return;
        }else{
            emailInput.classList.add('is-valid');
            emailInput.classList.remove('is-invalid');
        }

        // Custom password matching validation
        var passwordInput = document.querySelector('input[name="password"]');
        if (passwordInput.value === '') {
            passwordInput.classList.add('is-invalid');
            form.classList.add('was-validated');
            return;
        }

        try {
            // Call your async function here
            await userLogin(event);
        } catch (error) {
            console.error('An error occurred', error);
            // Handle the error or display error messages
        }
    }, false);

    // Email format validation function
    function validateEmail(email) {
        var re = /\S+@\S+\.\S+/;
        return re.test(email);
    }

    // Your async function to be called
    // Services for Auth API's :UserLogin
    async function userLogin() {
        // Perform your asynchronous tasks here
        // For example, making an API call using fetch or other asynchronous operations

        const alertService = new AlertService();

        let formData = new FormData(form);

        try {
            const response = await fetch('/accounts/api/log_in', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(Object.fromEntries(formData)),
            });

            if (response.ok) {
                console.log("SIGN IN RESPONSE IS OK");

                const data = await response.json();
                console.log(data);
                const accessToken = data.access;
                const refreshToken = data.refresh;

                // Save tokens in session storage
                sessionStorage.setItem('access_token', accessToken);
                sessionStorage.setItem('refresh_token', refreshToken);
                sessionStorage.setItem('isLoggedIn', true);

                console.log("Player session created");


                // Redirect user to profile
                window.location.href = 'user/profile';
            } else if (response.status === 401) {
                alertService.showAlert('danger', 'Invalid Credentials. Please try again.');
            } else {
                alertService.showAlert('danger', 'An error occurred');
                console.log(response.status);
                throw new Error('Something failed');
            }
        } catch (error) {
            alertService.showAlert('danger', 'An error occurred');
            console.error('An error occurred', error);
            throw error;
        }
    }
})();
