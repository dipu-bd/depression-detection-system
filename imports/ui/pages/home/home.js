// Controller class for App_home
 
import "./home.html";

Template.App_home.onRendered(function () {
    this.$('.particle').particleground({        
        lineColor: '#669955',
        dotColor: '#996655',
        density: 4000, 
        proximity: 80,
        parallaxMultiplier: 4,
    }); 
}); 