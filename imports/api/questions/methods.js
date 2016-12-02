// Methods related to questions

import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Questions } from './questions.js';

Meteor.methods({
    'questions.insert' (doc) {
        if (!Meteor.user().admin) {
            console.log("Unauthorized access");
            return null;
        } 

        check(doc, Questions.schema);         
        const _id = Questions.insert(doc);
        return { _id };
    },
    'questions.remove' (quesId) {
        if (!Meteor.user().admin) {
            console.log("Unauthorized access");
            return null;
        }
        return Questions.remove(quesId);        
    },
    'question.next' (sessionId, ) {

    }    
});