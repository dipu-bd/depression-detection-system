// Controller class for App_home

import { Gradient } from "../../js/gradient";

//import "../../components/clouds/clouds"; 
import "./home.html";

const gradient = new Gradient();

Template.App_home.onRendered(function () {
    gradient.start(this.$('.gradient'));
}); 

Template.App_home.onDestroyed(function () {    
    gradient.stop();
});