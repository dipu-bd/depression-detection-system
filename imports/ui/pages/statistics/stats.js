// Controller for statistics page

import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { moment } from 'meteor/momentjs:moment';
import { _ } from 'meteor/erasaur:meteor-lodash';
import { ReactiveVar } from 'meteor/reactive-var';

import { Choices } from "/imports/api/choices";
import { Sessions } from '/imports/api/sessions';
import { SessionCookie } from '/imports/lib/cookies';
import { Questions } from "/imports/api/questions";
import { Messages } from '/imports/lib/messages';

import "../../components/loader/loader";
import "./stats.html";
import "./stats.scss";

var loading = new ReactiveVar(false);

function calculateEntities() {
    loading.set(true);
    let count = 0;
    Sessions.find().forEach((session)=> {
        const message = new Messages(session._id);
        if(message.completed) {
            count++;
        }
    });
    console.log(count, 'complted');
    loading.set(false);
}

Template.App_stats.onCreated(function () {
    // load all questions list
    this.autorun(() => {
        this.subscribe('questions.all');
        this.subscribe('choices.all');
        this.subscribe('sessions.all');
        if (this.subscriptionsReady()) {
            setTimeout(calculateEntities, 100);
        }
    });
});

Template.App_stats.helpers({ 
    isLoading() {
        return loading.get() || !this.subscriptionsReady;
    }
});