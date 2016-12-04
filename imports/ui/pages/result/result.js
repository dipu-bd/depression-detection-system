// Controller for result page

import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { moment } from 'meteor/momentjs:moment';

import { Choices } from "/imports/api/choices";
import { Sessions } from '/imports/api/sessions';
import { SessionCookie } from '/imports/lib/cookies';
import { Questions } from "/imports/api/questions";
import { Messages } from '/imports/lib/messages';

import "./result.html";
import "./result.scss";

function sessionId() {
    return FlowRouter.getParam('_id');
}

Template.App_result.onCreated(function() {
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

Template.App_result.helpers({
    session() {
        return Sessions.findOne();
    },
    getAge(dob) {
        return moment(dob).fromNow(true);
    },
    depressionMessage() {
        return new Messages(sessionId()).bds();
    },
    anxietyMessage() {
        return new Messages(sessionId()).bas();
    },
    suicidalMessage() {
        return new Messages(sessionId()).bss();
    },
    hopelessMessage() {
        return new Messages(sessionId()).bhs();
    },
    optionList() {
        const choices = Choices.allChoices(sessionId());
        return Questions.optionDetails(choices);
    }

});