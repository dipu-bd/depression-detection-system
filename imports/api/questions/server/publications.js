// All questions-related publications

import { Meteor } from 'meteor/meteor';
import { Questions } from '../questions.js';

Meteor.publish('questions.bdi', function () {
    return Questions.find({
        type: { $and: [ {$gte: 1}, {$lte: 21} ] }
    });
});
