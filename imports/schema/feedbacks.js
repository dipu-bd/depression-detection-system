// Definition of FeedbackSchema
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

// schema for options used in each questions
export const FeedbackSchema = new SimpleSchema({
    ip: {
        type: String,
    },
    feedback: {
        type: String,
    },

    // auto-managed properties
    createdAt: {
        type: Date,
        optional: true,
        autoValue() {
            if (this.isInsert) {
                return new Date();
            }
            if (this.isUpsert) {
                return { $setOnInsert: new Date() };
            }
            // Otherwise prevent user from supplying their own value
            this.unset();
        },
    },
});

/* 
_id: {
    type: String,
    unique: true,
    autoValue: function () {
        return Meteor.uuid();
    }
}, 
*/