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
    setCurrentUser: (state, action: PayloadAction<User | null>) => {
      state.currentUser = action.payload
    },
    updateUserAvatar: (state, action: PayloadAction<string>) => {
      state.currentUser = { ...state.currentUser, avatar: action.payload } as User
    },
  }
})

export const { setCurrentUser, updateUserAvatar } = userSlice.actions
export default userSlice.reducer