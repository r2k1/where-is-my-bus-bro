var iconHtml = `
<div class="bus-marker__container">
  <span class='bus-marker__icon fa-stack fa-lg'>
    <i class='fa fa-circle fa-stack-2x'></i>
    <i class='fa fa-bus fa-stack-1x fa-inverse'></i>
  </span>
  <span class="bus-marker__number">123</span>
</div>
`;

var busIcon = L.divIcon({className: 'bus-marker', html: iconHtml});

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
    var markers = {};
    this.data.vehicles.observe({
      added(vehicle) {
        var marker = L.marker([vehicle.lat, vehicle.lon], {icon: busIcon}).addTo(map);
        markers[vehicle._id] = marker;
      },
      removed(vehicle) {
        var marker = markers[vehicle._id];
        map.removeLayer(marker);
      },
      changed(vehicle) {
        var marker = markers[vehicle._id];
        marker.setLatLng([vehicle.lat, vehicle.lon]);
      }

    });
  },

  render() {
    return (
      <div className="live-map"></div>
    );
  }
});
