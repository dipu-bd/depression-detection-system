// Methods related to questions

import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Questions } from './questions';
import { Sessions } from './sessions';

Meteor.methods({
    'sessions.insert'(doc) {
        check(doc, Sessions.schema);
        return Sessions.insert(doc);
    },
    'questions.next'(_id) { 
        
        
    },
});