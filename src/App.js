import {
  createBrowserRouter, 
  createRoutesFromElements,
  Route, 
  RouterProvider
} from 'react-router-dom'


// pages
import Statistics from './pages/Statistics'
import Management from './pages/Management'

// layouts
import RootLayout from './layouts/RootLayout'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<Statistics />}/>
      <Route path="management" element={<Management />} />
    </Route>
  )
)

function App() {
  return (
    
    <RouterProvider router={router} />
    
  );
}

export default App