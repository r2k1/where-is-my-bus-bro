LiveMap = React.createClass({
  mixins: [ReactMeteorData],
  getMeteorData() {
    Meteor.subscribe('vehicles');
    return {
      vehicles: Vehicles.find({})
    };
  },

  componentDidMount() {
    var map = this.map = L.map(ReactDOM.findDOMNode(this),{
      center: [-36.8511764,174.7721285],
      zoom: 17,
      layers: [
        L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png')
      ]
    });
    markers = {};
    this.data.vehicles.observe({
      added(vehicle) {
        console.log('added');
        var marker = L.circle([vehicle.lat, vehicle.lon], 5, {
          color: 'red',
          fillColor: '#f03',
          fillOpacity: 0.5
        }).addTo(map);
        markers[vehicle.id] = marker;
      },
      removed(vehicle) {
        console.log('removed');
        var marker = markers[vehicle._id];
        map.removeLayer(marker);
      }

    });
  },

  render() {
    return (
      <div className="live-map"></div>
    );
  }
});
