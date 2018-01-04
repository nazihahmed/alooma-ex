import React, { Component } from 'react';
import NotificationDescription from './components/notification-description';
import Notification from './components/notification';
import {DropdownButton,ButtonToolbar,MenuItem} from 'react-bootstrap';
import axios from 'axios';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state={
        message:"",
        uniqueMessages:[],
        messages:[],
        active:0,
        severityFilter: "",
        notificationTypesFilter: "",
        eventTypesFilter:"",
        eType:""
    };

    // current filters not part of the state
    this.filters = {
      severities:[],
      eventTypes:[],
      notificationTypes:[]
    };
  }

  onActivate(message,id,eType) {
    this.setState({
      active:id,
      message:message,
      eType: eType
    });
    console.log(message);
  }

  renderNotifications() {
    let notifications = [];
    let {severities,eventTypes,notificationTypes} = this.filters;
    let {severityFilter,notificationTypesFilter,eventTypesFilter,uniqueMessages} = this.state;
    this.state.messages.forEach(({severity,state,type,typeDescription,timestamp,id,aggregatedCount,message})=>{
      let eventType = message.match(/(?:type ")([\w\d]*)/gi);
      let eventTypeCheck = /(?:type ")([\w\d]*)/gi.test(message);
      if(eventTypeCheck) {
        eventType = eventType[0].substring(6);
      }

      if(uniqueMessages.indexOf(message)===-1) {
        uniqueMessages.push(message);
      }
      if((severityFilter===severity||severityFilter===''||severityFilter==='All') &&
      (notificationTypesFilter===type||notificationTypesFilter===''||notificationTypesFilter==='All') &&
      ((eventType && eventTypesFilter===eventType)||eventTypesFilter===''||eventTypesFilter==='All')
    ){
        notifications.push(<Notification state={state} severity={severity} eventType={eventTypeCheck?eventType:''} type={type} desc={typeDescription} aggregatedCount={aggregatedCount} onActivate={this.onActivate.bind(this,message,id,eventType)} key={id} id={id} active={this.state.active===id?true:false} time={timestamp}/>);
      }
      if(severities.indexOf(severity)===-1) {
        severities.push(severity);
      }
      if(notificationTypes.indexOf(type)===-1) {
        notificationTypes.push(type);
      }
      if(eventType && eventTypes.indexOf(eventType)===-1) {
        // must be changed
        eventTypes.push(eventType);
      }
    });
    this.filters.severities = severities;
    this.filters.eventTypes = eventTypes;
    this.filters.notificationTypes = notificationTypes;
    return notifications;
  }
  componentDidMount() {
    this.setState({isUpdated:true});
    axios.get('http://localhost:8000/notifications')
    .then((response) => {
      this.setState({
        messages:response.data.messages
      })
    })
    .catch(function (error) {
      console.log(error);
    });
  }
  filterSeverities = (e) => {
    this.setState({
      severityFilter: e.target.innerText
    });
  }
  filterNotificationTypes = (e) => {
    this.setState({
      notificationTypesFilter: e.target.innerText
    });
  }
  filterEventTypes = (e) => {
    this.setState({
      eventTypesFilter: e.target.innerText
    });
  }
  renderButtons(){
    let severitiesDropdown = [];
    let notificationTypesDropdown = [];
    let eventTypesDropdown = [];

    let b = 0;
    severitiesDropdown.push(<MenuItem key={++b} onClick={this.filterSeverities}>All</MenuItem>);
    notificationTypesDropdown.push(<MenuItem key={++b} onClick={this.filterNotificationTypes}>All</MenuItem>);
    eventTypesDropdown.push(<MenuItem key={++b} onClick={this.filterEventTypes}>All</MenuItem>);

    if(this.state.isUpdated) {
      this.filters.severities.forEach((severity,i)=>{
        b++;
         severitiesDropdown.push(<MenuItem key={b+i+1} onClick={this.filterSeverities}>{severity}</MenuItem>);
      });
      this.filters.notificationTypes.forEach((type,i)=>{
        b++;
         notificationTypesDropdown.push(<MenuItem key={b+i+1} onClick={this.filterNotificationTypes}>{type}</MenuItem>);
      });
      this.filters.eventTypes.forEach((type,i)=>{
        b++;
         eventTypesDropdown.push(<MenuItem key={b+i+1} onClick={this.filterEventTypes}>{type}</MenuItem>);
      });
    }
    return (
      <div>
        <DropdownButton id={++b} title="Severity">
          {severitiesDropdown}
        </DropdownButton>
        <DropdownButton id={++b} title="Event Type">
          {eventTypesDropdown}
        </DropdownButton>
        <DropdownButton id={++b} title="Notification Type">
          {notificationTypesDropdown}
        </DropdownButton>
      </div>
    );
  }
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-6">
            <h1>Notifications</h1>
            <ButtonToolbar>{this.renderButtons()}</ButtonToolbar><br/>
            <ul className="list-group">
              {this.renderNotifications()}
            </ul>
          </div>
          <div className="col-sm-6">
            <NotificationDescription message={this.state.message} eType={this.state.eType}/>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
