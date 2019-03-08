import React from 'react'

const Login = ({match}) => {
  window.localStorage.setItem('_id', match.params.id)
  window.location.href = '/studenthome'
  return true
}

export default Login