import React from 'react';
import TimeAgo from 'react-timeago';

const Notification = () => {
    let {state,severity,type,desc,active,onActivate,id,aggregatedCount,time,eventType} = this.props;
    return (
      <li className={"list-group-item " + (active?'active':'')} id={id} onClick={onActivate}>
        {desc}<span className={"badge-pill badge-" + severity + " badge"}>{aggregatedCount}</span><br/>
        <TimeAgo date={time} /> {eventType?"| event type: "+eventType:''}
      </li>
    );
}

export default Notification;
