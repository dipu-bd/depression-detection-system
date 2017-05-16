// Controller class for App_home
import { Match } from 'meteor/check'; 
import "./home.html";
import "./home.scss";

Template.App_home.onRendered(function() {
    this.$('.particles').particleground({
        lineColor: '#669955',
        dotColor: '#996655',
        density: 4000,
        proximity: 80,
        parallaxMultiplier: 4,
    });
});

Template.App_home.onDestroyed(function() {
    this.$('.particles').particleground('destroy');
});
