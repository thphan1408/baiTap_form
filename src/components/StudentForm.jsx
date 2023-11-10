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

  const [formValue, setFormValue] = useState({
    maSV: '',
    hoTen: '',
    email: '',
    sdt: '',
  })

  const [formError, setFormError] = useState({
    maSV: '',
    hoTen: '',
    email: '',
    sdt: '',
  })

  const handleOnChange = (event) => {
    // console.log('event', event)
    // destructuring event.target
    const { name, value } = event.target

    setFormError({ ...formError, [name]: validate(name, value) })

    setFormValue({
      ...formValue, // giữ lại các giá trị cũ
      [name]: value, // cập nhật giá trị mới
    })
  }

  const validate = (name, value) => {
    switch (name) {
      case 'maSV':
        if (value.trim() === '') {
          return `${name} không được để trống`
        } else {
          return ''
        }
      case 'hoTen':
        if (value.trim() === '') {
          return `${name} không được để trống`
        } else {
          return ''
        }
      case 'sdt':
        if (value.trim() === '') {
          return `${name} không được để trống`
        } else if (!value.match(new RegExp('^[0-9]*$'))) {
          return `${name} phải là số`
        } else {
          return ''
        }
      case 'email':
        if (value.trim() === '') {
          return `${name} không được để trống`
        } else if (
          !value.match(new RegExp('^[a-zA-Z0-9]+@[a-zA-Z0-9]+.[A-Za-z]+$'))
        ) {
          return `${name} không đúng định dạng`
        } else {
          return ''
        }
      default:
        return ''
    }
  }

  useEffect(() => {
    if (StudentEdit) {
      setFormError({
        maSV: '',
        hoTen: '',
        email: '',
        sdt: '',
      })
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

          // Validate
          const validationError = {}

          Object.keys(formValue).forEach((name) => {
            const error = validate(name, formValue[name])
            if (error && error.length > 0) {
              validationError[name] = error
            }
          })

          if (Object.keys(validationError).length > 0) {
            setFormError(validationError)
            return
          }

          // end validate

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
              {formError.maSV && (
                <p>
                  <small className="text-danger">{formError.maSV}</small>
                </p>
              )}
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
              {formError.sdt && (
                <p>
                  <small className="text-danger">{formError.sdt}</small>
                </p>
              )}
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
              {formError.hoTen && (
                <p>
                  <small className="text-danger">{formError.hoTen}</small>
                </p>
              )}
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
              {formError.email && (
                <p>
                  <small className="text-danger">{formError.email}</small>
                </p>
              )}
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
