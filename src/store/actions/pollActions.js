export const createPoll = (task, username) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    // async code to firebase here
    const firestore = getFirestore()
    firestore.collection('polls').add({
      task,
      creator: username,
      createdAt: new Date(),
      data: [
        { name: '0', value: 0 },
        { name: '1/2', value: 0 },
        { name: '1', value: 0 },
        { name: '2', value: 0 },
        { name: '3', value: 0 },
        { name: '4', value: 0 },
        { name: '5', value: 0 },
        { name: '8', value: 0 },
        { name: '13', value: 0 },
        { name: '20', value: 0 },
        { name: '40', value: 0 },
        { name: '100', value: 0 }
      ]
    })
      .then(() => {
        dispatch({ type: 'CREATE_POLL', task })
      })
      .catch((err) => {
        dispatch({ type: 'CREATE_POLL_ERROR', err})
      })

  }
}

export const votePoll = (pollId, newData, newUserVotes, uid) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    // async code to firebase here
    const firestore = getFirestore()
    const pollRef = firestore.collection('polls').doc(pollId)
    const userRef = firestore.collection('users').doc(uid)


    pollRef.update({
      data: newData
    })
      .then(() => {
        return userRef.update({
          votes: newUserVotes
        })
      })
      .then(() => {
        dispatch({ type: 'POLL_VOTE_SUCCESS' })
      })
      .catch((err) => {
        dispatch({ type: 'POLL_VOTE_ERROR', err})
      })

  }
}
