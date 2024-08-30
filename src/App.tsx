import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom';
import MainUserLayout from './layout/MainUserLayout';
import NotFoundPage from './pages/NotFoundPage';
import HomePage from './pages/HomePage';

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<MainUserLayout />} >
          <Route index element={<HomePage />} />
          <Route path="*" element={<NotFoundPage />} />
          {/* 
          <Route
            path="/jobs/apply/expo2024"
            element={<ApplyInternshipPage />}
          /> */}
        </Route >
      </>
    )
  );
  return (
    <RouterProvider router={router} />
  );
}

export default App;
