import './App.css'
import {Route, Routes} from "react-router-dom";
import LandingPage from "./pages/LandingPage.jsx";
import ObjectPage from "./pages/ObjectPage.jsx";
import {DataProvider} from "./providers/DataProvider.jsx";
import Home from "./pages/Home.jsx";

function App() {

  return (
    <>
        <div>
            <Routes>
                <Route path="/" element={ <Home/>}/>
                <Route path="/:url" element={
                    <DataProvider>
                        <LandingPage/>
                    </DataProvider>
                }/>
                <Route path="/:url/:objectId" element={
                    <DataProvider>
                        <ObjectPage/>
                    </DataProvider>
                    }/>
            </Routes>
        </div>
    </>
  )
}

export default App
