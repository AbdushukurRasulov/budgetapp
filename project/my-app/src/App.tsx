import { useCookies } from 'react-cookie';
import { BrowserRouter as Router } from 'react-router-dom';

import './App.css';
import { AuthenticatedRoutes } from './compnents/_basic/helpers/routes/AuthenticatedRoutes';
import { UnauthenticatedRoutes } from './compnents/_basic/helpers/routes/UnauthenticatedRoutes';

function App() {
  const [cookies, setCookie] = useCookies(['token']);
  console.log(cookies);
  const isLoggedIn = !!cookies.token;

  return (
    <div className=" bg-white bg-cover min-h-screen">
      <Router>
        {isLoggedIn ? <AuthenticatedRoutes /> : <UnauthenticatedRoutes />}
      </Router>
    </div>
  );
}

export default App;
