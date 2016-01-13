Meteor.publish('timetable', function() {
  return Timetable.find();
});
