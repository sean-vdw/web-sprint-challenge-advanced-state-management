import axios from 'axios';

export const FETCH_START = "FETCH_START";
export const FETCH_FAIL = "FETCH_FAIL";
export const FETCH_SUCCESS = "FETCH_SUCCESS";
export const ADD_SMURF = "ADD_SMURF";

export const fetchSmurfs = () => {
  return({type: FETCH_START});
}

export const fetchFail = (error) => {
  return({type: FETCH_FAIL, payload: error});
}

export const fetchSuccess = (smurf) => {
  return({type: FETCH_SUCCESS, payload: smurf});
}

export const addSmurf = (newSmurf) => {
  return({type: ADD_SMURF, payload: newSmurf});
}

export const getSmurf = () => (dispatch) => {
  dispatch(fetchSmurfs());
  axios.get('http://localhost:3333/smurfs')
    .then(resp => {
      console.log("AXIOS GET ---", resp.data);
      dispatch(fetchSuccess(resp.data));
    })
    .catch(err => {
      console.log(err);
      dispatch(fetchFail(err));
    })
}

export const getAddSmurf = (newSmurf) => (dispatch) => {
  dispatch(addSmurf(newSmurf));
  axios.post('http://localhost:3333/smurfs')
    .then(resp => {
      dispatch(fetchSmurfs(resp));
    })
    .catch(err => {
      dispatch(fetchFail(err));
    })
}

//Task List:
//1. Add a thunk action called fetchSmurfs that triggers a loading status display in our application, performs an axios call to retreive smurfs from our server, saves the result of that call to our state and shows an error if one is made.
//2. Add a standard action that allows us to add new smurf (including the name, nickname, position, summary)
//3. Add a standard action that allows us to set the value of the error message slice of state.