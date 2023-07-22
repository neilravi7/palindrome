(function () {
    'use strict'

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
            emailInput.classList.add('is-invalid');
            form.classList.add('was-validated');
            return;
        }

        // Custom password matching validation
        var passwordInput = document.querySelector('input[name="password1"]');
        var confirmPasswordInput = document.querySelector('input[name="password2"]');
        if (passwordInput.value !== confirmPasswordInput.value) {
            confirmPasswordInput.classList.add('is-invalid');
            form.classList.add('was-validated');
            return;
        }

        try {
            // Call your async function here
            await signUpUser();

            // If everything is successful, submit the form
            form.submit();
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
    async function signUpUser(event) {
        // Perform your asynchronous tasks here
        // For example, making an API call using fetch or other asynchronous operations
        let inputs = document.querySelectorAll('input');

        let data = {}

        inputs.forEach(input => {
            data[input.name] = input.value;
        });

        fetch('/accounts/api/sign_up', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        }).then(response => {
            if (response.ok) {
                // Redirect to the login page
                window.location.href = '/app/sign_in';
            } else {
                // Display error message
                response.json().then(data => {
                    // Append the error message to a container element
                    console.log(data.detail);
                });
            }

        }).catch(error => {
            // Handle any network or other errors
            console.error("An error occurred", error);
        });
        event.preventDefault();
        return false;

    }
})();