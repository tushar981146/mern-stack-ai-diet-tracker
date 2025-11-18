import { Routes, Route } from 'react-router-dom'
import Add from './components/Add.jsx'
import Home from './components/Home.jsx'




function App() {
  

  return (
    <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/add" element={<Add />} />
  
  </Routes>
  );
}

export default App
