import inquirer from 'inquirer';
import figlet from 'figlet';
import { Spinner } from 'cli-spinner';

class Room {
    constructor(name, description) {
        this.name = name;
        this.description = description;
    }

    enterRoom() {
        console.log(figlet.textSync(`Welcome to ${this.name}!`));
        console.log(`\n${this.description}`);
    }

    async presentQuestion() {
        throw new Error('This method should be implemented in subclasses');
    }
}

class ChihuahuaTriviaRoom extends Room {
    constructor() {
        super('Chihuahua Trivia Room', 'Answer the following question:');
        this.question = 'What is the average lifespan of a chihuahua?';
        this.choices = ['8-10 years', '12-15 years', '20+ years', '3-5 years'];
        this.correctAnswer = '12-15 years';
    }

    async presentQuestion() {
        const answer = await inquirer.prompt({
            name: 'answer',
            type: 'list',
            message: this.question,
            choices: this.choices
        });

        if (answer.answer === this.correctAnswer) {
            console.log('\nCorrect! Chihuahuas typically live for 12-15 years.');
        } else {
            console.log('\nIncorrect! The correct answer is 12-15 years.');
        }
    }
}

class CodingChallengeRoom extends Room {
    constructor() {
        super('Coding Challenge Room', 'Solve the following coding challenge:');
        this.question = 'Which programming language is known for its simplicity and readability?';
        this.choices = ['Python', 'Java', 'C++', 'JavaScript'];
        this.correctAnswer = 'Python';
    }

    async presentQuestion() {
        const answer = await inquirer.prompt({
            name: 'answer',
            type: 'list',
            message: this.question,
            choices: this.choices
        });

        if (answer.answer === this.correctAnswer) {
            console.log('\nCorrect! Python is known for its simplicity and readability.');
        } else {
            console.log('\nIncorrect! The correct answer is Python.');
        }
    }
}

class FinalChallengeRoom extends Room {
    constructor() {
        super('Final Challenge Room', 'Answer the ultimate question:');
        this.question = 'What is the ultimate answer to life, the universe, and everything?';
        this.choices = ['42', '21', '100', '7'];
        this.correctAnswer = '42';
    }

    async presentQuestion() {
        const answer = await inquirer.prompt({
            name: 'answer',
            type: 'list',
            message: this.question,
            choices: this.choices
        });

        if (answer.answer === this.correctAnswer) {
            console.log('\nCorrect! The ultimate answer is 42.');
        } else {
            console.log('\nIncorrect! The correct answer is 42.');
        }
    }
}

async function askUserName() {
    const { name } = await inquirer.prompt({
        name: 'name',
        type: 'input',
        message: 'What is your name?'
    });
    return name;
}

async function mainMenu() {
    const { choice } = await inquirer.prompt({
        name: 'choice',
        type: 'list',
        message: 'Main Menu - Choose a Room:',
        choices: ['Chihuahua Trivia Room', 'Coding Challenge Room', 'Final Challenge Room']
    });
    return choice;
}

async function runGame() {
    try {
        console.log(figlet.textSync('Hello and Welcome!'));
        const userName = await askUserName();
        console.log(`\nWelcome, ${userName}!`);
        
        while (true) {
            const roomName = await mainMenu();
            let room;
            switch (roomName) {
                case 'Chihuahua Trivia Room':
                    room = new ChihuahuaTriviaRoom();
                    break;
                case 'Coding Challenge Room':
                    room = new CodingChallengeRoom();
                    break;
                case 'Final Challenge Room':
                    room = new FinalChallengeRoom();
                    break;
                default:
                    console.log('Invalid choice!');
                    continue;
            }
            
            room.enterRoom();
            await room.presentQuestion();
            
            const { returnToMain } = await inquirer.prompt({
                name: 'returnToMain',
                type: 'confirm',
                message: 'Return to Main Menu?'
            });
            
            if (!returnToMain) {
                break;
            }
        }
        
        console.log('\nThanks for playing!');
    } catch (error) {
        console.error('An error occurred:', error);
    }
}

runGame();
