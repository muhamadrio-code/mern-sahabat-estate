import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { User } from '../../models/User'


export interface UserState {
  currentUser: User | null
}

const initialState: UserState = {
  currentUser: null 
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setCurrentUser: (state, action: PayloadAction<User>) => {
      state.currentUser = action.payload
    }
  }
})

export const { setCurrentUser } = userSlice.actions
export default userSlice.reducer