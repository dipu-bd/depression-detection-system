// Methods related to statistics

import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Stats } from './stats.js';

Meteor.methods({
    'stats.insert' (user) { 
        check(user, Stats.schema);
        
        return Stats.insert(user);
    },

    'stats.addChoice' (id, quesId, choice) {
        return false;
    }
});