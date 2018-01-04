import React, { Component } from 'react';
import axios from 'axios';

class NotificationDescription extends Component {
  constructor(props) {
    super(props);
    this.state = {
      samples:[]
    };
  }
  componentWillReceiveProps(nextProps) {
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
    return this.state.samples.map((sample)=> {
      return(<pre>{JSON.stringify(sample, null, 2) }</pre>);
    });
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

NotificationDescription.propTypes = {
  // name: PropTypes.string
};

export default NotificationDescription;
