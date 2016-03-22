Meteor.publish('vehicles', function() {
  return Vehicles.find({}, {limit: 10});
});
