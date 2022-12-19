import { BrowserRouter, Navigate, Routes, Route, Link, useLocation } from "react-router-dom";
import LoginPage from "pages/loginPage";
import HomePage from "pages/homePage";
import Favourite from "pages/Myfavourite"
import VenueDetail from "pages/VenueDetail"
import Map from "pages/Map"
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { createTheme } from "@mui/material/styles";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { themeSettings } from "./theme";

function App() {
  const state = useSelector((state) => state);
  const theme = useMemo(() => createTheme(themeSettings()), []);
  const isAuth = Boolean(useSelector((state) => state.token));

  // console.log('state>>>', state)
  console.log('isAuth>>>', isAuth)
  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route path="/login" element={isAuth ? <Navigate to="/home" replace={true}/>: <LoginPage />} />
            <Route
                path="/home"
                element={isAuth ? <HomePage /> : <Navigate to="/login" />}
            />
            <Route
              path="/venue/:venueId"
              element={isAuth ? <VenueDetail /> : <Navigate to="/login" />}
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
        </ThemeProvider>
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
