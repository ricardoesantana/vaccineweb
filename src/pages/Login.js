import React, { useState } from "react";

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    // Aqui você pode implementar a lógica de autenticação com o backend
    // Verifique o nome de usuário e senha e retorne um resultado de autenticação adequado
    if (username === "admin" && password === "123!@#") {
      setError("");
      onLogin(username);
    } else {
      setError("Nome de usuário ou senha inválidos");
    }
  };

  return (
    <div className="container">
      <h2>Login - Digital Vaccine</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>Nome de Usuário:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Senha:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <div className="error">{error}</div>}
        <button type="submit">Entrar</button>
      </form>
    </div>
  );
};

export default Login;
