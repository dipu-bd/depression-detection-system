// Controller for main session page

import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import { Sessions } from '/imports/api/sessions';
import { SessionCookie } from '/imports/lib/cookies';

import "../../components/questionList/questionList";
import "../../components/loader/loader";
import "./main.html";

function sessionId() {
    return FlowRouter.getParam('_id');
}

Template.App_session_main.onCreated(function () {
    // load all questions list
    this.autorun(() => {
        this.subscribe('questions.all');
        this.subscribe('choices.user', sessionId());
        this.subscribe('sessions.user', sessionId(), {
            onError() {
                SessionCookie.remove();
                FlowRouter.go('App.session.start');
            }, onReady() {
                SessionCookie.set(sessionId());
            }
        });
    });
});

Template.App_session_main.helpers({
    session() {
        return Sessions.findOne();
    },
});