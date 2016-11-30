// Controller for main test page

import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';
import { Match } from 'meteor/check';
import { Template } from 'meteor/templating';
import { Stats } from '/imports/api/stats/stats';
import { Questions } from '/imports/api/questions/questions';

import "./main.html";

Template.App_test_main.onCreated(function () {

    const statId = FlowRouter.getParam('statId');

    this.autorun(function () {
        Meteor.subscribe('questions.bdi');
        Meteor.subscribe('stats.user', statId);
    });

    const user = Session.get("stat") || {};
    if (!Match.test(user._id, String)) {
        Session.setDefault('stat', { _id: statId });
    }
});

Template.App_test_main.helpers({
    statId() {
        return FlowRouter.getParam('statId');
    },
    questions() {
        return Questions.find();
    },

});