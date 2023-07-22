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
        // var confirmPasswordInput = document.querySelector('input[name="password2"]');
        // if (passwordInput.value !== confirmPasswordInput.value) {
        //     confirmPasswordInput.classList.add('is-invalid');
        //     form.classList.add('was-validated');
        //     return;
        // }

        try {
            // Call your async function here
            await userLogin(event);
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
    // Services for Auth API's :UserLogin
    async function userLogin() {
        // Perform your asynchronous tasks here
        // For example, making an API call using fetch or other asynchronous operations
        let inputs = document.querySelectorAll('input');
        let data = {}
        inputs.forEach(input => {
            data[input.name] = input.value;
        });

        console.log("User Credientials", data);
        
        try {
            const response = await fetch('/accounts/api/log_in', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
            if (response.ok) {
                const data = await response.json();
                console.log(data);
                const accessToken = data.access;
                const refreshToken = data.refresh;

                // Save tokens in session storage
                sessionStorage.setItem('access_token', accessToken);
                sessionStorage.setItem('refresh_token', refreshToken);
                sessionStorage.setItem('isLoggedIn', true);


                // Redirect user to profile
                window.location.href = 'user/profile';

            } else {
                // errorFeedBack(); some error code goes here
                console.log(response.json());
                throw new Error('Something faild');
            }
        }
        catch (error) {
            console.error('An error occurred', error);
            throw error;
        }
    }
})();