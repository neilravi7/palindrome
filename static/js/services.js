
// Services for palindrome API's
// Service To Check Given Word is palindrome or not. 
async function checkPalindrome(palindromeString) {
    try {
        const response = await fetch('/palindrome/moves/checker', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
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
                'Authorization': `Bearer ${getUserToken()}`
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


// Retrieve Player token
const getUserToken = () => {
    return window.sessionStorage.getItem('access_token');
};


// Logut Player
const playerLogout = () =>{
    // Save tokens in session storage
    sessionStorage.removeItem('access_token');
    sessionStorage.removeItem('refresh_token');
    sessionStorage.removeItem('isLoggedIn');
    window.location.href = '/app/sign_in';
};