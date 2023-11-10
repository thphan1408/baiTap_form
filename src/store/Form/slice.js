import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
  StudentList: [],
  // searchStudentList: [],
  // searchQuery: '',
  StudentEdit: undefined,
  isSuccess: false,
  isLoading: false,
}

const URL = 'https://6500588d18c34dee0cd4bfa3.mockapi.io/students'

export const getListStudentAPI = createAsyncThunk(
  'students/getListStudent',
  async () => {
    try {
      // Call API
      const response = await axios({
        url: URL,
        method: 'GET',
      })
      return response.data
    } catch (error) {
      throw error('Error 404 API')
    }
  }
)

export const deleteStudentAPI = createAsyncThunk(
  'students/deleteStudent',
  async (id) => {
    try {
      // Call API
      await axios({
        url: `${URL}/${id}`,
        method: 'DELETE',
      })
      return id
    } catch (error) {
      throw error('Error 404 API')
    }
  }
)

export const addStudentAPI = createAsyncThunk(
  'students/addStudent',
  async (formValue) => {
    try {
      // Call API
      const response = await axios({
        url: URL,
        method: 'POST',
        data: formValue,
      })
      return response.data
    } catch (error) {
      throw error('Đã có lỗi xảy ra')
    }
  }
)

export const updateStudentAPI = createAsyncThunk(
  'students/updateStudentAPI',
  async ({ id, formValue }) => {
    try {
      // Call API
      const response = await axios({
        url: `${URL}/${id}`,
        method: 'PUT',
        data: formValue,
      })
      return response.data
    } catch (error) {
      throw error('Đã có lỗi xảy ra')
    }
  }
)

const sliceForm = createSlice({
  name: 'form',
  initialState,
  reducers: {
    // actions
    setStudentEdit: (state, action) => {
      state.StudentEdit = action.payload
    },
    // setSearch: (state, action) => {
    //   state.searchQuery = action.payload
    // },

    // searchStudent: (state) => {
    //   state.searchStudentList = state.StudentList.filter((item) => {
    //     return item.hoTen
    //       .toLowerCase()
    //       .includes(state.searchQuery.toLowerCase())
    //   })
    // },
  },
  extraReducers: (builder) => {
    // Get List
    builder.addCase(getListStudentAPI.pending, (state, action) => {
      state.isLoading = true
      // console.log('pending student', state.StudentList)
    }),
      builder.addCase(getListStudentAPI.fulfilled, (state, action) => {
        // console.log('fulfilled', action)
        state.isLoading = false
        state.StudentList = action.payload
        // console.log('action.payload', state.StudentList)
      }),
      builder.addCase(getListStudentAPI.rejected, (state, action) => {
        state.isLoading = false
        // console.log('rejected', action)
      })

    // Delete Student
    builder.addCase(deleteStudentAPI.pending, (state, action) => {
      state.isLoading = true
      // console.log('pending', action)
    }),
      builder.addCase(deleteStudentAPI.fulfilled, (state, action) => {
        state.isLoading = false
        state.StudentList = state.StudentList.filter(
          (item) => item.id !== action.payload
        )
      }),
      builder.addCase(deleteStudentAPI.rejected, (state, action) => {
        state.isLoading = false
      })

    // Add Student
    builder.addCase(addStudentAPI.pending, (state, action) => {
      state.isLoading = true
      // console.log('pending', action)
    }),
      builder.addCase(addStudentAPI.fulfilled, (state, action) => {
        state.isLoading = false
        // console.log('fulfilled', action)
        state.StudentList.push(action.payload)
      }),
      builder.addCase(addStudentAPI.rejected, (state, action) => {
        state.isLoading = false
        // console.log('rejected', action)
      })

    // Update Student
    builder.addCase(updateStudentAPI.pending, (state, action) => {
      state.isLoading = true
      // console.log('pending', action)
    }),
      builder.addCase(updateStudentAPI.fulfilled, (state, action) => {
        state.isLoading = false
        // // console.log('fulfilled', action)
        const studentIndex = state.StudentList.findIndex(
          (item) => item.id === action.payload.id
        )

        if (studentIndex !== -1) {
          // console.log('Đã tìm thấy')
          state.StudentList[studentIndex] = action.payload
          state.StudentEdit = undefined
        }
      }),
      builder.addCase(updateStudentAPI.rejected, (state, action) => {
        state.isLoading = false
        // console.log('rejected', action)
      })
  },
})

export const { reducer: formReducer } = sliceForm
export const { setStudentEdit, setSearch, searchStudent } = sliceForm.actions
