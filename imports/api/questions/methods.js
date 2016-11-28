// Methods related to questions

import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Questions } from './questions.js';

Meteor.methods({
    'questions.insert' (type, title, desc, options) {
        if (!Meteor.user().admin) {
            console.log("Unauthorized access");
            return null;
        } 

        check(type, Number);
        check(desc, String);
        check(options, [ { desc: String, score: Number, }, ]);
        
        const ques = {
            type,
            title,
            desc,
            options,
            createdAt: new Date(),
        };

        return Questions.insert(ques);
    },

    'questions.remove' (qid) {
        if (!Meteor.user().admin) {
            console.log("Unauthorized access");
            return null;
        }

        return Questions.remove(qid);        
    },
});