import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  deleteStudentAPI,
  setStudentEdit,
  setSearch,
  studentSearchList,
} from '../store/Form/slice'

export const StudentTable = () => {
  const { StudentList, searchStudent } = useSelector((state) => state.btForm)
  const dispatch = useDispatch()

  const [searchValue, setSearchValue] = useState('')
  const [searchResult, setSearchResult] = useState([])

  // Sử dụng useEffect để cập nhật searchResult khi searchStudent thay đổi
  useEffect(() => {
    setSearchResult(searchStudent)
  }, [searchStudent])

  const handleSearch = (event) => {
    const { value } = event.target
    let lowerCase = value.toLowerCase()
    setSearchValue(lowerCase)
    dispatch(studentSearchList(lowerCase)) // Gửi giá trị tìm kiếm đến action
  }
  if (searchResult === null) {
    setSearchResult(StudentList)
  }

  console.log(searchResult);
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
        <button
          className="btn btn-outline-primary ml-2"
          onClick={() => {
            dispatch(studentSearchList(searchValue))
          }}
        >
          search
        </button>
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
            {searchResult?.map((item) => {
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
            })}
          </tbody>
        </table>
      }
    </>
  )
}
