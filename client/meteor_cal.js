//Session only works on the client

//CalEvents = new Mongo.Collection("z3");
// to be used later to handle editing



if (Meteor.isClient) {
    Meteor.subscribe('calCollection');

    Router.route('/', function () {
        this.render('home');
    });

    Router.route('/calendar', function () {
        this.render('calendar');
    });

    Session.setDefault('editing_event', null);

    Template.main.helpers({
      editing_event: function(){
        return Session.get('editing_event');
      }
    });
    Template.dialog.events({
      'click .closeDialog': function(event, template){
        Session.set('editing_event', null);
      },
      'click .saveDialog': function(event, template){

        var title = template.find("#title").value;
        //alert(title);
        Meteor.call('updateTitle', Session.get('editing_event'), title);
        Session.set('editing_event', null);
      }
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
                calendarEvent.owner = Meteor.userId(); //does it work?
                Meteor.call('saveCalEvent', calendarEvent );
                //CalEvents.insert(calendarEvent);
                //updateCalendar();
                //alert(CalEvents.find().count())
            },
            eventClick: function (calEvent, jsEvent, view) {
                Session.set('editing_event', calEvent._id);
            },
            eventDrop: function(event) {
                Meteor.call('updateDate', event._id, event.start);
            },
            events: function (start, end, callback) {
                calEvents = CalEvents.find().fetch();
                callback(calEvents);

            },
            editable: true,
            selectable: true
        }).data().fullCalendar;

        Deps.autorun(function(){
          CalEvents.find().fetch();
          if (cal) {
            cal.refetchEvents();
          }
        })
    }

}

// Deps already takes care of this:
//var updateCalendar = function(){
//	$('#calendar').fullCalendar( 'refetchEvents' );
//}
