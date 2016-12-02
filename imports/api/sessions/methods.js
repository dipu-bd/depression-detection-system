// Methods related to session
 
import { check } from 'meteor/check';
import { Sessions } from './sessions.js';

Meteor.methods({
    'sessions.insert' (doc) {    
        check(doc, Sessions.schema); 
        return Sessions.insert(doc);
    },
    'sessions.insertQuestion' () {

        return false;
    },
    'sessions.updateQuestion' () {
        
        return false;
    }
});