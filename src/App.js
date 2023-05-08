import React, { PureComponent } from 'react';

class AirQuality extends PureComponent {
  // make a `state` object here of city, aqi, isLoading and error
  state = {
    city: '',
    aqi: '',
    isLoading: true,
    error: null,
  };

  // make a componentDidMount to fetch()
  componentDidMount() {
    // Don't about fetch now, we will discussed this in the next lessons
    fetch(`https://api.openaq.org/v1/latest?city=${'Manila'}`)
      .then(response => response.json())
      .then(data => {
        this.setState({
          city: data.results[0].city,
          aqi: data.results[0].measurements[0].value,
          isLoading: false,
        });
      })
      .catch(error => {
        this.setState({
          error,
          isLoading: false,
        });
      });
  }

  render() {
    const { city, aqi, isLoading } = this.state;

    if (isLoading) {
      return <div>Loading...</div>;
    }

    return (
      <div>
        <h2>{city}</h2>
        <p>Air Quality Index (AQI): {aqi}</p>
      </div>
    );
  }
}

export default AirQuality;
