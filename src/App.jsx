import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import ExchangeRates from "./components/ExchangeRates";
import About from "./components/About";
import ErrorPage from "./components/ErrorPage";
import { GlobalProvider, GlobalContext } from "./context/GlobalContext";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useContext, useEffect } from "react";
import "./App.css";

const MainLayout = ({ children }) => {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
};

const AppContent = () => {
  const { mode } = useContext(GlobalContext);

  const theme = createTheme({
    palette: {
      mode: mode,
    },
  });

  useEffect(() => {
    document.body.className = mode;
  }, [mode]);

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <MainLayout>
                <Home />
              </MainLayout>
            }
          />
          <Route
            path="/exchange_rates_live"
            element={
              <MainLayout>
                <ExchangeRates />
              </MainLayout>
            }
          />
          <Route
            path="/about"
            element={
              <MainLayout>
                <About />
              </MainLayout>
            }
          />

          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

function App() {
  return (
    <GlobalProvider>
      <AppContent />
    </GlobalProvider>
  );
}

export default App;
