// Controller for main test page

import { Meteor } from 'meteor/meteor';

import { Stats } from '/imports/api/stats/stats';
import { Questions } from '/imports/api/questions/questions';

import "./main.html";


Template.App_test_main.onCreated(() => {
    Meteor.autorun(() => {
        Meteor.subscribe('questions.bdi');
    });
});

Template.App_test_main.onRendered(() => {
    console.log(Questions.find());
});