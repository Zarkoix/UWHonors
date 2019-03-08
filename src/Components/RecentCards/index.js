// Page.js

import React from 'react'
import Prismic from 'prismic-javascript'
import PostCard from '../PostCard'
import { normalizeDate } from '../../Helpers'
import './RecentCards.css'

export default class RecentCards extends React.Component {

  state = {
    posts: null,
    notFound: false,
  }

  componentWillMount() {
    this.props.prismicCtx.api.query(
      [
        Prismic.Predicates.at('document.type', 'blog_post'),
      ],
      {
        orderings : '[document.last_publication_date desc]'
      }
    ).then((response) => {
      this.setState({
        posts: response.results
      })
    })
  }

  componentWillReceiveProps(props) {
    // this.fetchPage(props)
  }

  componentDidUpdate() {

  }

  render() {
    return (
      <div className="featured__container">
        {this.state.posts && this.state.posts.map((post, i) => (
          <PostCard
            title={post.data.post_title[0].text}
            date={normalizeDate(post.data.timestamp)}
            subtitle={post.data.subtitle}
            UID={post.uid}
            history={this.props.history}
            key={i}
          />
        ))}
      </div>
    )
  }
}