import types from '../types/types'
import fetchInfo from '../fetchInfo'

export function fetchUserData(id) {
  return function(dispatch) {
    fetch(fetchInfo.apiUrl + `/${id}`)
      .then(res => {
        if (res.status === 200 || res.status === 400) {
          return res.json()
        }
      })
      .then(res => {
        let payload = res
        return dispatch({
          type: types.fetchUserData,
          payload
        })
      })
      .catch(err => {
        if (err) {
          console.log('ERROR: ', err)
          return dispatch({
            type: types.fetchUserDataError,
            payload: err
          })
        }
      })
  }
}

export function postUserData(id, userData) {
  return function(dispatch) {
    fetch(fetchInfo.apiUrl + `/student/${id}`, {
      method: 'POST',
      body: userData
    })
      .then(res => res.json())
      .then(res => {
        return dispatch({
          type: types.postUserData,
          payload: true
        })
      })
      .catch(err => {
        if (err){
          return dispatch({
            type: types.postUserDataError,
            payload: err
          })
        }
      })
  }
}
