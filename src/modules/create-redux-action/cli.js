import arg from 'arg';
import inquirer from 'inquirer';
import { createReduxAction } from './script';

function parseArgumentsIntoOptions(rawArgs) {
  const args = arg(
    {
      '--input': String,
      '--output': String,
      '--action': String,
      '--name': String,
      '-i': '--input',
      '-o': '--ouput',
      '-a': '--action',
      '-n': '--name',
    },
    {
      argv: rawArgs.slice(2),
    }
  );
  return {
    input: args['--input'],
    output: args['--output'],
    action:args['--action'],
    name: args['--name']
  };
}

async function promptForMissingOptions(options) {
  const questions = [];
  if (!options.input) {
    questions.push({
      type: 'input',
      name: 'input',
      message: 'Input Type: '
    });
  }

  if (!options.output) {
    questions.push({
      type: 'input',
      name: 'output',
      message: 'Output Type: '
    });
  }

  if (!options.action) {
    questions.push({
      type: 'input',
      name: 'action',
      message: 'Action name (Ex: Create Promotion): '
    });
  }

  if (!options.name) {
    questions.push({
      type: 'input',
      name: 'name',
      message: 'Name of file: ',
    });
  }

  const answers = await inquirer.prompt(questions);
  return {
    ...options,
    ...answers
  };
}

export async function cli(args) {
  let options = parseArgumentsIntoOptions(args);
  options = await promptForMissingOptions(options);
  await createReduxAction(options);
}

