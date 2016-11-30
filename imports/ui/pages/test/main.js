// Controller for main test page

import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session'
import { Template } from 'meteor/templating'
import { Stats } from '/imports/api/stats/stats';
import { Questions } from '/imports/api/questions/questions';

import "./main.html";

Template.App_test_main.onCreated(function () {
    this.autorun(function () {
        Meteor.subscribe('questions.bdi');
    });
});

Template.App_test_main.helpers({
    questions() {
        console.log("Taking questions");
        console.log(Questions.find().count());
        return Questions.find();
    },

});