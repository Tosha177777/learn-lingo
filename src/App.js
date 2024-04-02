import { Route, Routes } from 'react-router-dom';
import Header from './components/Header/Header';
import HomePage from './pages/HomePage/HomePage';
import TeachersPage from './pages/TeachersPage/TeachersPage';
import { useSelector } from 'react-redux';
import { selectAuthError } from './redux/selector';
import PrivateRoute from 'components/RestrictedRoute/RestrictedRoute';

const appRoutes = [
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/teachers',
    element: <TeachersPage />,
  },
];

function App() {
  const error = useSelector(selectAuthError);

  return (
    <>
      <Header />
      <main>
        <Routes>
          {appRoutes.map(({ path, element }) => (
            <Route key={path} path={path} element={element} />
          ))}
        </Routes>
        {error && <h1>{error.message}</h1>}
      </main>
    </>
  );
}

export default App;
