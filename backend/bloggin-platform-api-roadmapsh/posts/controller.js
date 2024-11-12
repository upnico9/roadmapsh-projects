import Post from '../models/squeelize.js';
import { Op } from 'sequelize';

// Get all posts
export const getAllPosts = async (req, reply) => {
    const { term } = req.query;
    console.log(term);
    try {
        if (term) {
            const posts = await Post.findAll({
                where: {
                    [Op.or]: [
                        { title: { [Op.like]: `%${term}%` } },
                        { content: { [Op.like]: `%${term}%` } },
                        { category: { [Op.like]: `%${term}%` } },
                        { tags: { [Op.contains]: [term] } } // Adjusted for array type
                    ]
                }
            });
            return reply.code(200).send(posts);
        }
        
        const posts = await Post.findAll();
        reply.code(200).send(posts);
    } catch (error) {
        console.log(error);
        reply.code(500).send({ message: error.message });
    }
};

// Get a single post by ID
export const getPostById = async (req, reply) => {
    try {
        const post = await Post.findByPk(req.params.id);
        if (!post) return reply.code(404).send({ message: 'Post not found' });
        reply.code(200).send(post);
    } catch (error) {
        reply.code(500).send({ message: error.message });
    }
};

// Create a new post
export const createPost = async (req, reply) => {
    console.log(req.body);
    const post = new Post(req.body);
    try {
        const newPost = await post.save();
        reply.code(201).send(newPost);
    } catch (error) {
        reply.code(400).send({ message: error.message });
    }
};

// Update an existing post
export const updatePost = async (req, reply) => {
    try {
        const post = await Post.findByPk(req.params.id);
        if (!post) 
            return reply.code(404).send({ message: 'Post not found' });

        post.title = req.body.title;
        post.content = req.body.content;
        post.tags = req.body.tags;
        post.category = req.body.category
        post.updatedAt = new Date();
        
        await post.save();
        reply.code(200).send(post);
    } catch (error) {
        reply.code(400).send({ message: error.message });
    }
};

// Delete a post
export const deletePost = async (req, reply) => {
    try {
        const post = await Post.findByPk(req.params.id);
        if (!post) 
            return reply.code(404).send({ message: 'Post not found' });
        
        reply.code(204).send();
    } catch (error) {
        reply.code(500).send({ message: error.message });
    }
};