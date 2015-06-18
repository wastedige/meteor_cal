if (Meteor.isServer) {

    Meteor.startup(function () {
        Meteor.methods({
            'saveCalEvent': function(ce){
                CalEvents.insert(ce);
            },
            'updateCalendar': function(id, title) {
                return CalEvents.update({_id:id}, {$set:{
                  title: title
                }});
            }
        })
    });
}
