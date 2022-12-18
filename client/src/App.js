import { BrowserRouter, Navigate, Routes, Route, Link, useLocation } from "react-router-dom";
import LoginPage from "components/loginPage";
import HomePage from "components/homePage";
import Favourite from "components/Favourite"
import Venue from "components/Venue"
import Map from "components/Map"
import { useSelector } from "react-redux";

function App() {
  const user = useSelector((state) => state.user);
  const isAuth = Boolean(useSelector((state) => state.token));

  console.log('user>>>', user)
  return (
    <div className="app">
      <BrowserRouter>
        <div>
          <ul>
            {/* <li> <Link to="/">Home</Link> </li> */}
            <li> <Link to="/venue">Venue</Link> </li>
            <li> <Link to="/map">Map</Link> </li>
            <li> <Link to="/favourite">Your favourite</Link> </li>
          </ul>
        </div>

        <hr />
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route
              path="/home"
              element={isAuth ? <HomePage /> : <Navigate to="login" />}
            />
          <Route
            path="/venue"
            element={isAuth ? <Venue /> : <Navigate to="/login" />}
          />
          <Route
            path="/map"
            element={isAuth ? <Map /> : <Navigate to="/login" />}
          />
          <Route
            path="/favourite"
            element={isAuth ? <Favourite /> : <Navigate to="/login" />}
          />
          <Route path="*" element={isAuth ? <NoMatch /> : <Navigate to="/login" />} />

        </Routes>
      </BrowserRouter>
    </div>
  );
}

function NoMatch() {
  let location = useLocation();
  return (
    <div>
      <h3>
        No match for <code>{location.pathname}</code>
      </h3>
    </div>
  );
}

export default App;
