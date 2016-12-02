// Controller for main session page

import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';
import { Match } from 'meteor/check';
import { Template } from 'meteor/templating';
import { Sessions } from '/imports/api/sessions/sessions';
import { Questions } from '/imports/api/questions/questions';

import "./main.html";

this.getSessionId = () => FlowRouter.getParam('id');

Template.App_session_main.onCreated(function () {
    this.autorun(() => {
        this.subscribe('questions.bdi');
        this.subscribe('sessions.user', getSessionId());
    });

    const user = Session.get("session") || {};
    if (!Match.test(user._id, String)) {
        Session.setDefault('session', { _id: getSessionId() });
    }
});

Template.App_session_main.helpers({
    questions() {
        return Questions.find();
    },
    session() {
        return Sessions.findOne();
    },
});