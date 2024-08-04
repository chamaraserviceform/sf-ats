import './App.css'
import {Link, Route, Routes} from "react-router-dom";
import LandingPage from "./pages/LandingPage.jsx";
import ObjectPage from "./pages/ObjectPage.jsx";

function App() {

  return (
    <>
        <div>
            <nav>
                <ul>
                    <li>
                        <Link to="/careers">Careers</Link>
                    </li>
                </ul>
            </nav>
            <Routes>
                <Route path="/:url" element={<LandingPage/>}/>
                <Route path="/:url/:objectId" element={<ObjectPage/>}/>
            </Routes>
        </div>
    </>
  )
}

export default App
