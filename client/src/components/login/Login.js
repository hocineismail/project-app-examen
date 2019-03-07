import React from 'react'

const Login = props => {
  const { id } = props.match.params
  window.localStorage.setItem('_id', id)
  return <div className="login-student" />
}

export default Login