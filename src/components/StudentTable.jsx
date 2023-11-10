import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteStudentAPI, setStudentEdit } from '../store/Form/slice'

export const StudentTable = () => {
  const dispatch = useDispatch()
  const { StudentList } = useSelector((state) => state.btForm)
  // console.log('StudentLIST ', StudentList)
  const [searchValue, setSearchValue] = useState('')
  const [searchStudentList, setSearchStudentList] = useState(StudentList)

  const handleSearch = (event) => {
    const { value } = event.target
    let lowerCase = value.toLowerCase()
    setSearchValue(lowerCase)
  }

  useEffect(() => {
    const filterStudent = StudentList.filter((item) => {
      return item.hoTen.toLowerCase().includes(searchValue)
    })
    setSearchStudentList(filterStudent)
  }, [searchValue])

  useEffect(() => {
    setSearchStudentList(StudentList)
    searchValue && setSearchValue('')
  }, [StudentList])

  return (
    <>
      <div className=" mt-3 d-flex justify-content-end">
        <input
          className="form-control form-control-dark "
          style={{ width: 200 }}
          type="text"
          name="search"
          onChange={handleSearch}
          value={searchValue}
          placeholder="Search"
          aria-label="Search"
        />
      </div>
      {
        <table className="table mt-3">
          <thead>
            <tr>
              <th>Mã SV</th>
              <th>Họ tên</th>
              <th>Email</th>
              <th>Số điện thoại</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {(searchValue !== '' ? searchStudentList : StudentList)?.map(
              (item) => {
                return (
                  <tr key={item.id}>
                    <td>{item.maSV}</td>
                    <td>{item.hoTen}</td>
                    <td>{item.email}</td>
                    <td>{item.sdt}</td>
                    <td>
                      <button
                        className="btn btn-primary mr-2"
                        onClick={() => {
                          dispatch(setStudentEdit(item))
                        }}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-danger"
                        onClick={() => {
                          dispatch(deleteStudentAPI(item.id))
                        }}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                )
              }
            )}
          </tbody>
        </table>
      }
    </>
  )
}
