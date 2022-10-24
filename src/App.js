import logo from './logo.svg';
import './App.css';
import FormXAdmin from './components/FormXAdmin';
import WelcomePage from './components/WelcomePage';
import UserPage from './components/UserPage';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { ResultView } from './components/ResultView';
// import PatientAndAnalysis from './components/PatientAndAnalysis';


function App() {
  return (
  <>
    <Router>
            <div className="App">
                <Routes>
                    <Route path="/" strict exact element={<WelcomePage />}></Route>
                    <Route path="/adminform" element={<FormXAdmin />}></Route>
                    {/* <Route path="/resultview/:analysis_id" element={<ResultView/>}></Route>  */}
                    {/* kapet id nepermjet url-se */}

                    {/* <Route path="/updateContact/:id" element={<UpdateContact />}></Route>
                    <Route path="/showInfo/:id" element={<ShowInfo />}></Route> */}
                </Routes>
                {/* <Link to="/updateContact/:id">{UpdateContact}</Link> */}
           </div>
        </Router>
    </>
  );
}

export default App;
