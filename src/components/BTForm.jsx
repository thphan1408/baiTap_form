import React, { useEffect } from 'react'
import { StudentForm } from './StudentForm'
import { StudentTable } from './StudentTable'
import { useDispatch } from 'react-redux'
import { getListStudentAPI } from '../store/Form/slice'

export const BTForm = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getListStudentAPI())
  }, [])

  return (
    <div className="container">
      <StudentForm />
      <StudentTable />
    </div>
  )
}
