import { Sequelize, DataTypes } from 'sequelize';

const sequelize = new Sequelize('postgres://nicolas:test_password@localhost:5432/todo_app');

// check if connection is successful
sequelize.authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch((error) => {
        console.error('Unable to connect to the database:', error);
    });

const Post = sequelize.define('Post', {
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    tags: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: true
    },
    category: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'modified_at'
});

// sequelize.sync().then(() => {
//     console.log('Post table created');
// }).catch((error) => {    
//     console.error('Unable to create Post table:', error);
// });

export default Post;