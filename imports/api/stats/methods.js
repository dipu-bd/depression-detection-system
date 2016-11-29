// Methods related to statistics
 
import { check } from 'meteor/check';
import { Stats } from './stats.js';

Meteor.methods({
    'stats.insert' (doc) {  
        console.log("I am in methods");
        check(doc, Stats.schema);
        
        return Stats.insert(doc);
    },

    'stats.addChoice' (id, quesId, choice) {
        return false;
    }
});