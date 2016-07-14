import React, { propTypes } from 'react'
import Remarkable from 'remarkable'

const Comment = (props) => {
  const rawMarkup = () => {
    const md = new Remarkable()
    const rawMarkup = md.render(props.children)
    return { __html: rawMarkup }
  }

  return (<div className="comment">
    <h2 className="commentAuthor">
      {props.author}
    </h2>
    <span dangerouslySetInnerHTML={rawMarkup()} />    
  </div>
  )
}

export default Comment
