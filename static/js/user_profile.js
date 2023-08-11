(function () {
    'use strict';

    // Function to handle form submission for Profile update
    const handleProfileSubmit = async (event) => {
        event.preventDefault(); // Prevent default form submission
        event.stopPropagation();

        if (event.target.fname.value && event.target.lname.value != '') {
            // Call your async function here
            await updateUser(event);
            await userPrefrance();
        }
    };

    // Function to handle form submission for Password update
    const handlePasswordSubmit = async (event) => {
        event.preventDefault(); // Prevent default form submission
        event.stopPropagation();

        const fields = ['current_password', 'new_password', 'confirm_password'];

        let formIsValid = true;

        fields.forEach((fieldName) => {
            const inputField = event.target[fieldName];
            const value = inputField.value.trim();
        
            if (!value) {
              inputField.classList.add('is-invalid');
              formIsValid = false;
            } else {
              inputField.classList.remove('is-invalid');
              inputField.classList.add('is-valid');
            }
          });

        if (event.target.new_password.value !== event.target.confirm_password.value) {
            // event.target.new_password.classList.add('is-invalid');
            event.target.confirm_password.classList.add('is-invalid');
            // event.form.classList.add('was-validated');
            return;
        }
        // Main if form is valid
        if(formIsValid) {
            console.log(JSON.stringify({
                old_password: event.target.current_password.value,
                password: event.target.new_password.value,
                password2: event.target.confirm_password.value
            }));
            

            await updateUserPassword(event);
            // Clear the from
            const updateCREForm = document.querySelector('#formUpdateCre')
            updateCREForm.reset();
            userPrefrance();
        }
    }

    // Fetch all the forms that need validation
    var forms = document.querySelectorAll('.needs-validation');

    // Add form-specific event handling based on the form ID
    forms.forEach(function (form) {
        switch (form.id) {
            case 'formProfile':
                form.addEventListener('submit', handleProfileSubmit);
                break;
            case 'formUpdateCre':
                form.addEventListener('submit', handlePasswordSubmit);
                break;
            // Add more cases for other forms if needed
            default:
                break;
        }

        // Add validation listener after form-specific event listeners
        form.addEventListener('submit', function (event) {
            if (!form.checkValidity()) {
                event.preventDefault();
                event.stopPropagation();
                form.classList.add('was-validated');
            }
        });
    });

    // Your async function to be called
    // Services for Auth API's : Player Update Profile
    async function updateUser(event) {
        // Perform your asynchronous tasks here
        // For example, making an API call using fetch or other asynchronous operations
        let player = getUser();
        const alertService = new AlertService();
        try {
            const response = await fetch(`/accounts/api/users/${player.user_id}/update-partial`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${getAccessToken()}`
                },
                body: JSON.stringify({
                    first_name: event.target.fname.value,
                    last_name: event.target.lname.value
                }),
            });
            if (response.ok) {
                alertService.showAlert('success', 'Profile updated.');
                return await response.json();
            } else {
                console.log(response.json);
                alertService.showAlert('warnning', 'got some issue.');
                throw new Error('User updation failed');
            }
        }
        catch (error) {
            alertService.showAlert('danger', 'An error occurred');
            console.error('An error occurred', error);
            throw error;
        }
    }

    // Services for Auth API's : Player Password Update
    async function updateUserPassword(event) {

        let player = getUser();
        const alertService = new AlertService();
        try {
            const response = await fetch(`/accounts/api/users/${player.user_id}/update-password`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${getAccessToken()}`
                },
                body: JSON.stringify({
                    old_password: event.target.current_password.value,
                    password: event.target.new_password.value,
                    password2: event.target.confirm_password.value
                }),
            });
            if (response.ok) {
                alertService.showAlert('success', 'Password updated successfully');
                return await response.json();
            } else {
                const statusCode = response.status;
                if (statusCode === 401) {
                    // Unauthorized
                    alertService.showAlert('danger', 'Unauthorized');
                } else if (statusCode === 404) {
                    // Not Found
                    alertService.showAlert('warning', 'Resource not found');
                } else if (statusCode === 400) {
                    // Not Found
                    alertService.showAlert('warning', 'Old password is invalid');
                }
                else {
                    // Handle other status codes as needed
                    alertService.showAlert('danger', 'An error occurred');
                }
            }
        }
        catch (error) {
            alertService.showAlert('danger', 'An error occurred');
            console.error('An error occurred', error);
            throw error;
        }
    }
})();

// Fetch User Prefrances
async function userPrefrance() {
    let player = await fetchUserDetail(getUser());
    document.querySelector('#playerName').innerHTML = `${player.first_name}  ${player.last_name}`;
    document.querySelector('#playerEmail').innerHTML = player.email;

    // document.querySelector('#id').value = player.name;
    document.querySelector('input[name="fname"]').value = player.first_name;
    document.querySelector('input[name="lname"]').value = player.last_name;

}