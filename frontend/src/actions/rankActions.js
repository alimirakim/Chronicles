// ACTIONS
export const GET_RANKS = "GET_RANKS"
export const ADD_RANK = "ADD_RANK"
export const UPDATE_RANK = "UPDATE_RANK"
export const DELETE_RANK = "DELETE_RANK"


// ACTION CREATORS
export const getRanks = (ranks) => ({ type: GET_RANKS, ranks })
export const addRank = (rank) => ({ type: ADD_RANK, rank })
export const updateRank = (rank) => ({ type: UPDATE_RANK, rank })
export const deleteRank = (rank) => ({ type: DELETE_RANK, rank })