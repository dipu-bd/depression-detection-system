// Controller for statistics page

import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { moment } from 'meteor/momentjs:moment';
import { _ } from 'meteor/erasaur:meteor-lodash';

import { Choices } from "/imports/api/choices";
import { Sessions } from '/imports/api/sessions';
import { SessionCookie } from '/imports/lib/cookies';
import { Questions } from "/imports/api/questions";
import { Messages } from '/imports/lib/messages';

import "../../components/loader/loader";
import "./stats.html";
import "./stats.scss";

Template.App_stats.onCreated(function () {
    // load all questions list
    this.autorun(() => {
        this.subscribe('questions.all');
        this.subscribe('choices.all');
        this.subscribe('sessions.all');
    });
    this.subscriptionsReady(() => {
        console.log("Ready");
    }); 
});

//Template.App_stats.helpers({ });