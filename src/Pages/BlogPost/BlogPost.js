// BlogPost.js

import React from 'react';
import NotFound from '../NotFound';
import { RichText } from 'prismic-reactjs';
import './blogPost.css'
import Sidecard from './Components/Sidecard'
import FeaturedCards from '../../Components/FeaturedCards'
import { normalizeDate } from '../../Helpers'
import RecentCards from '../../Components/RecentCards/index'
import Footer from '../../Components/Footer/index'
import LatestPostHoC from '../../Components/LatestPostHoC/index'

export default class BlogPost extends React.Component {

  state = {
    doc: null,
    notFound: false,
  }

  componentWillMount() {
    this.fetchPage(this.props)
  }

  componentWillReceiveProps(props) {
    this.fetchPage(props)
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
    if (!this.state.doc) {
      return (<NotFound />)
    } else {
      return (
        <div className="blog__page">
          <div className="appbar">
            <a href="/" className="logo">Adam Towers</a>
            <ul>
              <li><a href="/">Home</a></li>
              <li><a href="https://adamtowers.io">About</a></li>
              <li><LatestPostHoC
                children={
                  <span style={{
                    cursor: 'pointer'
                  }}>Most Recent</span>
                }
                history={this.props.history}
                prismicCtx={this.props.prismicCtx}
              /></li>
            </ul>
          </div>
          <div className="main">
            <div className="post">
              <div className="header">
                <span className="title">{this.state.doc.data.post_title[0].text}</span>
                <span className="date">{normalizeDate(this.state.doc.data.timestamp)}</span>
              </div>
              <div className="content">
                {RichText.render(this.state.doc.data.post_text, this.props.prismicCtx.linkResolver)}
              </div>
            </div>
            <div className="sidebar">
              <Sidecard title="Featured Posts" children={
                <FeaturedCards history={this.props.history} prismicCtx={this.props.prismicCtx}/>
              } />
              <Sidecard title="Recent Posts" children={
                <RecentCards history={this.props.history} prismicCtx={this.props.prismicCtx}/>
              } />
            </div>
          </div>
          <Footer />
        </div>
      )
    }
  }
}

