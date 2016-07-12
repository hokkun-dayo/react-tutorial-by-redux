// node.js modules
import { createStore } from 'redux'
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider, connect } from 'react-redux'
import request from 'superagent'


/*
  Const
  */
const url = "/api/comments" 

/*
 React components (presentational component)
 */
class CommentBox extends React.Component {
  constructor(props) {
    props = {data:[]}
  }

  componentDidMount() {
    console.log("OK")
    this.props.handleCommentLoad()
    setInterval(this.props.handleCommentLoad(), 2000)
  }

  

  render() {
    console.log(this.props)
    return (
      <div className="commentBox">
        <h1> Comments </h1>
        <CommentList data={this.props.data}/>
        <CommentForm onCommentSubmit={this.props.handleCommentSubmit} />
      </div>
    )
  }
}


class CommentList extends React.Component {
  render() {
    var commentNodes = this.props.data.map((comment) => {
      return (
        <Comment author={comment.author} key={comment.id}>
          {comment.text}
        </Comment>
      );
    })

    return (
      <div className="commentList">
        {commentNodes}
      </div>
    )
  }
}

const CommentForm = (props) => {
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
    props.onCommentSubmit(newComment)
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
  </form>)
}

const Comment = (props) => {
  const rawMarkup = () => {
    const md = new Remarkable()
    const rawMarkup = md.render(props.children.toString())
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

/*
 *  container components
 */

const mapStateToProps = (state) => {
  return {
    data: state.data
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleCommentSubmit: (comment) => {
      dispatch(submitComment(comment))
    },

    handleCommentLoad: () => {
      dispatch(loadComment())
    }
  }
}

const ContainerCommentBox = connect(
  mapStateToProps,
  mapDispatchToProps
)(CommentBox)

// ActionCreator
const submitComment = (comment) => {
  request.post(url)
         .send(comment)
         .end((err, res) => {
           if (err || !res.ok) {
             console.log("Server cannot be connected")
           } else {
             console.log("Added.")
           }
         })
  return {
    type: "SUBMIT_COMMENT",
  }
}

const loadComment = () => {
  console.log("loadComment Action start...")
  let data
  request.get(url)
         .set('Accept', 'application/json')
         .end((err, res) => {
           if (err || !res.ok) {
             console.log("Server cannot be connected")
           } else {
             console.log("OK, Loaded.")
             data = res.body
           }
         })
  return {
    type: "LOAD_COMMENT",
    data: data
  }
}

// reducer
const reducer = (state = {}, action) => {
  let newState

  switch (action.type) {
    case "SUBMIT_COMMENT":
      newState = state
    case "LOAD_COMMENT":
      newState = {
        data: action.data
      }
    default: 
      newState = state
  }
  return newState
}

// Store
const store = createStore(reducer)

ReactDOM.render(
  <Provider store={store}>
    <div>
      <ContainerCommentBox />
    </div>
  </Provider>,
  document.getElementById('content') 
)


