// Controller class for App_home
 
import { Cookie } from 'meteor/chuangbo:cookie';

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
        if (Cookie.get("session")) {
            return "Resume Your Test";
        }
        else {
            return "Begin Your Test";
        }
    },
    beginLink() {
        let user = Cookie.get("session");
        if(user) user = "/" + user;
        return "/session" + user;
    },
});