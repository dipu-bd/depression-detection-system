// Controller for Navbar

import { Template } from 'meteor/templating';

import './nav.html';

Template.nav.onRendered(function(){
    this.$('.button-collapse').sideNav();
}); 

