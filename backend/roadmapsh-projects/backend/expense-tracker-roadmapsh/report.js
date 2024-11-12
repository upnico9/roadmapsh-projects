import Crud from './crud.js';
import fs from 'fs';
import * as fastcsv from 'fast-csv';

export function generateCSVReport(output, category, date) {
    const crud = new Crud();
    const expenses = crud.read();
    const outputFileName = output || 'report.csv';

    let filteredExpenses = [];
    if (category) {
        filteredExpenses = expenses.filter((el) => el.category === category);
    } else if (date) {
        filteredExpenses = expenses.filter((el) => el.creation_date.toDateString() === date);
    } else {
        filteredExpenses = expenses;
    }

    const writeStream = fs.createWriteStream(outputFileName);
    // Manually write the headers
    writeStream.write('id,amount,description,category,creation_date,update_date\n');
    fastcsv.write(filteredExpenses, { headers: false })
        .on('finish', () => {
            console.log('Report generated');
        })
        .pipe(writeStream);
    
}