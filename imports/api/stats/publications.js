// All questions-related publications

import { Meteor } from 'meteor/meteor';
import { Stats } from './stats.js';

Meteor.publish('stats.user', function (statId) { 
    return Stats.find(statId);
});   