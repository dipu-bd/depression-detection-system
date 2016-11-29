// Methods related to statistics
 
import { check } from 'meteor/check';
import { Stats } from './stats.js';

Meteor.methods({
    'stats.insert' (doc) {   
        check(doc, Stats.schema); 
        const id = Stats.insert(doc);
        console.log("!!New statistics!!", id);
        return id;
    },

    'stats.addChoice' (id, quesId, choice) {
        return false;
    }
});