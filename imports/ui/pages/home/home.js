// Controller class for App_home

import { Gradient } from "../../js/gradient";

//import "../../components/clouds/clouds"; 
import "./home.html";

Template.App_home.onCreated(function () {
    Gradient();
}); 