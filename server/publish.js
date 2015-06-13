Meteor.publish('calCollection', function () {
           return CalEvents.find();
           });
