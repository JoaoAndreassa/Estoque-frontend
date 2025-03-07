import '../styles/auth.css'
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
      navigate("/dashboard"); // Redireciona para o Dashboard após login
    
    } catch (error) {
        console.error("Erro ao fazer login:", error);
        setErrorMessage("Erro ao fazer login. Verifique suas credenciais.");
      }
      
  };

  return (
    
    <div style={{display:"flex", flexDirection:"column", justifyContent:"center", textAlign:"center"}}>
      <h2>Login</h2>
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Email:</label>
          <input type="email" {...register("email")} />
          <p style={{ color: "red" }}>{errors.email?.message}</p>
        </div>
        <div>
          <label>Senha:</label>
          <input type="password" {...register("password")} />
          <p style={{ color: "red" }}>{errors.password?.message}</p>
        </div>
        <button type="submit">Entrar</button>
      </form>
      <p>
        Não tem uma conta? <a href="/register">Cadastre-se</a>
      </p>
    </div>
  );
};

export default Login;
