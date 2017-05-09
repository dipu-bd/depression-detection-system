// Definition of StatisticsSchema 

import { SimpleSchema } from 'meteor/aldeed:simple-schema';

// schema for options used in each questions
export const StatisticsSchema = new SimpleSchema({
    session: {
        type: String,
    },
    // scales are one of: ['anxiety', 'depression', 'hopeless', 'suicide']
    scale: {
        type: String,
    },
    score: {
        type: Number,
    },
    category: {
        type: String,
    },

    // optional batch
    batch: {
        type: String,
        optional: true,
        defaultValue: ""
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
    updatedAt: {
        type: Date,
        denyInsert: true,
        optional: true,
        autoValue() {
            if (this.isUpdate) {
                return new Date();
            }
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