//Session only works on the client

CalEvents = new Mongo.Collection("calevents");
// to be used later to handle editing
Session.setDefault("event2edit", null);
Session.setDefault("showEditWindow", false);



if (Meteor.isClient) {

}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}

// runs when page has been rendered
Template.calendar.rendered = function(){
  $('#calendar').fullCalendar({
    // http://fullcalendar.io/docs/usage/
    events: [
         {
             title  : 'event1',
             start  : '2015-05-01'
         }]
  });
}

Router.route('/', function () {
  this.render('home');
});

Router.route('/calendar', function () {
  this.render('calendar');
});
