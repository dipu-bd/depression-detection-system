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
import '/imports/ui/pages/admin/admin.js';
import '/imports/ui/pages/admin/peoples.js';


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

FlowRouter.route('/statistics/:batch?', {
    name: 'App.stats',
    action(params) {        
        if(localStorage.getItem('session') != 'true') {
            return FlowRouter.go('/admin/login');
        }     
        BlazeLayout.render('App_body', { main: 'App_stats' });
    }
});

FlowRouter.route('/admin/users/:type/:category?', {
    name: 'Admin.users',
    action(params) {
        if(localStorage.getItem('session') != 'true') {
            return FlowRouter.go('/admin/login');
        }
        BlazeLayout.render('App_body', { main: 'App_users' });        
    }
});

FlowRouter.route('/admin/login', {
    name: 'App.admin',
    action(params) {      
        if(localStorage.getItem('session') == 'true') {
            FlowRouter.go('/statistics');
        }
        BlazeLayout.render('App_body', { main: 'App_admin' });
    }
});

FlowRouter.route('/admin/logout', {
    name: 'App.admin',
    action(params) {      
        if(localStorage.getItem('session') != 'true') {
            FlowRouter.go('/admin/login');
        }
        localStorage.removeItem('session');
        return FlowRouter.go('/');
    }
});

FlowRouter.notFound = {
    action() {
        BlazeLayout.render('App_body', { main: 'App_notFound' });
    },
};
