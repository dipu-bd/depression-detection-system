// Defines client side routing

import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';
 
// Import needed templates
import '/imports/ui/layouts/body/body.js';
import '/imports/ui/pages/home/home.js';
import '/imports/ui/pages/session/start.js';
import '/imports/ui/pages/session/main.js';
import '/imports/ui/pages/result/result.js';
import '/imports/ui/pages/result/print.js';
import '/imports/ui/pages/statistics/stats.js';
import '/imports/ui/pages/not-found/not-found.js';


// Set up all routes in the app
FlowRouter.route('/', {
    name: 'App.home',
    action() {
        BlazeLayout.render('App_body', { main: 'App_home' });
    },
});

FlowRouter.route('/session', {
    name: 'App.session.start',
    action() {
        BlazeLayout.render('App_body', { main: 'App_session_start' });
    }
});

FlowRouter.route('/session/:_id', {
    name: 'App.session.main',
    action(params) {
        BlazeLayout.render('App_body', { main: 'App_session_main' });
    }
});

FlowRouter.route('/result/:_id', {
    name: 'App.result',
    action(params) {        
        BlazeLayout.render('App_body', { main: 'App_result' });
    }
});

FlowRouter.route('/print/:_id', {
    name: 'App.print',
    action(params) {        
        BlazeLayout.render('App_result_print');
    }
});

FlowRouter.route('/statistics', {
    name: 'App.stats',
    action(params) {        
        BlazeLayout.render('App_body', { main: 'App_stats' });
    }
});


FlowRouter.notFound = {
    action() {
        BlazeLayout.render('App_body', { main: 'App_notFound' });
    },
};
