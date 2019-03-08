// Page.js

import React from 'react';
import './PostCard.css'

export default class PostCard extends React.Component {

  redirect = () =>  {
    this.props.history.push('/post/' + this.props.UID)
  }

  render() {
    return (
      <div className="post__card" onClick={this.redirect}>
        <div className="titleRow">
          <span className="title">{this.props.title}</span>
          <span className="date">{this.props.date}</span>
        </div>
        <div className="subtitle">{this.props.subtitle}</div>
      </div>
    )
  }

}