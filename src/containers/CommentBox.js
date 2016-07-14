import React from 'react'
import { connect } from 'react-redux'
import CommentList from '../components/CommentList'
import CommentForm from '../components/CommentForm'
import * as actions from '../actions/actions'

class CommentBox extends React.Component {
  componentDidMount() {
    const { dispatch } = this.props
    dispatch(actions.loadComments())
    setInterval( () => dispatch(actions.loadComments()), 10000)
  }

  render() {
    return (
      <div className="commentBox">
        <h1> Comments </h1>
        <CommentList data={this.props.data}/>
        <CommentForm dispatch={this.props.dispatch}/>
      </div>
    )
  }
}

CommentBox.propTypes = {
  data: React.PropTypes.array.isRequired,
  isLoading: React.PropTypes.bool.isRequired,
  isSubmitting: React.PropTypes.bool.isRequired,
  dispatch: React.PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
  return {
    isLoading: state.commentReducer.isLoading,
    isSubmitting: state.commentReducer.isSubmitting,
    data: state.commentReducer.data
  }
}

export default connect(
  mapStateToProps
)(CommentBox)
