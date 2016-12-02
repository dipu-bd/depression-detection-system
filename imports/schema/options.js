// Definition of OptionsSchema 

import { SimpleSchema } from 'meteor/aldeed:simple-schema';

// schema for options used in each questions
export const OptionSchema = new SimpleSchema({ 
    title: {
        type: String,
        defaultValue: "",
    },
    score: {
        type: Number,
    },
    desc: {
        type: String,
        label: "Description",
    }
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