import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter ,Switch ,Route} from 'react-router-dom';
import Blog from './components/Blog/Blog';
import Header from './components/Header/Header';
import Home from './components/Home/Home';
import Login from './components/LoginSystem/Login/Login';
import Reg from './components/LoginSystem/Reg/Reg';
import NotFound from './components/NotFound/NotFound';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import AuthProvider from './Context/AuthProvider';

function App() {
  return (
    <div>
      <AuthProvider>
      <BrowserRouter>
      <Header></Header>
          <Switch>
              <Route exact path="/">
                  <Home></Home>
              </Route>

              <Route exact path="/home">
                  <Home></Home>
              </Route>

              <Route exact path="/login">
                  <Login></Login>
              </Route>

              <Route exact path="/reg">
                  <Reg></Reg>
              </Route>

              <PrivateRoute exact path="/blog">
                  <Blog></Blog>
              </PrivateRoute>

              <Route exact path="*">
                  <NotFound></NotFound>
              </Route>
          </Switch>
      </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
