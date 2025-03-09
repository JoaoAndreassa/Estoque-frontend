import '../styles/resgister.css'
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";


const registerSchema = yup.object().shape({
  name: yup.string().min(3, "Nome deve ter no mínimo 3 caracteres").required("Nome obrigatório"),
  email: yup.string().email("Email inválido").required("Email obrigatório"),
  password: yup.string().min(6, "A senha deve ter no mínimo 6 caracteres").required("Senha obrigatória"),
});

const Register = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(registerSchema),
  });

  interface RegisterFormData {
    name: string;
    email: string;
    password: string;
  }

  const onSubmit = async (data: RegisterFormData) => {
    try {
      await axios.post("http://localhost:3000/api/users/signup", data);
      navigate("/login"); 
    } catch (error) {
        console.error("Erro ao registrar:", error);
        setErrorMessage("Erro ao registrar. Verifique os dados e tente novamente.");
      }
      
      
  };

  return (
    <div className="register-container">
      <h2 className="register-title">Cadastro</h2>

      
      {errorMessage && <p className="error-message">{errorMessage}</p>}

      <form onSubmit={handleSubmit(onSubmit)} className="register-form">
        <div className="form-group">
          <label htmlFor="name">Nome:</label>
          <input id="name" type="text" {...register("name")} />
          {errors.name && <p className="error-message">{errors.name.message}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input id="email" type="email" {...register("email")} />
          {errors.email && <p className="error-message">{errors.email.message}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="password">Senha:</label>
          <input id="password" type="password" {...register("password")} />
          {errors.password && (
            <p className="error-message">{errors.password.message}</p>
          )}
        </div>

        <button type="submit" className="register-button">
          Cadastrar
        </button>
      </form>

      <p className="login-link">
        Já tem uma conta? <a href="http://localhost:5173/">Faça login</a>
      </p>
    </div>
  );
};

export default Register;
