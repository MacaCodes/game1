import inquirer from 'inquirer';

// Define rooms with jokes and trivia
const rooms = [
    {
        name: 'Pun Palace',
        description: 'Welcome to the Pun Palace! Solve pun challenges to discover new jokes.',
        joke: 'Why did the scarecrow win an award? Because he was outstanding in his field!',
        triviaQuestion: 'What do you call fake spaghetti?'
    },
    {
        name: 'Riddle Room',
        description: 'You\'ve entered the Riddle Room. Crack riddles to reveal hidden joke treasures.',
        joke: 'Why couldn’t the bicycle stand up by itself? Because it was two-tired!',
        triviaQuestion: 'I’m tall when I’m young, and I’m short when I’m old. What am I?'
    }
];

// Function to interact with the user using Inquirer
function interact(room) {
    console.log(room.description);
    inquirer.prompt({
        name: 'action',
        type: 'list',
        message: 'What would you like to do?',
        choices: ['Solve the challenge', 'Answer the trivia question', 'Move to another room']
    }).then((answer) => {
        if (answer.action === 'Solve the challenge') {
            solveChallenge(room);
        } else if (answer.action === 'Answer the trivia question') {
            answerTrivia(room);
        } else if (answer.action === 'Move to another room') {
            move();
        }
    });
}

// Function to solve the challenge and discover a joke
function solveChallenge(room) {
    console.log(`Challenge: ${room.joke}`);
    console.log('You solved the challenge and discovered a new joke!');
    interact(room);
}

// Function to answer the trivia question
function answerTrivia(room) {
    inquirer.prompt({
        name: 'answer',
        type: 'input',
        message: room.triviaQuestion
    }).then((answer) => {
        const correctAnswer = room === rooms[0] ? 'An impasta' : 'A candle';
        if (answer.answer.toLowerCase() === correctAnswer.toLowerCase()) {
            console.log('Correct answer! You earned a bonus joke!');
            console.log(`Bonus Joke: ${room.joke}`);
        } else {
            console.log('Incorrect answer. Try again or move to another room.');
        }
        interact(room);
    });
}

// Function to move to another room
function move() {
    inquirer.prompt({
        name: 'destination',
        type: 'list',
        message: 'Which room would you like to move to?',
        choices: rooms.map(room => room.name)
    }).then((answer) => {
        const nextRoom = rooms.find(room => room.name === answer.destination);
        interact(nextRoom);
    });
}

// Start the game
console.log('Welcome to Chihuahua Joke Quest!');
move();
