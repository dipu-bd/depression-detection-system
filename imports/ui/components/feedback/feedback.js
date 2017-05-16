import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import './feedback.html';

function submitFeedback(feedback) {
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
			callback: (error, rtn) => {
				if (rtn.submit) {
					console.log("Form data", rtn.value);
					submitFeedback(rtn.vlaue);
				}
			}
		});
	},
});
