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
            type: "pickadate",
            pickadateOptions: {
                selectMonths: true,
                selectYears: 100,
                closeOnSelect: true,
            }
        }
    },
    gender: {
        type: String,
        allowedValues: ['male', 'female', 'other'],
        autoform: {
            options: [
                { label: "Male", value: "male" },
                { label: "Female", value: "female" },
                { label: "Other", value: "other" }
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
        autoValue() {
            if (this.isInsert) {
                return new Date();
            }
            if (this.isUpsert) {
                return { $setOnInsert: new Date() };
            }
            // Otherwise prevent user from supplying their own value
            this.unset();
        },
    },
    updatedAt: {
        type: Date,
        autoValue() {
            if (this.isUpdate) {
                return new Date();
            }
        },
        denyInsert: true,
        optional: true,
    },
});