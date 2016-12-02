// Controller for questionList

import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import { SessionCookie } from '/imports/lib/cookies';

import "../question/question";
import "./questionList.html";
import "./questionList.scss";

Template.question_list.onCreated(function () {
    const template = this;
    template.loadQuestion = () => {
        template.autorun(function () {
            Meteor.call("questions.next", template.data._id);
        });
    }
    if (!template.data.current) {
        template.loadQuestion();
    }
});

Template.question_list.events({
    'click #end-session-button': function (event, template) {
        SessionCookie.remove();
        FlowRouter.go("App.home");
    },
    'click #next-question-button': function (event, template) {
        if (template.data.checked === template.data.questions.length) {
            if (template.data.finished) {
                template.$('#next-question-button').text("Finish");
            }
            else {
                template.loadQuestion();
            }
        }
    }, 
});