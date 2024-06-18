import logo from './logo.svg';
import './App.css';
import Login from './Components/Login/Login';
import MainPage from './Components/MainPage/MainPage';
import Table from './Components/Table/Table';
import CreateForm from './Components/CreateForm/CreateForm';
import Exam from './Components/Exam/Exam';
import SignIn from './Components/SignIn/SignIn';
import SignInSide from './Components/SignIn/SignIn';
import { Route, Routes } from 'react-router';
// import { Route, Routes } from "react-router";
function App() {
  return (
    <div className="App">
      <Routes>
      <Route path="/" element={<SignInSide/>} />
      <Route path="/home" element={<MainPage/>} />
      <Route path="/create" element={<CreateForm/>} />
      <Route path="/exam" element={<Exam/>} />
      <Route path="/history" element={<Table/>} />
      </Routes>
{/* <Login/> */}
{/* <MainPage/> */}
{/* <Table/> */}
{/* <CreateForm/> */}
{/* <Exam/> */}
{/* <SignInSide/> */}
    </div>
  );
}

export default App;
