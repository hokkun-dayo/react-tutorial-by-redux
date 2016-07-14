import React, { propTypes } from 'react'
import { submitComment } from '../actions/actions'

export default class CommentForm extends React.Component {
  render() {
    let author
    let text

    return (<form className="commentForm" onSubmit={e => {
              e.preventDefault()
              if (!author.value.trim()) {
                return
              }
              const newComment = {
                author: author.value,
                text: text.value
              }
              this.props.dispatch(submitComment(newComment))
              author.value = ''
              text.value = ''
            }}>
                <input
                    type="text"
                    placeholder="Your name"
                    ref={node => {
                       author = node
                    }}
                />
                <input
                    type="text"
                    placeholder="Say something..."
                    ref={node => {
                      text = node
                    }}
                />
                <input type="submit" value="Post" />
              </form>
    )
  }
}



