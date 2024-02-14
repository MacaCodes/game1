import figlet from 'figlet';
import { Spinner } from 'cli-spinner';

// Function to generate ASCII art text using Figlet
function generateAsciiArt(text) {
    return new Promise((resolve, reject) => {
        figlet(text, function(err, data) {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    });
}

// Function to display a spinner animation while processing
function showSpinner() {
    const spinner = new Spinner('Processing.. %s');
    spinner.setSpinnerString('|/-\\'); // Customize spinner string
    spinner.start();
    return spinner;
}

// Simulating a time-consuming process
function simulateProcess() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, 3000); // Simulating a 3-second process
    });
}

// Main function to run the example
async function runExample() {
    try {
        // Displaying ASCII art text
        const asciiArt = await generateAsciiArt('Welcome to My Game!');
        console.log(asciiArt);

        // Starting spinner animation
        const spinner = showSpinner();

        // Simulating a time-consuming process
        await simulateProcess();

        // Stopping spinner animation
        spinner.stop(true); // Passing true to clean the console
        console.log('\nProcess completed.');
    } catch (error) {
        console.error('An error occurred:', error);
    }
}

// Run the example  
runExample();

// test
// test1