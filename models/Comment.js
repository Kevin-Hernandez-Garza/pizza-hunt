const { Schema, model, Types } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

// reply schema
const ReplySchema = new Schema(
    {
        // setting custom replyId
        replyId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId()
        },
        replyBody: {
            type: String,
            required: true,
            trim: true
        },
        writtenBy: {
            type: String,
            required: true
        },
        createdAt: {
            type: Date, 
            default: Date.now,
            get: createdAtVal => dateFormat(createdAtVal)
        }
    },
    {
        toJSON: {
            getters: true
        }
    }
);



// creating model and defining it's fields/rows(mySQL)
const CommentSchema = new Schema(
    {
    writtenBy: {
        type: String,
        required: true, 
        trim: true
    },
    commentBody: {
        type: String,
        required: true,
        trim: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: createdAtVal => dateFormat(createdAtVal)
    },
    // use ReplySchema to validate data for a reply 
    replies: [ReplySchema]
    },
    {
        toJSON: {
            // allowing virtuals to work
            virtuals: true, 
            getters: true
        },
        id: false
    }
);

// get reply count 
CommentSchema.virtual('replyCount').get(function() {
    return this.replies.length;
});

const Comment = model('Comment', CommentSchema);

module.exports = Comment;