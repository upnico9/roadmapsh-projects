import { createExpense, updateExpense, deleteExpense, getExpenses } from "../controller/expense.js";

const expensesRouter = (fastify, opts, done) => {
    fastify.post('/', {
        schema: addExpenseSchema,
        preHandler: [fastify.authenticate],
        handler: async (request, reply) => createExpense(request, reply)
    });

    fastify.delete('/:id', {
        schema: idSchema,
        preHandler: [fastify.authenticate],
        handler: async (request, reply) => deleteExpense(request, reply)
    });

    fastify.put('/:id', {
        schema: {idSchema, addExpenseSchema},
        preHandler: [fastify.authenticate],
        handler: async (request, reply) => updateExpense(request, reply)
    });

    fastify.get('/', {
        preHandler: [fastify.authenticate],
        handler: async (request, reply) => getExpenses(request, reply)
    });

    done();
}

const idSchema = {
    params: {
        type: 'object',
        required: ['id'],
        properties: {
            id: {type: 'string'}
        }
    }
}

const addExpenseSchema = {
    body: {
        type: 'object',
        required: ['amount', 'description', 'expenseType', 'category'],
        properties: {
            amount: {type: 'number'},
            description: {type: 'string'},
            expenseType: {type: 'string', enum: ['Punctual', 'Subscription']},
            category: {type: 'string', enum: ['Groceries', 'Leisure', 'Electronics', 'Utilities', 'Clothing', 'Health', 'Other']},
            subscriptionDetails: {
                type: 'object',
                properties: {
                    frequency: {type: 'string', enum: ['Monthly', 'Yearly']},
                    dayOfMonth: {type: 'number', minimum: 1, maximum: 31}
                }
            }
        }
    }
}

export default expensesRouter;

