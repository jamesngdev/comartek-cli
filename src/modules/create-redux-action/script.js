import chalk from 'chalk';
import fs from 'fs';
import Listr from 'listr';
import ncp from 'ncp';
import path from 'path';
import { promisify } from 'util';
import { toCamelCase, toPascalCase, toSnakeCase } from './../../helpers/string'

const access = promisify(fs.access);
const copy = promisify(ncp);

const REDUX_FOLDERS = {
    ACTIONS: 'actions',
    ACTION_TYPES: 'action-types',
    SAGAS: 'sagas',
    REDUCERS: 'reducers'
}


function getTemplateAndTargetPath(options) {
    const FILE_EXT = '.ts';

    const reduxDir = path.join(options.targetDirectory, 'redux');
    const actionTypesDir = path.join(reduxDir, REDUX_FOLDERS.ACTION_TYPES);
    const actionsDir = path.join(reduxDir, REDUX_FOLDERS.ACTIONS);
    const sagasDir = path.join(reduxDir, REDUX_FOLDERS.SAGAS);
    const reducerDir = path.join(reduxDir, REDUX_FOLDERS.REDUCERS);

    const templateActionTypesFile = path.join(options.templateDirectory, REDUX_FOLDERS.ACTION_TYPES + FILE_EXT);
    const templateActionsFile = path.join(options.templateDirectory, REDUX_FOLDERS.ACTIONS + FILE_EXT);
    const templateSagasFile = path.join(options.templateDirectory, REDUX_FOLDERS.SAGAS + FILE_EXT);
    const templateReducersFile = path.join(options.templateDirectory, REDUX_FOLDERS.REDUCERS + FILE_EXT);

    const targetActionTypesPath = path.join(actionTypesDir, options.name + FILE_EXT);
    const targetActionFile = path.join(actionsDir, options.name + FILE_EXT);
    const targetSagaFile = path.join(sagasDir, options.name + FILE_EXT);
    const targetReducerFile = path.join(reducerDir, options.name + FILE_EXT);

    return {
        folder: {
            [REDUX_FOLDERS.ACTIONS]: actionsDir,
            [REDUX_FOLDERS.ACTION_TYPES]: actionTypesDir,
            [REDUX_FOLDERS.SAGAS]: sagasDir,
            [REDUX_FOLDERS.REDUCERS]: reducerDir,
        },
        from: {
            [REDUX_FOLDERS.ACTIONS]: templateActionsFile,
            [REDUX_FOLDERS.ACTION_TYPES]: templateActionTypesFile,
            [REDUX_FOLDERS.SAGAS]: templateSagasFile,
            [REDUX_FOLDERS.REDUCERS]: templateReducersFile,
        },
        to: {
            [REDUX_FOLDERS.ACTIONS]: targetActionFile,
            [REDUX_FOLDERS.ACTION_TYPES]: targetActionTypesPath,
            [REDUX_FOLDERS.SAGAS]: targetSagaFile,
            [REDUX_FOLDERS.REDUCERS]: targetReducerFile,
        }
    }
}

async function replaceTemplateContent(options) {
    const { to } = getTemplateAndTargetPath(options);
    const { action, input, output } = options;
    for (const name of Object.keys(REDUX_FOLDERS)) {
        console.log(fileContent);
        fs.writeFileSync(output[REDUX_FOLDERS[name]], fileContent);
    }
}

async function validateReduxFolder(options) {
    const { folder } = getTemplateAndTargetPath(options)
    try {
        await access(folder[REDUX_FOLDERS.ACTIONS], fs.constants.R_OK)
        await access(folder[REDUX_FOLDERS.ACTION_TYPES], fs.constants.R_OK)
        await access(folder[REDUX_FOLDERS.REDUCERS], fs.constants.R_OK)
        await access(folder[REDUX_FOLDERS.SAGAS], fs.constants.R_OK)
    } catch (err) {
        console.error('%s Invalid redux folder', chalk.red.bold('ERROR'));
        process.exit(1);
    }
}

async function copyTemplateFiles(options) {
    const { action, input, output } = options;
    const { from, to } = getTemplateAndTargetPath(options)

    for (const part of Object.keys(REDUX_FOLDERS)) {
        const camelCase = toCamelCase(action);
        const UPPER_SNAKE = toSnakeCase(action).toUpperCase();
        const PascalCase = toPascalCase(action);
        const templateFilePath = from[REDUX_FOLDERS[part]];
        const targetFilePath = to[REDUX_FOLDERS[part]];

        let fileContent = fs.readFileSync(templateFilePath, 'utf8').replace(/%UPPER_SNAKE%/gm, UPPER_SNAKE).replace(/%NAME_CAMELCASE%/gm, camelCase).replace(/%NAME_PASCALCASE%/gm, PascalCase).replace(/%input%/gm, input).replace(/%output%/gm, output);
        fs.writeFileSync(targetFilePath, fileContent, {
            encoding: 'utf8',
            flag: 'w'
        });
    }
}


export async function createReduxAction(options) {
    const fullPathName = new URL(import.meta.url).pathname;
    const templateDir = path.resolve(
        fullPathName.substr(fullPathName.indexOf('/')), '../../../../templates/',
        'create-redux-action'
    );
    options.templateDirectory = templateDir;
    options.targetDirectory = process.cwd();

    try {
        await access(templateDir, fs.constants.R_OK);
    } catch (err) {
        console.error('%s Invalid template name', chalk.red.bold('ERROR'));
        process.exit(1);
    }

    const tasks = new Listr(
        [
            {
                title: 'Validate folder structor',
                task: () => copyTemplateFiles(options),
            },
            {
                title: 'Copy project files',
                task: () => copyTemplateFiles(options),
            }
        ],
        {
            exitOnError: false,
        }
    );

    await tasks.run();
    console.log('%s', chalk.green.bold('DONE'));
    return true;
}
