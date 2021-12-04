const chalk = require('chalk');
const yargs = require('yargs')
.command('add', 'Add new Task', {
    title: {
        description: 'Task Title',
        type: 'string',
        demandOption: true,
    },
    body: {
        description: 'Task Body',
        type: 'string',
        demandOption: true,
    },
})
.command('list', 'List All Task')
.command('report', 'List Task By Index', {
    index: {
        description: 'Task Index',
        type: 'string',
        demandOption: true,
    }
})
.command('remove', 'Remove Single Task By Index', {
    index: {
        description: 'Task Index',
        type: 'string',
        demandOption: true,
    }
})
.command('toggle', 'Toggle Single Task Completed Status By Index', {
    index: {
        description: 'Task Index',
        type: 'string',
        demandOption: true,
    }
})
.demandCommand(1)
.argv;

console.log(`\n=== ${chalk.cyanBright('Task App Lunched')} ===\n`);

const Task = require('./task');

// Get Command
const command = yargs._[0];

// To add task 
if (command === 'add') {
    Task.add(yargs.title, yargs.body);
    console.log(chalk.greenBright('Task Added'));
}

// to report task
if(command === 'report') {
    // show tasks
    console.log(Task.report(yargs.index));
}

// to list all tasks
if (command === 'list') {
    const db = Task.list();

    // Print All Data
    db.forEach((todo, index) => {
        let completeMessage = task.completed ? 'Completed' : 'Not Completed';

        let colorMethod = task.completed ? 'greenBright' : 'redBright';
        
        console.log(chalk[colorMethod](`[${index}]: ${task.title} (${completeMessage})`))
    });
}

// to remove task
if (command === 'remove') {    
    Task.remove(yargs.index)
    console.log(chalk.greenBright('Task Deleted'));
}

// to toggle status
if (command === 'toggle') {
    Task.toggle(yargs.index);
    console.log(chalk.greenBright('Task Completed Status Updated'));
}