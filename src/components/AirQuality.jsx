import React, { Component } from 'react';

class AirQuality extends Component {
  state = {
    city: '',
    aqi: '',
    isLoading: true,
    error: null,
  };

  componentDidMount() {
    fetch(`https://api.openaq.org/v1/latest?city=${'London'}`)
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

  // In this code, shouldComponentUpdate is being used to compare the current props and state of the component with the next props and state. If there are any differences between them, the method will return true which means that the component should re-render. If there are no differences, the method will return false, which means that the component should not re-render.

  shouldComponentUpdate(nextProps, nextState) {
    return (
      this.props.city !== nextProps.city ||
      this.state.city !== nextState.city ||
      this.state.aqi !== nextState.aqi ||
      this.state.isLoading !== nextState.isLoading ||
      this.state.error !== nextState.error
    );
  }

  render() {
    const { city, aqi, isLoading, error } = this.state;

    if (isLoading) {
      return <div>Loading...</div>;
    }

    if (error) {
      return <div>{error.message}</div>;
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
