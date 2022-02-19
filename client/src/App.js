import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SettingPage from './Views/SettingPage/SettingPage';
import HomePage from './Views/HomePage/HomePage';
import AddExpensePage from './Views/AddExpensePage/AddExpensePage';

const userId = "620e3f9ac54bd2fc341d33dc";


function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/'  element={<HomePage id={userId} />} />
          <Route path='/Setting' element={<SettingPage id={userId}/>} />
          <Route path='/AddExpensePage' element={<AddExpensePage id={userId} />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
