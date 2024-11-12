import User from '../models/users.js';
import getError from '../utils/error.js';
import bcrypt from 'bcrypt';


export async function registerUser(request, reply) {
    const userData = request.body;

    const hashedPassword = await bcrypt.hash(userData.password, 10);
    userData.password = hashedPassword;
    try {
        const user = new User(userData);
        await user.save();
        reply.code(200).send(user);
    } catch(error) {
        if (error.code === 11000) {
            reply.code(400).send("User already exists");
        } else {
            reply.code(500).send("Error while registering user");
        }
    }
}

export async function loginUser(request, reply) {
    try {
        const user = await User.findOne({email: request.body.email});
        console.log(user);
        if (!user) {
            throw {code: 404, message: "User not found"};
        }
        if (!await bcrypt.compare(request.body.password, user.password)) {
            throw {code: 401, message: "Invalid password"};
        }

        const token = this.jwt.sign({
            id: user._id,
            email: user.email
        }, {expiresIn: '1h'});

        reply.code(200).send({token});
    } catch (error) {
        console.log(error);
        const err = getError(error);
        reply.code(err.code).send(err.message);
    }
}