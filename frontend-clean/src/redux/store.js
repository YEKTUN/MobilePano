import { configureStore } from '@reduxjs/toolkit'
import PanoReducer from './PanoSlice'

export const store = configureStore({
  reducer: {
    Pano: PanoReducer
  },
})