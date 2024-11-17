import Navigation from "./Component/Navigation";
import MainContent from "./Component/MainContent"
import { RouterProvider } from "react-router-dom";
import { createBrowserRouter } from "react-router-dom";
import ContentInfo from "./Component/ContentInfo";
import { ThemeProvider } from "./Component/ThemeContext";
import Origin from "./Component/Origin";
import Contact from "./Component/Contact";
import About from "./Component/About";
import { AuthContextProvider } from './context/AuthConext';
import Login from "./Component/Login";
import ManageOrchids from "./Component/ManageOrchids";
import Protected from "./Component/Protected";

function App() {

  const router = createBrowserRouter([
    {
      path: "/",

      element: (
        <>
          <ThemeProvider>
            <Navigation />
            <MainContent />
          </ThemeProvider>


        </>
      ),
    },
    {
      path: "/contentinfo",

      element: (
        <>
          <ThemeProvider>
            <Navigation />
            <ContentInfo />
          </ThemeProvider>

        </>
      ),
    },
    {
      path: "/origin",

      element: (
        <>
          <ThemeProvider>
            <Navigation />
            <Origin />
          </ThemeProvider>

        </>
      ),
    },
    {
      path: "/contact",

      element: (
        <>
          <ThemeProvider>
            <Navigation />
            <Contact />
          </ThemeProvider>

        </>
      ),
    },
    {
      path: "/about",

      element: (
        <>
          <ThemeProvider>
            <Navigation />
            <About />
          </ThemeProvider>

        </>
      ),
    },
    {
      path: "/login",

      element: (
        <>
          <ThemeProvider>
            <Navigation />
            <Login />
          </ThemeProvider>

        </>
      ),
    },
    {
      path: "/dashboard",

      element: (
        <>
          <Protected>
            <ThemeProvider>
              <Navigation />
              <ManageOrchids />
            </ThemeProvider>
          </Protected>
        </>
      ),
    },
  ]);

  return (
    <AuthContextProvider>
      <RouterProvider router={router} />
    </AuthContextProvider>
  );

}

export default App