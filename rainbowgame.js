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
        "Welcome to 'Help me I'm a Chihuhaha'\n"
    );
    await sleep(); 
    rainbowTitle.stop();
    
    console.log(`
    ${chalk.bgBlue('HOW TO PLAY')}
    I am a cute little chihuahua named Tyson and you are my human. 
    If you get any question wrong I will be ${chalk.bgRed('Killed')}
    So get all the questions right...
`);
}
await welcome();

async function askName() { 
    const answers = await inquirer.prompt();
    
}