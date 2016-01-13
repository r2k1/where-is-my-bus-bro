// App component - represents the whole app
App = React.createClass({
  render() {
    return (
      <div className="container">
        <header>
          <h1>Timetable</h1>
        </header>
        <StopTimetable />
      </div>
    );
  }
});
