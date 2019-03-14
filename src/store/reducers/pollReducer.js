const initState = {}

const pollReducer = (state = initState, action) => {
  switch (action.type) {
    case 'CREATE_POLL':
      return state
    case 'CREATE_POLL_ERROR':
      return state
    case 'POLL_VOTE_SUCCESS':
      return state
    case 'POLL_VOTE_ERROR':
      return state
    default:
      return state
  }
}

export default pollReducer
