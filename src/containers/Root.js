import React from 'react'
import { Provider } from 'react-redux'
import configuredStore from '../store/configuredStore'
import CommentBox from '../containers/CommentBox'

const store = configuredStore()

export default class Root extends React.Component {
  render () {
    return (
      <Provider store={store}>
        <div>
          <CommentBox />
        </div>
      </Provider>
    )
  }
}