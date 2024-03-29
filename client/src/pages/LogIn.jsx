import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import useSwalAlert from "../../hooks/useSwalAlert.jsx";
import useSessionService from "../services/useSessionService.jsx";


const LogIn = () => {
  const { sessionLogIn } = useSessionService();
  const { messageAndRedirect } = useSwalAlert()
  
  const { register, handleSubmit } = useForm({
    mode: "onBlur",
    defaultValues: {
      email: 'emaildeprueba@hotmail.com',
      password: '1234567'
    },
  });

  const onSubmit = async data => {
    try {
      const resp = await sessionLogIn(data)

      if(resp?.isError === false) {
        messageAndRedirect(resp.message, "success", "/products/")
      } else {
        messageAndRedirect("Acceso no autorizado", "error")
      }
    } catch (error) {
      console.error(error);
      messageAndRedirect("Acceso no autorizado por un error en el sistema", "error")
    }
  };

  return (
    <div  className="page-container">
      <h1 className="title">Inicio de Sesión</h1>
      <form className="form-container-vert" onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="email">   Email</label>
        <input type="email" {...register("email",    { required: true})} />
        <label htmlFor="password">Contraseña</label>
        <input type="password" {...register("password", { required: true})} />
        <button type="submit">Iniciar Sesión</button>
      </form>
      <Link to='/recovery' className="recovery-link">Recupera tu contraseña</Link>
    </div>
  )
}

export default LogIn