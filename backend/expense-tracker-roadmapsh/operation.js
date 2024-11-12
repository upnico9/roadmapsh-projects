import Crud from "./crud.js";
import { v4 as uuidv4 } from 'uuid';

const crud = new Crud();

export function addExpense(amount, description, category) {
    
    const id = uuidv4();
    const expenseObject = {
        id,
        amount: Number(amount),
        description,
        category,
        creation_date: new Date(),
        update_date: new Date()
    }
    crud.create(expenseObject);
}

export function updateExpense(id, amount, description, category) {
    
    const expense = crud.get(id);
    if (!expense) {
        console.log('Expense not found');
        return;
    }
    const expenseObject = {
        id,
        amount: Number(amount) || expense.amount,
        description: description || expense.description,
        category: category || expense.category,
        creation_date: expense.creation_date,
        update_date: new Date()
    }
    crud.update(id, expenseObject);
}

export function deleteExpense(id) {
    
    const expense = crud.get(id);
    if (!expense) {
        console.log('Expense not found');
        return;
    }
    crud.delete(id);
    console.log(`Expense ${expense.description} with id : ${expense.id} deleted`);
}

export function listExpenses(category, date) {
    
    const expenses = crud.read();
    if (category) {
        const filteredExpenses = expenses.filter((el) => el.category === category);
        console.log(inlineExpenses(filteredExpenses));
    } else if (date) {
        const filteredExpenses = expenses.filter((el) => el.creation_date.toDateString() === date);
        console.log(inlineExpenses(filteredExpenses));
    } else {
        console.log(inlineExpenses(expenses));
    }
}

export function getTotalExpenses(category, date) {
    
    const expenses = crud.read();
    let total = 0;
    if (category) {
        const filteredExpenses = expenses.filter((el) => el.category === category);
        total = filteredExpenses.reduce((acc, el) => acc + el.amount, 0);
    } else if (date) {
        const filteredExpenses = expenses.filter((el) => el.creation_date.toDateString() === date);
        total = filteredExpenses.reduce((acc, el) => acc + el.amount, 0);
    } else {
        total = expenses.reduce((acc, el) => acc + el.amount, 0);
    }
    console.log(`Total expenses : ${total}`);
}

export function getBudget(category) {
}

export function addBudget(amount, category) {
}

export function updateBudget(amount, category) {
}

export function deleteBudget(category) {
}

function inlineExpenses(expenses) {
    return expenses.map((el) => {
        el.date = new Date(el.creation_date).toISOString().split('T')[0];
        el.category = el.category || 'Uncategorized';
        return ` ID : ${el.id}, DATE : ${el.date}, AMOUNT : ${el.amount}, DESCRIPTION : ${el.description}, CATEGORY : ${el.category}`;
    }).join('\n');
}


