import React from 'react'
import { Route, Routes } from 'react-router-dom'
import ProductDetailsPage from './pages/ProductDetailsPage'
import ProductListPage from './pages/ProductListPage'

const ProductFeature = () => {
  return (
    <Routes>
      <Route
        index
        element={<ProductListPage />}
      ></Route>
      <Route
        path="/:id"
        element={<ProductDetailsPage />}
      ></Route>
    </Routes>
  )
}

export default ProductFeature
