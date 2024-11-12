import Expense from "../models/expense.js";
import User from "../models/users.js";
import getError from "../utils/error.js";

export async function createExpense(request, reply) {
    try {
        const userId = request.id;
        const user = await User.findById(userId);
        if (!user) {
            throw {code: 404, message: "User not found"};
        }

        const newExpense = new Expense({... request.body, user: userId});
        await newExpense.save();
        reply.code(201).send(newExpense);
    } catch (error) {
        const err = getError(error);
        reply.code(err.code).send(err.message);
    }
}

export async function updateExpense(request, reply) {
    try {
        const expenseId = request.params.id;
        const userId = request.id;

        const user = await User.findById(userId);
        if (!user) {
            throw {code: 404, message: "User not found"};
        }

        const updatedExpense = await Expense.findByIdAndUpdate(expenseId, request.body, {new: true});

        if (!updatedExpense) {
            throw {code: 404, message: "Expense not found"};
        }

        reply.send(updatedExpense);
    }
    catch (error) {
        const err = getError(error);
        reply.code(err.code).send(err.message);
    }
}


export async function deleteExpense(request, reply) {
    try {
        const expenseId = request.params.id;
        const userId = request.id;

        const user = await User.findById(userId);
        if (!user) {
            throw {code: 404, message: "User not found"};
        }

        const deletedExpense = await Expense.findByIdAndDelete(expenseId);

        if (!deletedExpense) {
            throw {code: 404, message: "Expense not found"};
        }

        reply.code(204).send();
    } catch (error) {
        const err = getError(error);
        reply.code(err.code).send(err.message);
    }
}

export async function getExpenses(request, reply) {
    try {
        const userId = request.user.id;
        console.log("==================================== USER ID ===================================="); 
        console.log(userId);
        const user = await User.findById(userId);
        const requestBuilder = {
            user: userId
        };

        if (request.query.category) {
            requestBuilder.category = request.query.category;
        }
        console.log(request.query);
        if (request.query.last) { 
            switch (request.query.last) {
                case 'week':
                        requestBuilder.createdAt = {
                            $gte: new Date(new Date().setDate(new Date().getDate() - 7))
                        };
                    break;
                case 'month':
                    requestBuilder.createdAt = {
                        $gte: new Date(new Date().setMonth(new Date().getMonth() - 1))
                    };
                    break;
                case '3months':
                    requestBuilder.createdAt = {
                        $gte: new Date(new Date().setMonth(new Date().getMonth() - 3))
                    };
                default:
                    break;
            }
        }

        if (request.query.period) {
            const [startDate, endDate] = request.query.period.split('-');
            console.log("==================================== START DATE ====================================");
            console.log(startDate);
            console.log("==================================== END DATE ====================================");
            console.log(endDate);
            requestBuilder.createdAt = {
                $gte: new Date(startDate),
                $lte: new Date(endDate)
            };
        }

        console.log("==================================== REQUEST BUILDER ====================================");
        console.log(requestBuilder);

        if (!user) {
            throw {code: 404, message: "User not found"};
        }

        const expenses = await Expense.find(requestBuilder).sort({ createdAt: -1 });
        console.log("==================================== EXPENSES ====================================");
        console.log(expenses.length);
        reply.send(expenses);
    } catch (error) {
        console.log(error);
        const err = getError(error);
        reply.code(err.code).send(err.message);
    }
}