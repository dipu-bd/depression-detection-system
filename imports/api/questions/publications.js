// All questions-related publications

import { Meteor } from 'meteor/meteor';
import { Questions } from './questions.js';

Meteor.publish('questions.all', function () {
    return Questions.find();
});

Meteor.publish('questions.type', function (type) {
    return Questions.find({type});
});