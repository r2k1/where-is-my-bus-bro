// App component - represents the whole app
App = React.createClass({
  render() {
    return (
      <div className="container">
        <header>
          <h1>Where is my bus, bro?</h1>
        </header>
        <LiveMap />
      </div>
    );
  }
});
