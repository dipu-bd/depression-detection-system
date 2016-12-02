// Controller class for App_home

import { Session } from 'meteor/session';
import { Match } from 'meteor/check';
 
import "./home.html";
import './home.scss';

Template.App_home.onRendered(function () {
    this.$('.particle').particleground({        
        lineColor: '#669955',
        dotColor: '#996655',
        density: 4000, 
        proximity: 80,
        parallaxMultiplier: 4,
    }); 
}); 

Template.App_home.onDestroyed(function () {
    this.$('.particle').particleground('destroy');
}); 

Template.App_home.helpers({
    beginText() {
        const user = Session.get("session") || {};
        if (Match.test(user._id, String)) {
            return "Resume Your Test";
        }
        else {
            return "Begin Your Test";
        } 
    },
    beginLink() {
        const user = Session.get("session") || {};
        return "/session" + (user._id ? "/" + user._id : "");         
    },
});