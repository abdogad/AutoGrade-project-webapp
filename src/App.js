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
import PrivateRoutes from './Components/PrivateRoutes/PrivateRoutes';
import Navbar from './Components/Navbar/Navbar';
import Footer from './Components/Footer/Footer';

// import { Route, Routes } from "react-router";
function App() {
  
  return (
    <div style={{
      backgroundColor: '#f5f5f5',
      minHeight: '100vh',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between'

    }}>
      <Navbar />
      <Routes>
      <Route path="/" element={<SignInSide/>} />
      
      <Route element={<PrivateRoutes />}>
        <Route path="/home" element={<Table/>} />
        <Route path="/create" element={<CreateForm/>} />
        <Route path="/exam/:id" element={<Exam/>} />
      </Route>
      </Routes>
      <Footer />
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
