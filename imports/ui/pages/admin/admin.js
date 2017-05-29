// Controller for result page

import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { moment } from 'meteor/momentjs:moment';
import { _ } from 'meteor/erasaur:meteor-lodash';

import "./admin.html";

Template.App_result.onCreated(function () {
    // load all questions list
    
});

Template.App_result.helpers({
    session() {
        return Sessions.findOne();
    },
    getAge(dob) {
        return moment(dob).fromNow(true);
    },
    messages() {
        return new Messages(sessionId());
    },
    optionList() {
        const choices = Choices.allChoices(sessionId());
        return Questions.optionDetails(choices);
    },
    upperFirst(data) {
        return _.upperFirst(data);
    }
});