import { configureStore } from '@reduxjs/toolkit'
import PDFSlice from './PDFSlice'

export const store = configureStore({
  reducer: {
    pdf: PDFSlice
  },
})