// Controller for result page

import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { moment } from 'meteor/momentjs:moment';
import { _ } from 'meteor/erasaur:meteor-lodash';

import "./admin.html";

Template.App_admin.onCreated(function () {
    // load all questions list
    
});

Template.App_admin.helpers({
    session() {
        return Sessions.findOne();
    }
});

Template.App_admin.events({

    'submit .new-task'(event) {
        // Prevent default browser form submit
        event.preventDefault();
    
        // Get value from form element
        const target = event.target;
        let username = target.username.value;
        let password = target.password.value;

        //check the auth matches
        if(username && password){
            if(username == 'admin' && password == 'qwe@123'){
                localStorage.setItem('session', true);
                return FlowRouter.go('/statistics');
            }
            return console.log('wrong credentials');
        }
    
    },
});