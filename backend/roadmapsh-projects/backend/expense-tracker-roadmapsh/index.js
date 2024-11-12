#!/usr/bin/env node

import { Command } from 'commander';
import { addExpense, deleteExpense, listExpenses, updateExpense, getTotalExpenses } from './operation.js';
import { generateCSVReport } from './report.js';

const program = new Command();

program.name('expense-tracker').version('1.0.0');

program
  .command('greet <name>')
  .description('Greet a person by their name')
  .action((name) => {
    console.log(`Hello, ${name}!`);
  });

program.command('add').description('Add a new expense')
    .requiredOption('-d, --description <description>', 'Description of the expense')
    .requiredOption('-a, --amount <amount>', 'Amount of the expense')
    .option('-c, --category <category>', 'Category of the expense')
    .action((option) => {
        addExpense(option.amount, option.description, option.category);
        console.log('Adding a new expense');
});

program.command('update').description('Update an expense')
    .requiredOption('-i, --id <id>', 'ID of the expense')
    .option('-d, --description <description>', 'Description of the expense')
    .option('-a, --amount <amount>', 'Amount of the expense')
    .option('-c, --category <category>', 'Category of the expense')
    .action((option) => {
        updateExpense(option.id, option.amount, option.description, option.category);
    });

program.command('delete').description('Delete an expense')
    .requiredOption('-i, --id <id>', 'ID of the expense')
    .action((option) => {
        deleteExpense(option.id);
    });

program.command('list').description('List all expenses')
    .option('-c, --category <category>', 'Filter expenses by category')
    .option('-d, --date <date>', 'Filter expenses by date')
    .action((options) => {
        listExpenses(options.category, options.date);
    });

program.command('total').description('Show total expenses')
    .option('-c, --category <category>', 'Filter expenses by category')
    .option('-d, --date <date>', 'Filter expenses by date')
    .action(() => {
        getTotalExpenses();
});

program.command('report-csv').description('Generate a CSV report')
    .option('-o, --output <output>', 'Output file')
    .option('-c, --category <category>', 'Filter expenses by category')
    .option('-d, --date <date>', 'Filter expenses by date')
    .action((option) => {
        generateCSVReport(option.output, option.category, option.date);
});

program.command('get-budget').description('Get a budget')
    .option('-c, --category <category>', 'Category of the budget')
    .action(() => {
        console.log('Getting a budget');
});

program.command('add-budget').description('Add a new budget')
    .requiredOption('-a, --amount <amount>', 'Amount of the budget')
    .option('-c, --category <category>', 'Category of the budget')
    .action(() => {
        console.log('Adding a new budget');
});

program.command('update-budget').description('Update a budget')
    .option('-a, --amount <amount>', 'Amount of the budget')
    .option('-c, --category <category>', 'Category of the budget')
    .action(() => {
    console.log('Updating a budget');
});

program.command('delete-budget').description('Delete a budget')
    .option('-c, --category <category>', 'Category of the budget')
    .action(() => {
        console.log('Deleting a budget');
    });

program.parse(process.argv);
