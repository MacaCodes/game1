#!/usr/bin/env node

import chalk from "chalk";
import inquirer from "inquirer";
import gradient from "gradient-string";
import chalkAnimation from 'chalk-animation';
import figlet from "figlet";
import { createSpinner } from "nanospinner";

console.log(chalk.bgGreen('hi mom'));

let playerName; 

const sleep = (ms = 2000) => new Promise((r) => setTimeout(r, ms)); 

async function welcome() {
    const rainbowTitle = chalkAnimation.rainbow(
        `CHIHUHAHA RESCUE ... HELP HELP!!! \n 
        OH WAIT, ARE YOU THERE?? IS THAT YOU??!! \n
        OH wow, thank you for coming...\n 
        PLEASE HELP RESCUE ME FROM THIS COMMAND LINE CAVE!`
    );
    await sleep(); 
    rainbowTitle.stop();
    
    console.log(`
    ${chalk.bgBlue('HOW TO PLAY')}
    I am a cute little chihuahua and you are my human. 
    If you get any question wrong I will be ${chalk.bgRed('Killed')}
    So get all the questions right...
`);
}

async function askName() { 
    const answers = await inquirer.prompt({
        name: 'player_name', 
        type: 'input', 
        message: 'What is your name?', 
        default() { 
            return 'Player';
        }
    });
    playerName = answers.player_name;
    }

async function question1() { 
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
    return handleAnswer(answers.question_1 == 'Tinkerbell');
}

async function question2() { 
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
    return handleAnswer(answers.question_2 == 'Taco Bell');
}

async function question3() { 
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
    return handleAnswer(answers.question_3 == 'Midget');
}

async function question4() { 
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
    return handleAnswer(answers.question_4 == 'The Aztecs');
}


async function handleAnswer(isCorrect) { 
    const spinner = createSpinner('Checking answer....').start();
    await sleep(); 
    
    if (isCorrect) { 
        spinner.success({ text: `Woof Woof ${playerName}!!. Phew, I live to bark another day...!`})
     }  else { 
        spinner.error({ text: `💀💀💀 Chihuaha dead. Game Over. You lose ${playerName}!`});
        process.exit(1);
        }
    }

function winner() { 
    console.clear(); 
    const msg = `${playerName}, you are my hero!!! \n 
    I'm freeeee . . .
    Oh and as a thank you, here is ...
    £ 1 , 0 0 0 , 0 0 0`; 
    figlet(msg, (err, data) => {
        console.log(gradient.pastel.multiline(data));
    });
}

    await welcome();
    await askName();
    await question1();
    await question2();
    await question3();
    await question4();
    await winner(); 
