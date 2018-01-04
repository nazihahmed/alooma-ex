import React, { Component } from 'react';
import axios from 'axios';

class NotificationDescription extends Component {
  constructor(props) {
    super(props);
    this.state = {
      samples:[]
    };
  }
  componentWillReceiveProps (nextProps) {
    // this is called once
    if(this.props.eType && nextProps.eType !== this.props.eType) {
      console.log(this.props.eType);
      axios.get('http://localhost:8000/samples?eventType='+this.props.eType)
      .then((response) => {
        console.log('sample')
        this.setState({
          samples:response.data
        })
      })
      .catch((error) => {
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
