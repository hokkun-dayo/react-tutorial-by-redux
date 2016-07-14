import request from 'superagent'

// network
export const LOAD_COMMENT_START = "LOAD_COMMENT_START"
export const LOAD_COMMENT_SUCCESS = "LOAD_COMMENT_SUCCESS"

export const SUBMIT_COMMENT_START = "SUBMIT_COMMENT_START"
export const SUBMIT_COMMENT_SUCCESS = "SUBMIT_COMMENT_SUCCESS"


// TODO: Add failure case


const url = "/api/comments"

export const submitComment = (comment) => {
  return function(dispatch) {
    console.log(comment)
    dispatch(submitCommentStart())
    // return request.post(url, comment, (err, res) => {
    //       if (err || !res.ok) {
    //         console.log("Server cannot be connected")
    //       } else {
    //         console.log("Added.")
    //         dispatch(submitCommentSuccess(comment))
    //       }
    //     })
    return request.post(url)
        .set('Content-Type', 'application/json')
        .send(comment)
        .set('Accept', 'application/json')
        .end((err, res) => {
          if (err || !res.ok) {
            console.log("Server cannot be connected")
          } else {
            console.log("Added.")
            dispatch(submitCommentSuccess(comment))
          }
        })
  }
}

export const loadComments = () => {
  return function (dispatch) {
    dispatch(loadCommentStart())

    return request.get(url)
        .set('Accept', 'application/json')
        .end((err, res) => {
          if (err || !res.ok) {
            console.log("Server cannot be connected")
          } else {
            console.log("OK, Loaded.")
            dispatch(loadCommentSuccess(res.body))
          }
        })
  }
}

export function loadCommentStart() {
  return {
    type: LOAD_COMMENT_START
  }
}  

export function loadCommentSuccess(json) {
  return {
    type: LOAD_COMMENT_SUCCESS,
    comments: json
  }
}

export function submitCommentStart() {
  return {
    type: SUBMIT_COMMENT_START
  }
}


export function submitCommentSuccess(comment) {
  return {
    type: SUBMIT_COMMENT_SUCCESS,
    comment: comment
  }
}
