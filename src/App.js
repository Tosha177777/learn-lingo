import { Route, Routes } from "react-router-dom";
import Header from "./components/Header/Header";
import HomePage from "./pages/HomePage/HomePage";
import TeachersPage from "./pages/TeachersPage/TeachersPage";

const appRoutes = [
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/teachers",
    element: <TeachersPage />,
  },
];

function App() {
  return (
    <>
      <Header />
      <main>
        <Routes>
          {appRoutes.map(({ path, element }) => (
            <Route key={path} path={path} element={element} />
          ))}
        </Routes>
      </main>
    </>
  );
}

export default App;
