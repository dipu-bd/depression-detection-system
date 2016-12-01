// Controller for main session page

import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';
import { Match } from 'meteor/check';
import { Template } from 'meteor/templating';
import { Sessions } from '/imports/api/sessions/sessions';
import { Questions } from '/imports/api/questions/questions';

import "./main.html";

Template.App_session_main.onCreated(function () {

    const id = FlowRouter.getParam('id');

    this.autorun(function () {
        Meteor.subscribe('questions.bdi');
        Meteor.subscribe('sessions.user', id);
    });

    const user = Session.get("session") || {};
    if (!Match.test(user._id, String)) {
        Session.setDefault('session', { _id: id });
    }
});

Template.App_session_main.helpers({
    id() {
        return FlowRouter.getParam('id');
    },
    questions() {
        return Questions.find();
    },

});