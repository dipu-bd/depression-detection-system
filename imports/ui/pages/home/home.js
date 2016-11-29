// Controller class for home
 
import { Template } from 'meteor/templating';

//import "../../components/clouds/clouds.js";
import "../../components/statsModal/modal.js";
import "./home.html";
  
Template.App_home.onRendered(function() { 
    $('.modal-trigger').leanModal();
});
