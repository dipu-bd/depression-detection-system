// Controller for main session page

import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var'

import { Choices } from '/imports/api/choices';
import { Sessions } from '/imports/api/sessions';
import { Questions } from '/imports/api/questions';
import { SessionCookie } from '/imports/lib/cookies';
 
import "../../components/loader/loader";
import "../../components/question/question";
import "./main.scss";
import "./main.html";

var loading = new ReactiveVar(false);

function sessionId() {
    return FlowRouter.getParam('_id');
}
function session() {
    return Sessions.findOne();
}

function loadQuestion() {
    loading.set(true);
    Meteor.autorun(function () {
        Meteor.call("questions.next", sessionId(), function onError(err) {
            loading.set(false);
            if (err) {
                console.log(err);
                Materialize.toast(err, 5000);
            }
        });
    });
}

function setChoice(template) {
    // call server function
    const session = template.data.session;
    const ques = template.data._id;
    const index = event.target.value;

    loading.set(true);
    template.autorun(function () {
        Meteor.call('choices.set', session, ques, index, function (err) {
            loading.set(false);
            if (err) {
                console.log(err);
                Materialize.toast(err, 2000);
            } else {
                //loadQuestion();
            }
        });
    });
}


Template.App_session_main.onCreated(function () {
    const template = this;
    template.autorun(() => {
        template.subscribe('questions.all');
        template.subscribe('choices.user', sessionId());
        template.subscribe('sessions.user', sessionId(), {
            onError() {
                SessionCookie.remove();
                FlowRouter.go('App.session.start');
            }, onReady() {
                SessionCookie.set(sessionId());
                if (!session().finished) {
                    loadQuestion(template);
                }
            }
        });
    });
});

Template.App_session_main.helpers({
    name() {
        return session().name;
    },
    questions() {
        var keys = Choices.questions(sessionId(), [session().current]);
        return Questions.find({ _id: { '$in': keys } }, { sort: { type: -1 } });
    },
    nextButtonDisabled() {
        return loading.get() || !session().checked ? "disabled" : "";
    },
    nextButtonLabel() {
        return session().finished ? "View Result" : "Next Question";
    },
    questionArg(ques) {
        ques.session = sessionId();
        return ques;
    },
    isloading() {
        return loading.get();
    },
});

Template.App_session_main.events({
    'click #end-session-button': function (event, template) {
        SessionCookie.remove();
        FlowRouter.go("App.home");
    },
    'click #next-question-button': function (event, template) {
        if (session().finished) {
            FlowRouter.go("App.result", { _id: sessionId() });
        }
        else {
            loadQuestion();
            if (!session().checked) {
                Materialize.toast("Please check the last question", 1000);
            }
        }
    },
});

Template.question.events({
    'click .option input'(event, template) { 
         if (session().finished) {
            FlowRouter.go("App.result", { _id: sessionId() });
        }
        else {
            setChoice(template);
        }
    },
});
