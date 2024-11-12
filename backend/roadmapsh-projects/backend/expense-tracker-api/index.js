import Fastify from "fastify";
import fastifyJWT from "fastify-jwt";
import connectDB from "./database/connector.js";
import userRouter from "./router/user.js";
import expensesRouter from "./router/expenses.js";
import dotenv from "dotenv";

dotenv.config();
const PORT = Number(process.env.PORT) || 3000;
const app = Fastify({logger: true});

await connectDB();

app.register(fastifyJWT, {
    secret: process.env.JWT_SECRET
});

app.decorate("authenticate", async function(request, reply) {
    try {
        await request.jwtVerify();
    } catch (err) {
        reply.code(401).send({ error: 'Unauthorized' });
    }
});

app.register(expensesRouter, {prefix: '/expenses'});
app.register(userRouter, {prefix: '/'});


app.listen({port : PORT}, (err, address) => {
    if (err) {
        app.log.error(err);
        process.exit(1);
    }
    app.log.info(`Server listening on ${address}`);
});