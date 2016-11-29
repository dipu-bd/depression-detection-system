// Methods related to questions

import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Questions } from './questions.js';

Meteor.methods({
    'questions.insert' (ques) {
        if (!Meteor.user().admin) {
            console.log("Unauthorized access");
            return null;
        } 

        check(ques, Questions.schema);         
        const _id = Questions.insert(ques);
        return { _id };
    },

    'questions.remove' (qid) {
        if (!Meteor.user().admin) {
            console.log("Unauthorized access");
            return null;
        }

        return Questions.remove(qid);        
    },
});