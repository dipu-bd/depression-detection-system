// Controller for questionList

import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import { SessionCookie } from '/imports/lib/cookies';

import "../question/question";
import "./questionList.html";
import "./questionList.scss";

Template.question_list.onCreated(function () {
    const template = this;
    template.nextQuestion = function () {
        template.autorun(function () {
            Meteor.call("questions.next", template.data._id);
        });
    }
    template.nextQuestion();
});

Template.question_list.events({
    'click #end-session-button': function (event, template) {
        SessionCookie.remove();
        FlowRouter.go("App.session.start");
    },
    'click #next-question-button': function (event, template) {
        if (template.data.checked === template.data.questions.length) {
            if (template.data.finished) {
                template.$('#next-question-button').text("Finish");
            }
            else {
                template.nextQuestion();
            }
        }
    }
});