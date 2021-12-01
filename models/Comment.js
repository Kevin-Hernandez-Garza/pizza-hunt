const { Schema, model } = require('mongoose');

// creating model and defining the fields/rows(mySQL)
const CommentSchema = new Schema({
    writtenBy: {
        type: String 
    },
    commentBody: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Comment = model('Comment', CommentSchema);

module.exports = Comment;