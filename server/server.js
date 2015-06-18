if (Meteor.isServer) {

    Meteor.startup(function () {
        Meteor.methods({
            'saveCalEvent': function(ce){
                CalEvents.insert(ce);
            },
            'updateTitle': function(id, title) {
                return CalEvents.update({_id:id}, {$set:{
                  title: title,
                }});
            },
            'updateDate': function(id, date) {
                return CalEvents.update({_id:id}, {$set:{
                  start: date,
                  end: date,
                }});
            }
        })
    });
}
