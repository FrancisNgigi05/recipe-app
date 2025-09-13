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
import Layout from './LayoutComponent/Layout'
import AddRecipe from './AddRecipeComponent/AddRecipe'
import EditRecipe from './EditingComponent/EditRecipe'

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route element={<Layout />}>

        <Route path="/" element={<App />} />
        <Route path="/recipes/:category" element={<CategoryPage />} />

        <Route path="/recipe/:id" element={<RecipeDetail />}>
          <Route index element={<Ingredients />}/>
          <Route path="ingredient" element={<Ingredients />} />
          <Route path="preparation" element={<Preparation />} />
        </Route>

        <Route path="*" element={<ErrorPage />} />
      </Route>
      <Route path='/add' element={<AddRecipe/>}/>
      <Route path='/recipes/:id/edit' element={<EditRecipe />}/>
    </>
  )
);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
