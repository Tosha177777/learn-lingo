import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { selectAuthIsSignedIn } from '../../redux/selector';

const PrivateRoute = ({ children, redirectTo = '/' }) => {
  const authenticated = useSelector(selectAuthIsSignedIn);

  return authenticated ? children : <Navigate to={redirectTo} replace />;
};

export default PrivateRoute;
