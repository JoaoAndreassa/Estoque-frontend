import '../styles/login.css'
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";


const loginSchema = yup.object().shape({
  email: yup.string().email("Email inválido").required("Email obrigatório"),
  password: yup.string().min(6, "A senha deve ter no mínimo 6 caracteres").required("Senha obrigatória"),
});

const Login = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(loginSchema),
  });

  interface LoginFormData {
    email: string;
    password: string;
  }

  const onSubmit = async (data: LoginFormData) => {
    try {
      const response = await axios.post("http://localhost:3000/api/users/login", data);
      localStorage.setItem("token", response.data.token);
      navigate("/dashboard/produtos"); // Redireciona para o Dashboard após login
    
    } catch (error) {
        console.error("Erro ao fazer login:", error);
        setErrorMessage("Erro ao fazer login. Verifique suas credenciais.");
      }
      
  };

  return (
    <div className="login-container">
      <h2 className="login-title">Login Inventory</h2>

      
      {errorMessage && <p className="error-message">{errorMessage}</p>}

      <form onSubmit={handleSubmit(onSubmit)} className="login-form">
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input id="email" type="email" {...register("email")} />
          {errors.email && <p className="error-message">{errors.email.message}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="password">Senha:</label>
          <input id="password" type="password" {...register("password")} />
          {errors.password && <p className="error-message">{errors.password.message}</p>}
        </div>

        <button type="submit" className="login-button">
          Entrar
        </button>
      </form>

      <p className="register-link">
        Não tem uma conta? <a href="/register">Cadastre-se</a>
      </p>
    </div>
  );
};

export default Login;
