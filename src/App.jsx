import './App.css'
import {Route, Routes} from "react-router-dom";
import LandingPage from "./pages/LandingPage.jsx";
import ObjectPage from "./pages/ObjectPage.jsx";

function App() {

  return (
    <>
      <div>
          <Routes>
              <Route path="/:url" element={<LandingPage/>}/>
              <Route path="/:url/:objectId" element={<ObjectPage/>}/>
          </Routes>
      </div>
    </>
  )
}

export default App
