import { useContext, useEffect } from "react";
import { NavLink } from 'react-router-dom';
import { BiLogIn, BiLogOut, BiCart, BiSolidUser, BiCreditCard,BiSolidUserPlus, BiSolidEdit } from "react-icons/bi";
import { ContextUser } from "../context/ContextUser.jsx";
import useSwalAlert from "../../hooks/useSwalAlert";
import useSessionService from "../services/useSessionService.jsx";

const LayoutNav = () => {
  const { user, setUser, token, setToken } = useContext(ContextUser);
  const { messageAndRedirect } = useSwalAlert()
  
  const {sessionUser } = useSessionService()

  useEffect( () => {
    const getUser = async () => {
      try {
        const resp = await sessionUser(token)
        if (resp?.isError === false) {
          setUser(resp.payload);
        } else {
          throw new Error()
        }
      } catch (error) {
        setUser(null);
        setToken(null);
        localStorage.removeItem('token');
        messageAndRedirect("Error de usuario", "error","/login/");
      }
    }
    if (token) {
      getUser()
    } else {
      setUser(null);
    }
  }, [token])

  return (
    <nav className="nav">
    <ul>
      { !user && (
        <li><NavLink to="/">Inicio</NavLink></li>
      )}
      <li><NavLink to="products/">Computadoras</NavLink></li>
      { user && ( <>
        <li><NavLink to="addproducts/"><BiSolidEdit/>*</NavLink></li>
        <li><NavLink to="chat/">*Chat</NavLink></li>
        <li><NavLink to="refcolores/">Extras</NavLink></li>
      </>)}
    </ul>
    <div className="user-widget">
      <ul className="link-access">
        {user
          ? (<>
              <li><NavLink to="cart/">Carrito<BiCart/></NavLink></li>
              <li><NavLink to="order/"><BiCreditCard /></NavLink></li>
            </>)
          : (<>
              <li><NavLink to="login/">Login <BiLogIn /></NavLink></li>
              <li><NavLink to="register/">Registrarse<BiSolidUserPlus/></NavLink></li>
            </>)}
      </ul>
      { user && (
          <div className="user-area">
          <div>
            <NavLink to="user/">{user.name} <BiSolidUser /></NavLink>
            <NavLink to="logout/"><BiLogOut/></NavLink>
          </div>
          <p>Rol: {user.role}</p>
          </div>)}
    </div>
  </nav>
  )
}

export default LayoutNav