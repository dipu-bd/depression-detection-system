import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import './feedback.html';
import './feedback.scss';

function submitFeedback(feedback) {
	//console.log("=> data", feedback);
	if(!feedback || feedback.length <= 5) {
		return Materialize.toast("Your feedback is too short", 2000);
	}
	Meteor.autorun(function() {
		 Meteor.call('feedback', feedback,  function (err) {
			 if (err) {
				 console.log(err);
				 Materialize.toast(err, 2000);
			} else {
				Materialize.toast("Feedback submitted", 1000);
			}
		});
	});
}

Template.feedback_button.events({
	'click #feedback': function (event, template) {
		MaterializeModal.form({
			title: 'Your feedback is muchly appreciated',
			closeLabel: 'Close',
			submitLabel: 'Submit',
			bodyTemplate: 'feedback_body',
			bottomSheet: true,
			fixedFooter: true,
			callback: (error, rtn) => {
				if (rtn.submit) {
					submitFeedback(rtn.value.feedback);
				}
			}
		});
	},
});
