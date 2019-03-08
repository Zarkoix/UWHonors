// Page.js

import React from 'react';
import './landing.css'
import Footer from '../../Components/Footer/index'
import FeaturedCards from '../../Components/FeaturedCards'
import RecentCards from '../../Components/RecentCards'
import NotFound from '../NotFound'
import LatestPostHoC from '../../Components/LatestPostHoC/index'

export default class LandingPage extends React.Component {

  state = {
    doc: null,
    notFound: false,
  }

  componentWillMount() {
    this.fetchPage(this.props)
  }

  componentWillReceiveProps(props) {
    // this.fetchPage(props)
  }

  componentDidUpdate() {
    this.props.prismicCtx.toolbar()
  }

  fetchPage(props) {
    if (props.prismicCtx) {
      // We are using the function to get a document by its uid
      return props.prismicCtx.api.getByUID('blog_post', props.match.params.uid, {}, (err, doc) => {
        if (doc) {
          // We put the retrieved content in the state as a doc variable
          console.log(doc)
          this.setState({ doc })
        } else {
          // We changed the state to display error not found if no matched doc
          this.setState({ notFound: !doc })
        }
      })
    }
    return null;
  }

  render() {
    if (!this.props.prismicCtx) return NotFound // TODO debug why this line needs to exist
    return(<div className="page">
      <div className="hero">
        <div className="text">
          <h1>Adam Towers</h1>
          <h2>Honors Portfolio</h2>
        </div>
      </div>
      <div className="menubar">
        <ul>
          <li><a href="https://adamtowers.io/projects">Projects</a></li>
          <li><a href="https://adamtowers.io">Resume</a></li>
          <li>
            <LatestPostHoC
              children={
                <span style={{
                  cursor: 'pointer'
                }}>Latest Post</span>
              }
              history={this.props.history}
              prismicCtx={this.props.prismicCtx}
            /></li>
        </ul>
      </div>
      <div className="content">
        <div className="blog__content">
          <h2>Featured Posts</h2>
          <FeaturedCards history={this.props.history} prismicCtx={this.props.prismicCtx}/>
        </div>
        <div className="blog__content">
          <h2>Recent Posts</h2>
          <RecentCards history={this.props.history} prismicCtx={this.props.prismicCtx}/>
        </div>
      </div>
      <Footer/>
    </div>)
  }
}