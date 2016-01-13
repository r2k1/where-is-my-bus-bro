StopTimetable = React.createClass({
  mixins: [ReactMeteorData],
  getMeteorData() {
    Meteor.subscribe('timetable');
    return {
      timetable: Timetable.find({}).fetch()
    };
  },

  formatDate(date) {
    let NZTime = new Date(date);
    NZTime.setHours(date.getHours() + 13);
    return NZTime.toISOString().slice(11,16);
  },

  renderDataRows() {
    return this.data.timetable.map(row => {
      return (
        <tr key={row._id}>
          <td>{row.stopCode}</td>
          <td>{row.destination}</td>
          <td>{row.scheduledArrivalTime.toISOString()}</td>
          <td>{this.formatDate(row.scheduledArrivalTime)}</td>
          <td>{row.routeShortName}</td>
        </tr>
      );
    });
  },
  render() {
    return (
      <table>
        <thead></thead>
        <tbody>{this.renderDataRows()}</tbody>
      </table>
    );
  }
});
