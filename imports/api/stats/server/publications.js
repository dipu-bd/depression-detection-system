// All questions-related publications

import { Meteor } from 'meteor/meteor';
import { Stats } from '../stats.js';

Meteor.publish('stats.findOne', function (id) {
    return Stats.findOne(id);
}); 

Meteor.publish('stats.score', function (id) {
    return Stats.findOne(id).score();
}); 