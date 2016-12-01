// Methods related to session
 
import { check } from 'meteor/check';
import { Sessions } from './sessions.js';

Meteor.methods({
    'sessions.insert' (doc) {   
        check(doc, Session.schema);   
        return Sessions.insert(doc);
    },

    'sessions.addChoice' (id, quesId, choice) {
        return false;
    }
});