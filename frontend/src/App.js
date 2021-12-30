import './App.css';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import Register from './components/Register';
import Login from './components/Login';
import Dash from './components/Dash';
import Home from './components/Home';
import Invoicecreate from './components/invoicecreate';
import Invoices from './components/Invoices';
import Prev from './components/Prev';

function App() {
  return (
    <>
    <Router>
      <Routes>
        <Route path="/" exact element={<Register/>}/>
        <Route path="/login" exact element={<Login/>}/>
        <Route path="/home" exact element={<Home/>}/>
        <Route path="/dashboard" exact element={<Dash/>}/>
        <Route path="/createinvoice" exact element={<Invoicecreate/>}/>
        <Route path="/invoices" exact element={<Invoices/>}/>
        
        <Route path="/preview" exact element={<Prev/>}/>
      </Routes>
    </Router>
    </>
  );
}

export default App;
