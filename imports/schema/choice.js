// Definition of ChoiceSchema 

import { SimpleSchema } from 'meteor/aldeed:simple-schema';

// schema for options used in each questions
export const ChoiceSchema = new SimpleSchema({     
    session: {
        type: String,
    },
    question: {
        type: String,
    },
    option: {
        type: Number,
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