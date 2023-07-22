import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import List from "./pages/ListVacinas";
import Form from "./pages/FormVacinas";
import Quiz from "./pages/Quiz";
import Login from "./pages/Login";
import Home from "./pages/Home";

function App() {
  const [loggedIn, setLoggedIn] = useState(true);

  const handleLogin = () => {
    // Aqui você pode implementar a lógica de autenticação com o backend
    // Verifique as credenciais do usuário e, se forem válidas, chame setLoggedIn(true)
    setLoggedIn(true);
  };

  const handleLogout = () => {
    // Aqui você pode implementar a lógica de logout
    // Por exemplo, fazer uma solicitação para encerrar a sessão no backend
    setLoggedIn(false);
    window.location.assign("/");
  };

  return (
    <Router>
      <Routes>
        {/* Rota da página de login */}
        <Route
          path="/"
          element={loggedIn ? <Navigate to="/home" /> : <Login onLogin={handleLogin} />}
        />
        <Route
          path="/sair"
          element={<Login onLogin={handleLogout} /> }
        />
        <Route path="/home" element={loggedIn ? <Home /> : <Navigate to="/" />} />
        {/* Rota da página de lista de vacinas */}
        <Route path="/list" element={loggedIn ? <List /> : <Navigate to="/" />} />
        {/* Rota da página de formulário de vacinas */}
        <Route path="/form" element={loggedIn ? <Form /> : <Navigate to="/" />} />
        <Route path="/form/:id" element={loggedIn ? <Form /> : <Navigate to="/" />} />
        <Route path="/quiz" element={loggedIn ?
         
        <div className="app">
          <h1>Quiz Vacinas</h1>
          <Quiz />
        </div> : <Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;