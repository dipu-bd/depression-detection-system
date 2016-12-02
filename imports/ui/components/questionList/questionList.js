// Controller for questionList

import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import { SessionCookie } from '/imports/lib/cookies';

import "../question/question";
import "./questionList.html";
import "./questionList.scss";

function sessionId() {
    return Template.instance().data._id;
}

function nextQuestion() {
    Template.instance().autorun(function() {
        Meteor.call("questions.next", sessionId());
    });
}

Template.question_list.onCreated(function() {
    nextQuestion();
});

Template.question_list.helpers({
    endSession() {
        SessionCookie.remove();
        FlowRouter.go("App.session.start");
    },
});