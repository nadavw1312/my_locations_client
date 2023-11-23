import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthConsumer, AuthProvider } from "./context/JWTAuthContext";
import { PublicRoute } from "./components/Auth/PublicRoute";
import Login from "./components/Login";
import Register from "./components/Register";
import { Authenticated } from "./components/Auth/Authenticated";
import HomePage from "./pages/HomePage";
import AuthLayout from "./components/AuthLayout";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <AuthProvider>
        <BrowserRouter>
          <AuthConsumer>
            {(auth) => (
              <>
                {!auth.isInitialized ? (
                  <></>
                ) : (
                  <Routes>
                    <Route
                      path="/login"
                      element={
                        <PublicRoute>
                          <AuthLayout>
                            <Login />
                          </AuthLayout>
                        </PublicRoute>
                      }
                    />
                    <Route
                      path="/register"
                      element={
                        <PublicRoute>
                          <AuthLayout>
                            <Register />
                          </AuthLayout>
                        </PublicRoute>
                      }
                    />

                    <Route
                      path="/"
                      element={
                        <Authenticated>
                          <HomePage />
                        </Authenticated>
                      }
                    />
                  </Routes>
                )}
                <ToastContainer
                  position="bottom-center"
                  autoClose={5000}
                  hideProgressBar={false}
                  newestOnTop={false}
                  closeOnClick
                  rtl={false}
                  pauseOnFocusLoss={false}
                  draggable={false}
                  pauseOnHover={false}
                  theme="light"
                />
              </>
            )}
          </AuthConsumer>
        </BrowserRouter>
      </AuthProvider>
    </>
  );
}

export default App;
