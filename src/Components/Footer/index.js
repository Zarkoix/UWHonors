// Page.js

import React from 'react'
import './Footer.css'

export default class Footer extends React.Component {


  render() {
    return (
      <div className="footer__container">
        <span className="copyright">Adam Towers &#169; 2019</span>
        <span className="love">Made with&nbsp;
          <span role="img" aria-label="heart">💖</span> using <a href="https://reactjs.org/">ReactJs</a> and <a href="https://prismic.io">Prismic.io</a></span>
      </div>
    )
  }
}