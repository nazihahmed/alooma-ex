import React, { Component } from 'react';
import axios from 'axios';

class NotificationDescription extends Component {
  constructor(props) {
    super(props);
    this.state = {
      samples:[]
    };
  }
  componentDidMount() {
    console.log('description mounted');
    // fire off event listeners and requests
    let that = this;
    if(this.props.eType) {
      console.log(this.props.eType);
      axios.get('http://localhost:8000/samples?eventType='+this.props.eType)
      .then(function (response) {
        console.log('sample')
        that.setState({
          samples:response.data
        })
      })
      .catch(function (error) {
        console.log(error);
      });
    }
  }
  renderSamples() {
    let sample = [];
    this.state.samples.map((sample)=> {
      sample.push(<pre>{JSON.stringify(sample, null, 2) }</pre>)
    });
    return sample;
  }
  render() {
    return (
      <div>
        <p>Description</p>
        <pre>{this.props.message}</pre>
        {this.renderSamples()}
      </div>
    );
  }
}

export default NotificationDescription;
