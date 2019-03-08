// Page.js

import React from 'react';
import './Sidecard.css'

export default class Sidecard extends React.Component {
  render() {
    return (
      <div className="card" style={this.props.styles}>
        <div className="header">
          <span className="title">{this.props.title}</span>
          <span className="subtitle">{this.props.subtitle}</span>
        </div>
        <div className="content">
          {this.props.children}
        </div>
      </div>
    )
  }

}