import Fastify from "fastify";
import { postSchema, idSchema } from "./models/schema.js";
import { getAllPosts, getPostById, createPost, updatePost, deletePost } from "./posts/controller.js";

const app = Fastify({ logger: true });

const PORT = process.env.PORT || 3000;

app.get("/posts", async (request, reply) => getAllPosts(request, reply));

app.post("/posts", {schema: postSchema}, (request, reply) => createPost(request, reply));

app.get("/posts/:id", {schema: idSchema}, async (request, reply) => getPostById(request, reply));

app.delete("/posts/:id", {schema: idSchema}, async (request, reply) => deletePost(request, reply));

app.put("/posts/:id", {schema: postSchema}, async (request, reply) => updatePost(request, reply));


try {
    app.listen({port : PORT});
    console.log(`Server listening on port ${PORT}`);
} catch (err) {
    console.error(err);
    process.exit(1);
}