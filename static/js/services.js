
// Services for palindrome API's
// Service To Check Given Word is palindrome or not. 
async function checkPalindrome(palindromeString) {
    try {
        const response = await fetch('/palindrome/moves/checker', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getAccessToken()}`
            },
            body: JSON.stringify({
                palindromeString: palindromeString,
            }),
        });
        if (response.ok) {
            const data = await response.json();
            return data.isPalindrome;
        } else {
            throw new Error('Moves failed');
        }
    }
    catch (error) {
        console.error('An error occurred', error);
        throw error;
    }
}


// service for get plaindrome string for computer.
async function getPalindromeString() {
    try {
        const response = await fetch('/palindrome/computer/moves', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getAccessToken()}`
            },
        });

        if (response.ok) {
            const data = await response.json();
            return data.palindromeWord;
        } else {
            throw new Error('computer moves failed');
        }
    } catch (error) {
        console.error('An error occurred', error);
        throw error;
    }
}


// Services for Auth API's : Player Details
async function fetchUserDetail(player) {
    try {
        const response = await fetch(`/accounts/api/users/${player.user_id}/info`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getAccessToken()}`
            }
        });
        if (response.ok) {
            return await response.json();
        } else {
            throw new Error('Faild to fetch user details');
        }
    }
    catch (error) {
        console.error('An error occurred', error);
        throw error;
    }
}

// get random even number for computer AI move failed
const getRandomEvenNumber = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    let randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    return randomNumber % 2 === 0 ? randomNumber : getRandomEvenNumber(min, max);
};


// Decode User Token
const getUser = () => {
    const playerInfo = window.sessionStorage.getItem('access_token');
    if (playerInfo) {
        const [, payload,] = playerInfo.split('.');
        const decoded = window.atob(payload);
        return JSON.parse(decoded);
    }
    return undefined;
};


// Retrieve Player access token
const getAccessToken = () => {
    return window.sessionStorage.getItem('access_token');
};


// Retrieve Player refresh token
const getRefreshToken = () => {
    return window.sessionStorage.getItem('refresh_token');
};

const playerLogout = () => {
    // remove tokens in session storage
    sessionStorage.removeItem('access_token');
    sessionStorage.removeItem('refresh_token');
    sessionStorage.removeItem('isLoggedIn');
    window.location.href = '/app/sign_in';
};


const setAccessToken = async (data) => {
    sessionStorage.setItem('access_token' , data.access);
    sessionStorage.setItem('refresh_token' , data.refresh);
    console.log("data replaced for user prefrence");
}


const redirectToLoginPage = () => {
    window.location.href = '/app/sign_in';
};


const handleTokenRefresh = async () => {
    try {
        // Get the refresh token from the storage (e.g., localStorage or cookies)
        const refreshToken = getRefreshToken();

        // Make a request to your server to refresh the access token using the refresh token
        const response = await fetch('/accounts/api/token/refresh', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ refresh: refreshToken }),
        });

        if (response.ok) {
            // If the response is successful, parse the new access token from the response
            const data = await response.json();
        
            // Update the access token in the storage (e.g., localStorage or cookies)
            setAccessToken(data);

            // Continue with the original request using the new access token
            return data.access;
        } else if (response.status === 401) {
            // If the refresh token is invalid (401 Unauthorized), force the user to re-login
            redirectToLoginPage();
        } else {
            // Handle other error cases
            console.error('Token refresh failed:', response.statusText);
            throw new Error('Token refresh failed');
        }
    } catch (error) {
        console.error('An error occurred during token refresh:', error);
        throw error;
    }
};  