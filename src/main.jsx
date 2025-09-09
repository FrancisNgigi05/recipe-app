import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './HomePageComponent/App'
import { createBrowserRouter, RouterProvider, createRoutesFromElements, Route } from 'react-router-dom'
import CategoryPage from './CategoryComponents/CategoryPage'
import RecipeDetail from './RecipeDetailsComponent/RecipeDetail'
import ErrorPage from './ErrorPageComponent/ErrorPage'
import Ingredients from './RecipeDetailsComponent/Ingredients'
import Preparation from './RecipeDetailsComponent/Preparation'

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<App />} />
      <Route path="/recipes/:category" element={<CategoryPage />} />

      <Route path="/recipe/:id" element={<RecipeDetail />}>
        <Route index element={<Ingredients />}/>
        <Route path="ingredient" element={<Ingredients />} />
        <Route path="preparation" element={<Preparation />} />
      </Route>

      <Route path="*" element={<ErrorPage />} />
    </>
  )
);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
