import Details from "./Components/Details";
import Login from "./Components/Login";
import { Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import Header from "./Components/Header";
import Forgetpwd from "./Components/Forgetpwd";


function App() {
  const isLoggedIn = useSelector(state => state.isLoggedIn);
  console.log(isLoggedIn);
  return (
      <>
      <header>
       <Header/>
       
      </header>
      <main>
        
        <Routes>
        <Route path="/forgetpwd" element={ <Forgetpwd/> }/>
        { !isLoggedIn ? <Route path="/login" element={<Login/>} /> :
          <>
        
        <Route path="/details" element={ <Details/> } />
        
        </>    
                }
        </Routes>
       
      </main>
      </>
   
  );
}

export default App;
