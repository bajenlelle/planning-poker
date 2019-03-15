export const signIn = (username) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase()
    const firestore = getFirestore()


    // Hardcoding password and appending domain to username
    const password = 'hammarby'
    const email = username + '@gmail.com'

    firebase.auth().signInWithEmailAndPassword(
      email,
      password
    )
      .then(() => {
        dispatch({ type: 'LOGIN_SUCCESS' })
      })
      .catch((err) => {
        if (err.code === 'auth/user-not-found'){
          firebase.auth().createUserWithEmailAndPassword(
            email,
            password
          ).then((resp) => {
            return firestore.collection('users').doc(resp.user.uid).set({
              votes: []
            })
          }).then(() => {
            dispatch({ type: 'SIGNUP_SUCCESS' })
          })
          .catch((err) => {
            dispatch({ type: 'SIGNUP_ERROR', err })
          })
        } else {
          dispatch({ type: 'LOGIN_ERROR', err })
        }
      })
  }
}

export const signOut = () => {
  return (dispatch, state, { getFirebase }) => {
    const firebase = getFirebase()

    firebase.auth().signOut()
      .then(() => {
        dispatch({ type: 'SIGNOUT_SUCCESS' })
      })
  }
}
// 
// export const signUp = (username) => {
//   return (dispatch, getState, { getFirebase, getFirestore }) => {
//     const firebase = getFirebase()
//     const firestore = getFirestore()
//     // Hardcoding password and appending domain to username
//     const password = 'hammarby'
//     const email = username + '@gmail.com'
//     firebase.auth().createUserWithEmailAndPassword(
//       email,
//       password
//     ).then((resp) => {
//       return firestore.collection('users').doc(resp.user.uid).set({
//         votes: []
//       })
//     }).then(() => {
//
//       dispatch({ type: 'SIGNUP_SUCCESS' })
//     })
//     .catch((err) => {
//       dispatch({ type: 'SIGNUP_ERROR', err })
//     })
//
//   }
// }
