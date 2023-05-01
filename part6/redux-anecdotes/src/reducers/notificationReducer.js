import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: '',
  reducers: {
    setMessage: (state, action) => action.payload,
    clearNotification: () => ''
  }
})

export const setNotification = (message, timeout) => {
  return async dispatch => {
    dispatch(setMessage(message))
    setTimeout(() => {
      dispatch(clearNotification())
    }, timeout*1000)
  }
}



export const { setMessage, clearNotification } = notificationSlice.actions
export default notificationSlice.reducer
