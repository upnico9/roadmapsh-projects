const postSchema = {
    body: {
      type: 'object',
      required: ['title', 'content', 'category'],
      properties: {
        title: { type: 'string' },
        content: { type: 'string' },
        tags: { type: 'array', items: { type: 'string' } },
        category: { type: 'string' }
      }
    }
};

const idSchema = {
    params: {
      type: 'object',
      required: ['id'],
      properties: {
        id: { type: 'string' }
      }
    }
};

export { postSchema, idSchema };
  