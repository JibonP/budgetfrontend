import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Nav from "./components/Nav";
import Index from "./components/Index";
import Show from "./components/Show";
import Create from "./components/Create";
import Edit from "./components/Edit";

function App() {
  return (
    <Router>
      <Nav />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/transactions/:id" element={<Show />} />
        <Route path="/create" element={<Create />} />
        <Route path="/edit/:id" element={<Edit />} />
        {/* Add the Route for the Edit component */}
      </Routes>
    </Router>
  );
}

export default App;
