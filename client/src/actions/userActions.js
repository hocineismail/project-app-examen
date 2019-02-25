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
          return dispatch({
            type: types.fetchUserDataError,
            payload: err
          })
        }
      })
  }
}

export function postUserData(id, userData) {
  let body = JSON.stringify(userData)
  return function(dispatch) {
    fetch(fetchInfo.apiUrl + `/${id}`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body
    })
      .then(res => res.json())
      .then(res => {
        return dispatch({
          type: types.postUserData,
          payload: true
        })
      })
      .catch(err => {
        if (err) {
          return dispatch({
            type: types.postUserDataError,
            payload: err
          })
        }
      })
  }
}

export function getStudentModules(id) {
  return function(dispatch) {
    fetch(fetchInfo.apiUrl + '/modules/' + id)
      .then(res => {
        return res.json()
      })
      .then(res => {
        let payload = res
        return dispatch({
          type: types.fetchStudentModules,
          payload
        })
      })
      .catch(err => {
        if (err) {
          return dispatch({
            type: types.fetchStudentModulesError,
            payload: err
          })
        }
      })
  }
}

export function getStudentExams(id) {
  return function(dispatch) {
    fetch(`${fetchInfo.apiUrl}/exams/${id}`)
      .then(res => res.json())
      .then(res => {
        return dispatch({
          type: types.fetchStudentExams,
          payload: res
        })
      })
      .catch(err => {
        return dispatch({
          type: types.fetchStudentExamsError,
          payload: err
        })
      })
  }
}

export function getExamInformation(id) {
  return function(dispatch) {
    fetch(`${fetchInfo.apiUrl}/exam/${id}`)
      .then(res => res.json())
      .then(res => {
        return dispatch({
          type: types.fetchExamInformation,
          payload: res
        })
      })
      .catch(err => {
        if (err) {
          return dispatch({
            type: types.fetchExamInformationError,
            payload: err
          })
        }
      })
  }
}

export function getExamQuestions(id) {
  return function(dispatch) {
    fetch(`${fetchInfo.apiUrl}/examquestions/${id}`)
      .then(res => res.json())
      .then(res => {
        return dispatch({
          type: types.fetchExamQuestions,
          payload: res
        })
      })
      .catch(err => {
        if (err) {
          dispatch({
            type: types.fetchExamQuestionsError,
            payload: err
          })
        }
      })
  }
}

export function postExamGrade(id, body) {
  return function(dispatch) {
    fetch(`${fetchInfo.apiUrl}/exam/getresult/${id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    })
      .then(res => res.json())
      .then(res => {
        return dispatch({
          type: types.postExamGrade,
          payload: res
        })
      })
      .catch(err => {
        if (err) {
          return dispatch({
            type: types.postExamGradeError,
            payload: err
          })
        }
      })
  }
}

export function deleteGradeInformation(){
  return {
    type: types.deleteGradeInformation
  }
}