
import Me from "./managers/me.jsx";
import Register from "./managers/register.jsx";
import { Routes } from "react-router-dom";
import Homepage from "./managers/homepage.jsx";
import Post from "./managers/Post.jsx";
import { Route } from "react-router-dom";
import Login from "./managers/login.jsx";
import AboutApp from "./managers/AboutApp.jsx";


function App() {

  
  
  return (
    <>
      <Routes>
        <Route path="/register"
          element={<Register />}>
        </Route>
        <Route path="/login"
          element={<Login />}>
        </Route>
        <Route path="/homepage"
          element={<Homepage />}>
        </Route>
        <Route path="/me"
          element={<Me />}>
        </Route>
        <Route path="/post"
          element={<Post />}>
        </Route>
        <Route path="/aboutApp"
          element={<AboutApp />}>
        </Route>
      </Routes>
    </>
  );
}

export default App;
