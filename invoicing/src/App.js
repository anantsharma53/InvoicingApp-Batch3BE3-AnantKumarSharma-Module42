import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Routes, Route} from "react-router-dom"
import ProtectedRoute from './components/routes/ProtectedRoute';
import InvoiceList from './components/InvoiceList/InvoiceList';
import InvoiceForm from "./components/InvoiceForm/InvoiceForm";
import InvoiceItems from "./components/InvoiceItems/InvoiceItems";
import ItemForm from "./components/ItemForm/ItemForm";
import Register from './components/SignUpForm/SignUPForm';
import Login from './components/LoginForm/LoginForm';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
          <Route path='/user' element={<Register />}/>        
          <Route path='/login' element={<Login />}/>
          <Route path='' element={<ProtectedRoute Component={InvoiceList} />}/>       
          <Route path='newInvoice' element={<ProtectedRoute Component={InvoiceForm} />}/>        
          <Route path='/:id' element={<ProtectedRoute Component={InvoiceItems} />}/>        
          <Route path='/:id/newItem' element={<ProtectedRoute Component={ItemForm} />}/>       
          
         {/* <Route path='' element={<InvoiceList />}>
        </Route> */}
        
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
