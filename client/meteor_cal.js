//Session only works on the client

CalEvents = new Mongo.Collection("z3");
// to be used later to handle editing


if (Meteor.isClient) {
    Session.setDefault("event2edit", null);
    Session.setDefault("showEditWindow", false);
    Session.setDefault("lastMod", null);
    Router.route('/', function () {
        this.render('home');
    });

    Router.route('/calendar', function () {
        this.render('calendar');
    });

    // runs when page has been rendered
    Template.calendar.rendered = function () {
        var cal = $('#calendar').fullCalendar({
            // http://fullcalendar.io/docs/usage/

            dayClick: function(date, allDay, jsEvent, view){
                var calendarEvent = {};
                calendarEvent.start = date;
                calendarEvent.end = date;
                calendarEvent.title = "New !";
                //Meteor.call('saveCalEvent', calendarEvent );
                CalEvents.insert(calendarEvent);
                updateCalendar();
                alert(CalEvents.find().count())
            },
            eventClick: function (calEvent, jsEvent, view) {

            },
            events: function (start, end, callback) {
                calEvents = CalEvents.find().fetch();
                callback(calEvents);

            }
        });
    }

    Template.calendar.lastMod = function () {
        return Session.get('lastMod');
    }
}

var updateCalendar = function(){
	$('#calendar').fullCalendar( 'refetchEvents' );
}

if (Meteor.isServer) {

    Meteor.startup(function () {
        Meteor.methods({
            'saveCalEvent': function(ce){
                CalEvents.insert(ce);

            }
        })
    });
}
