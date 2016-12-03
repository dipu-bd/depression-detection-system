// Controller for questionList

import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import { Questions } from '/imports/api/questions';
import { SessionCookie } from '/imports/lib/cookies';

import "../question/question";
import "./questionList.html";
import "./questionList.scss";

Template.question_list.onCreated(function () {
    const template = this;
    console.log(this);
    template.loadQuestion = () => {
        template.autorun(function () {
            Meteor.call("questions.next", template.data._id, function onError(err) {
                if (err) {
                    console.log(err);
                    Materialize.toast(err, 4000);
                }
            });
        });
    }
    template.loadQuestion();
});

Template.question_list.helpers({
    questions() { 
        return Sessions.question({ _id: { '$in': keys } });
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
    }
});

Template.question_list.events({
    'click #end-session-button': function (event, template) {
        SessionCookie.remove();
        FlowRouter.go("App.home");
    },
    'click #next-question-button': function (event, template) {
        if (template.data.finished) {
            FlowRouter.go("App.session.result", { _id: template.data._id });
        }
        else {
            template.loadQuestion();
        }
    },
});