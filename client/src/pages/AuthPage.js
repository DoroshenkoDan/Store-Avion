import React from 'react'
import AuthContainer from '../components/AuthContainer'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

export default function AuthPage() {
  const status = useSelector((state) => state.user.status)

  if (status) {
    return <Navigate to="/catalog/" />
  }

  return <AuthContainer></AuthContainer>
}
