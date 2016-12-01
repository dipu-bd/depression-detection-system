// Methods related to session
 
import { check } from 'meteor/check';
import { Session } from './session.js';

Meteor.methods({
    'session.insert' (doc) {   
        check(doc, Session.schema);   
        return Session.insert(doc);
    },

    'session.addChoice' (id, quesId, choice) {
        return false;
    }
});