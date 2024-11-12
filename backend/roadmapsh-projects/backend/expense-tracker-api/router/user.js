import { registerUser, loginUser } from "../controller/user.js";

const userRouter = (fastify, opts, done) => {
    fastify.post('/register', {
        schema: credentialsSchema,
        handler: registerUser
    });

    fastify.post('/login', {
        schema: credentialsSchema,
        handler: loginUser
    });

    done();
}


const credentialsSchema = {
    body: {
        type: 'object',
        required: ['email', 'password'],
        properties: {
            email: {type: 'string'},
            password: {type: 'string'}
        }
    }
}

export default userRouter;