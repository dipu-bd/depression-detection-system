// Schema for Statistics

import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const StatsSchema = new SimpleSchema({
    name: {
        type: String,
        label: "Full Name",
    },
    email: {
        type: String,
        regEx: SimpleSchema.RegEx.Email,
        label: "E-mail",
    },
    dob: {
        type: Date,
        label: "Date of Birth",
        autoform: {
            type:"pickadate"
        },
    },
    gender: {
        type: String,
        allowedValues: ['male', 'female', 'other'],
        autoform: {
            options: [
                {label: "Male", value: "male"},
                {label: "Female", value: "female"},
                {label: "Other", value: "other"}
            ]
        },
    },
    choice: {
        type: Object,
        blackbox: true,
    },
    completed: {
        type: Boolean,
        defaultValue: false,
    }, 

     // auto-managed properties
    createdAt: {
        type: Date,
        autoValue: function() {
        if (this.isInsert) {
            return new Date();
        } else if (this.isUpsert) {
            return {$setOnInsert: new Date()};
        } else {
            this.unset();  // Prevent user from supplying their own value
        }
        },
    },
    updatedAt: {
        type: Date,
        autoValue: function() {
        if (this.isUpdate) {
            return new Date();
        }
        },
        denyInsert: true,
        optional: true,
    },
});