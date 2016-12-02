// Defines client side routing

import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';

// Import needed templates
import '../../ui/layouts/body/body.js';
import '../../ui/pages/home/home.js';
import '../../ui/pages/session/start.js';
import '../../ui/pages/session/main.js';
import '../../ui/pages/not-found/not-found.js';

// Set up all routes in the app
FlowRouter.route('/', {
  name: 'App.home',
  action() {
    BlazeLayout.render('App_body', { main: 'App_home' });
  },
});

FlowRouter.route('/session', {
  name: 'App.session',
  action() {
    BlazeLayout.render('App_body', { main: 'App_session_start' });
  }
});

FlowRouter.route('/session/:id', {
  name: 'App.session',
  action(params) {
    BlazeLayout.render('App_body', { main: 'App_session_main'});
  }
}); 

FlowRouter.notFound = {
  action() {
    BlazeLayout.render('App_body', { main: 'App_notFound' });
  },
};
