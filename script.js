// Object to store mappings between short codes and long URLs
const urlMappings = {};

// Function to generate a random short code
function generateShortCode() {
    // Define characters from which short codes will be composed
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let shortCode = '';
    // Generate a short code of length 8 by randomly selecting characters from the defined set
    for (let i = 0; i < 8; i++) {
        shortCode += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return shortCode;
}

// Function to shorten a long URL
function shortenURL() {
    // Get the input element for the long URL
    const longURLInput = document.getElementById('longURLInput');
    // Get the trimmed value of the long URL input
    const longURL = longURLInput.value.trim();

    // Check if the entered long URL is valid
    if (isValidURL(longURL)) {
        // Generate a unique short code
        let shortCode;
        // Loop until a unique short code is generated
        do {
            shortCode = generateShortCode();
        } while (urlMappings.hasOwnProperty(shortCode));

        // Construct the shortened URL using the generated short code
        const shortenedURL = `http://short.url/${shortCode}`;

        // Store the mapping between short code and long URL
        urlMappings[shortCode] = longURL;

        // Display the shortened URL to the user
        document.getElementById('shortenedURL').innerHTML = `<a href="${shortenedURL}" target="_blank">${shortenedURL}</a>`;
    } else {
        // Display an alert if the entered URL is invalid
        alert("Please enter a valid URL.");
    }
}

// Function to validate a URL
function isValidURL(url) {
    // Regular expression to validate the format of a URL
    const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;
    // Check if the entered URL matches the regular expression
    return urlRegex.test(url);
}

// Function to decode a shortened URL and redirect to the original long URL
function decodeAndRedirect() {
    // Get the input element for the shortened URL
    const shortenedURLInput = document.getElementById('shortenedURLInput');
    // Get the trimmed value of the shortened URL input
    const shortenedURL = shortenedURLInput.value.trim();

    // Extract the short code from the shortened URL
    const shortCode = shortenedURL.substring(shortenedURL.lastIndexOf('/') + 1);

    // Check if the extracted short code exists in the mappings
    if (urlMappings.hasOwnProperty(shortCode)) {
        // Redirect the user to the original long URL corresponding to the short code
        window.location.href = urlMappings[shortCode];
    } else {
        // Display an alert if the short code is not found in the mappings
        alert("Shortened URL not found.");
    }
}
