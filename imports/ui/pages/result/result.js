// Controller for result page

import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import { Choices } from "/imports/api/choices";
import { Sessions } from '/imports/api/sessions';
import { SessionCookie } from '/imports/lib/cookies';

import "./result.html";
import "./result.scss";

function sessionId() {
    return FlowRouter.getParam('_id');
}

Template.App_result.onCreated(function() {
    // load all questions list
    this.autorun(() => {
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

Template.App_result.helpers({
    session() {
        return Sessions.findOne();        
    }
});