// Controller class for App_home
 
import "./home.html";

Template.App_home.onRendered(function () {
    this.$('.particle').particleground();
}); 