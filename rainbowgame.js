#!/usr/bin/env node

import chalk from "chalk";
import inquirer from "inquirer";
import gradient from "gradient-string";
import chalkAnimation from 'chalk-animation';
import figlet from "figlet";
import { createSpinner } from "nanospinner";

class Room {
    constructor() {
        this.playerName = '';
        this.sleep = (ms = 2000) => new Promise((r) => setTimeout(r, ms));
    }

    async welcome() {
        const rainbowTitle = chalkAnimation.rainbow(
            `CHIHUAHUA RESCUE ... HELP HELP!!! \n 
            OH WAIT, ARE YOU THERE?? IS THAT YOU??!! \n`
        );
        await this.sleep();
        rainbowTitle.stop();

        console.log(`
        ${chalk.bgBlue('HOW TO PLAY')}
        I am a cute little chihuahua and you are my human. 
        If you get any question wrong I will be ${chalk.bgRed('Killed')}
        So get all the questions right...
    `);
    }

    async askName() {
        const answers = await inquirer.prompt({
            name: 'player_name',
            type: 'input',
            message: 'What is your name?',
            default() {
                return 'Player';
            }
        });
        this.playerName = answers.player_name;
    }

    async enter() {
        console.log(`${this.playerName} ahh finally you came. Thank you, please don't let me die .. woof...`);
    }

    async winner() {
        console.clear();
        const msg = `${this.playerName}, you are my hero!!! \n
    
        I'm freeeee . . .`;
        figlet(msg, (err, data) => {
            console.log(gradient.pastel.multiline(data));
        });
    }

    async startGame() {
        await this.welcome();
        await this.askName();
        await this.enter();
        await this.winner();
    }
}

class QuestionRoom extends Room {
    constructor() {
        super();
    }

    async enter() {
        console.clear();
        await super.enter();
        await this.question1();
        await this.question2();
        await this.question3();
        await this.question4();
    }

    async question1() {
        const answers = await inquirer.prompt({ 
            name: 'question_1',
            type: 'list', 
            message: `Question 1: Do you know my famous brother? Paris Hiltons dog is named...`,
            choices: [
                'Gidget',
                'Milly',
                'Tinkerbell',
                'Mojo',
            ]
        }); 
        return this.handleAnswer(answers.question_1 == 'Tinkerbell');
    }

    async question2() { 
        const answers = await inquirer.prompt({ 
            name: 'question_2',
            type: 'list', 
            message: `Question 2: Which restaurant used the famous Chihuahua as their mascot?`,
            choices: [
                'Chiquito',
                'Taco Bell',
                'Barburrito',
                'Don Tacos',
            ]
        }); 
        return this.handleAnswer(answers.question_2 == 'Taco Bell');
    }

    async question3() { 
        const answers = await inquirer.prompt({ 
            name: 'question_3',
            type: 'list', 
            message: `Question 3: What was the name of the first Chihuahua to be officially registered by the American Kennel Club?`,
            choices: [
                'Fred',
                'Roller',
                'Jepper',
                'Midget',
            ]
        }); 
        return this.handleAnswer(answers.question_3 == 'Midget');
    }

    async question4() { 
        const answers = await inquirer.prompt({ 
            name: 'question_4',
            type: 'list', 
            message: `Question 4: Who adopted the Chihuahua as sacred icons of the upper class and used them in religious ceremonies?`,
            choices: [
                'The Aztecs',
                'The Mayans',
                'The Toltecs',
                'The Incas',
            ]
        }); 
        return this.handleAnswer(answers.question_4 == 'The Aztecs');
    }

    async handleAnswer(isCorrect) { 
        const spinner = createSpinner('Checking answer....').start();
        await this.sleep(); 
        
        if (isCorrect) { 
            spinner.success({ text: `Woof Woof ${this.playerName}!!. Phew, I live to bark another day...!`})
        }  else { 
            spinner.error({ text: `💀💀💀 Chihuaha dead. Game Over. You lose ${this.playerName}!`});
            process.exit(1);
        }
    }
}

const questionRoom = new QuestionRoom();
questionRoom.startGame();
