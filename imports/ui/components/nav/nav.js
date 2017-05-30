// Controller for Navbar

import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './nav.html';

Template.nav.onRendered(function(){

    this.$('.button-collapse').sideNav();
    
});

Template.nav.onCreated(() => {
    this.session = new ReactiveVar(false);
    Meteor.setTimeout(() => {
        session.set(localStorage.getItem('session') == 'true');
    }, 100);
})

Template.nav.helpers({
    loggedIn() {
        return this.session.get() ? '' : 'hidden';
    }
});
