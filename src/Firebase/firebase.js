import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

// Config for firebase

var config = {
  apiKey: "AIzaSyAwCE6YPmjiYz1S3Mntxk-wZ_OGsmUWWTE",
  authDomain: "planner-app-c96bd.firebaseapp.com",
  databaseURL: "https://planner-app-c96bd.firebaseio.com",
  projectId: "planner-app-c96bd",
  storageBucket: "planner-app-c96bd.appspot.com",
  messagingSenderId: "609669651739"
}

firebase.initializeApp(config)
firebase.firestore().settings({ });

export default firebase
