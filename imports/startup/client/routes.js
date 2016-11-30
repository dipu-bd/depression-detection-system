import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';

// Import needed templates
import '../../ui/layouts/body/body.js';
import '../../ui/pages/home/home.js';
import '../../ui/pages/test/start.js';
import '../../ui/pages/test/main.js';
import '../../ui/pages/not-found/not-found.js';

// Set up all routes in the app
FlowRouter.route('/', {
  name: 'App.home',
  action() {
    BlazeLayout.render('App_body', { main: 'App_home' });
  },
});

FlowRouter.route('/test', {
  name: 'App.test',
  action() {
    BlazeLayout.render('App_body', { main: 'App_test_start' });
  }
});

FlowRouter.route('/test/:statId', {
  name: 'App.test',
  action(params) {
    BlazeLayout.render('App_body', { main: 'App_test_main'});
  }
}); 



FlowRouter.notFound = {
  action(params, queryParams) {
    BlazeLayout.render('App_body', { main: 'App_notFound' });
  },
};
