import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  addStudentAPI,
  getListStudentAPI,
  updateStudentAPI,
} from '../store/Form/slice'

export const StudentForm = () => {
  const dispatch = useDispatch()
  const { StudentEdit } = useSelector((state) => state.btForm)
  // console.log('StudentEdit', StudentEdit)
  const [formValue, setFormValue] = useState({
    maSV: '',
    hoTen: '',
    email: '',
    sdt: '',
  })

  const handleOnChange = (event) => {
    // console.log('event', event)
    // destructuring event.target
    const { name, value } = event.target
    setFormValue({
      ...formValue, // giữ lại các giá trị cũ
      [name]: value, // cập nhật giá trị mới
    })
  }

  useEffect(() => {
    if (StudentEdit) {
      setFormValue(StudentEdit)
    }
  }, [StudentEdit])

  // console.log('formValue', formValue)
  return (
    <>
      <div className="title bg-dark p-2">
        <h1 className="fw-bold fs-3 text-white">Thông tin sinh viên</h1>
      </div>
      <form
        className="mt-3"
        onSubmit={(event) => {
          event.preventDefault()
          // console.log('formValue', formValue)

          if (StudentEdit) {
            dispatch(updateStudentAPI({ formValue, id: StudentEdit.id }))
          } else {
            dispatch(addStudentAPI(formValue))
          }

          // reset form
          setFormValue({
            maSV: '',
            hoTen: '',
            email: '',
            sdt: '',
          })
        }}
      >
        <div className="row">
          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="maSV">Mã SV</label>
              <input
                disabled={formValue.maSV === StudentEdit?.maSV}
                type="text"
                className="form-control"
                id="maSV"
                name="maSV"
                placeholder="Mã sinh viên"
                onChange={handleOnChange}
                value={formValue.maSV}
              />
            </div>
            <div className="form-group">
              <label htmlFor="sdt">Số điện thoại</label>
              <input
                type="text"
                className="form-control"
                id="sdt"
                name="sdt"
                placeholder="Số điện thoại"
                onChange={handleOnChange}
                value={formValue.sdt}
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="hoTen">Họ tên</label>
              <input
                type="text"
                className="form-control"
                id="hoTen"
                name="hoTen"
                placeholder="Họ tên"
                onChange={handleOnChange}
                value={formValue.hoTen}
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="text"
                className="form-control"
                id="email"
                name="email"
                placeholder="Email"
                onChange={handleOnChange}
                value={formValue.email}
              />
            </div>
          </div>
        </div>

        <div className="mt-4">
          {StudentEdit ? (
            <button className="btn btn-warning">Update</button>
          ) : (
            <button className="btn btn-success mr-3" type="submit">
              Add
            </button>
          )}
        </div>
      </form>
    </>
  )
}
