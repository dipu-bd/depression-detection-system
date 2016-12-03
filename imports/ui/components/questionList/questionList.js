// Controller for questionList

import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import { Choices } from '/imports/api/choices';
import { Questions } from '/imports/api/questions';
import { SessionCookie } from '/imports/lib/cookies';

import "../question/question";
import "./questionList.html";
import "./questionList.scss";

function loadQuestion(template) {
    template.autorun(function() {
        Meteor.call("questions.next", template.data._id, function onError(err) {
            if (err) {
                console.log(err);
                Materialize.toast(err, 4000);
            }
        });
    });
}

Template.question_list.onCreated(function() {
    if (!this.data.finished) {
        loadQuestion(this);
    }
});

Template.question_list.helpers({
    questions() {
        var keys = Choices.questions(this._id);
        keys.push(this.current);
        return Questions.find({ _id: { '$in': keys } }, { sort: { type: -1 } });
    },
    nextButtonDisable() {
        return this.checked ? "" : "disable";
    },
    nextButtonLabel() {
        return this.finished ? "View Result" : "Next Question";
    },
    questionArgs(ques) {
        ques.session = this._id;
        return ques;
    },
});

Template.question_list.events({
    'click #end-session-button': function(event, template) {
        SessionCookie.remove();
        FlowRouter.go("App.home");
    },
    'click #next-question-button': function(event, template) {
        if (template.data.finished) {
            FlowRouter.go("App.result", { _id: template.data._id });
        }
        else {
            loadQuestion(template);
        }
    },
});