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
      navigate("/login"); // Redireciona para login após registro
    } catch (error) {
        console.error("Erro ao registrar:", error);
        setErrorMessage("Erro ao registrar. Verifique os dados e tente novamente.");
      }
      
      
  };

  return (
    <div style={{display:"flex", flexDirection:"column", justifyContent:"center", textAlign:"center"}}>
      <h2>Cadastro</h2>
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Nome:</label>
          <input type="text" {...register("name")} />
          <p style={{ color: "red" }}>{errors.name?.message}</p>
        </div>
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
        <button type="submit">Cadastrar</button>
      </form>
      <p>
        Já tem uma conta? <a href="/login">Faça login</a>
      </p>
    </div>
  );
};

export default Register;
