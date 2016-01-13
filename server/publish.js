Meteor.publish('vehicles', function() {
  return Vehicles.find();
});
