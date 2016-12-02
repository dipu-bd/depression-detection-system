// Controller for main session page

import { Meteor } from 'meteor/meteor'; 
import { Template } from 'meteor/templating';
import { Cookie } from 'meteor/chuangbo:cookie';
import { Sessions } from '/imports/api/sessions/sessions'; 

import "../../components/questionList/questionList";
import "../../components/loader/loader";
import "./main.html";

function sessionId() {
    return FlowRouter.getParam('id');
}

Template.App_session_main.onCreated(function () {
    // subscribe to collections
    this.autorun(() => { 
        this.subscribe('questions.bdi'); 
        this.subscribe('sessions.user', sessionId());
    });
    // set cookie if not match
    if (Cookie.get('session') !== sessionId()) {
        Cookie.set('session', sessionId(), {
            expires: 30,
            path: '/',
        });
    }
});

Template.App_session_main.helpers({ 
    session() {
        return Sessions.findOne();
    }, 
});