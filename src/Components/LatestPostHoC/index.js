// Page.js

import React from 'react';
import Prismic from 'prismic-javascript'

export default class LatestPostHoC extends React.Component {

  state = {
    UID: null,
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

  goToLatest = () => {
    if (this.state.UID) {
      this.props.history.push('/post/' + this.state.UID)
    }
  }

  fetchPage(props) {
    this.props.prismicCtx.api.query(
      [
        Prismic.Predicates.at('document.type', 'blog_post'),
      ],
      {
        pageSize: 1,
        orderings : '[document.last_publication_date desc]'
      }
    ).then((response) => {
      // console.log(response.results[0])
      this.setState({
        UID: response.results[0].uid
      })
    })
  }

  render() {
    return (
      <span onClick={this.goToLatest}>
        {this.props.children}
      </span>
    )
  }
}