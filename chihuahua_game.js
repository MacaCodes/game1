import inquirer from 'inquirer';
import chalk from 'chalk';
import faker from 'faker';


// test 


// Function to display ASCII art of a chihuahua
const displayChihuahuaArt = () => {
    console.log(chalk.yellow(`
      / \\__
    (     @\\___
      /        O
    /    (_____/
  /_____/  U
`));
};

// Function to display a colored message
const displayMessage = (message, color) => {
    console.log(chalk[color](message));
};

// Function to generate a random coding challenge
const generateCodingChallenge = () => {
    const challenge = faker.lorem.words(3); // Generate a random phrase with 3 words
    return `Your coding challenge is to ${challenge}.`;
};

// Function to present a coding challenge to the player
const presentChallenge = () => {
    return new Promise((resolve, reject) => {
        console.log(chalk.cyan.bold('You encounter a coding challenge!'));

        // Generate a random coding challenge
        const challenge = generateCodingChallenge();

        // Display the challenge and prompt the player to solve it
        displayMessage(challenge, 'blue');
        inquirer.prompt({
            name: 'answer',
            type: 'input',
            message: 'Enter your solution:'
        }).then(({ answer }) => {
            // Check if the player's answer is correct
            if (answer.toLowerCase() === 'complete the challenge') {
                displayMessage('Congratulations! You solved the challenge and earned a key.', 'green');
                resolve(true); // Player successfully completed the challenge
            } else {
                displayMessage('Oops! Your solution is incorrect. Try again.', 'red');
                resolve(false); // Player failed to complete the challenge
            }
        }).catch(err => {
            reject(err);
        });
    });
};

// test 

// Function to simulate an interaction with an NPC
const interactWithNPC = () => {
    return new Promise((resolve, reject) => {
        console.log(chalk.cyan.bold('You encounter a friendly coding instructor.'));

        // Display dialogue with the NPC
        displayMessage('"Hello, little chihuahua! Can I help you with anything?"', 'yellow');
        displayMessage('"I heard you need to find a key to escape. You might find one in the classroom."', 'yellow');

        // Prompt the player to continue
        inquirer.prompt({
            name: 'continue',
            type: 'input',
            message: 'Press enter to continue...'
        }).then(() => {
            resolve();
        }).catch(err => {
            reject(err);
        });
    });
};

// Main function to run the game
const playGame = () => {
    console.log(chalk.cyan.bold('Welcome to the Chihuahua Coding Adventure!'));

    // Display ASCII art of a chihuahua
    displayChihuahuaArt();

    // Introduction
    displayMessage('You are a chihuahua attending a coding academy. Your goal is to escape from the academy by solving coding challenges and collecting keys.', 'cyan');
    displayMessage('Along the way, you will encounter friendly NPCs who may offer assistance.', 'cyan');

    // Game loop
    let hasKey = false;
    const gameLoop = () => {
        presentChallenge().then(challengeCompleted => {
            if (challengeCompleted) {
                hasKey = true;
                // Player has collected the key and escaped
                console.log(chalk.green.bold('Congratulations! You have successfully escaped from the coding academy!'));
            } else {
                interactWithNPC().then(() => {
                    if (!hasKey) {
                        gameLoop();
                    }
                }).catch(err => {
                    console.error('Error interacting with NPC:', err);
                });
            }
        }).catch(err => {
            console.error('Error presenting challenge:', err);
        });
    };

    gameLoop();
};

// Run the game
playGame();
