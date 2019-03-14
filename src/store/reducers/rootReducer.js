import authReducer from './authReducer'
import pollReducer from './pollReducer'
import { combineReducers } from 'redux'
import { firestoreReducer } from 'redux-firestore'
import { firebaseReducer } from 'react-redux-firebase'

const rootReducer = combineReducers({
  auth: authReducer,
  poll: pollReducer,
  firestore: firestoreReducer,
  firebase: firebaseReducer
})

export default rootReducer
