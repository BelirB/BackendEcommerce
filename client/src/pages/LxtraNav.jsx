// import { useContext, useEffect } from "react";
// import { NavLink } from 'react-router-dom';
// import { BiLogIn, BiLogOut, BiCart, BiSolidUser, BiCreditCard,BiSolidUserPlus, BiSolidEdit } from "react-icons/bi";
// import Swal from 'sweetalert2';


// import { ContextConfig } from "../context/ContextConfig.jsx";
// import { ContextUser } from "../context/ContextUser.jsx";
// import SessionService from "../services/session.service.jsx";

// const NavBar = () => {
//     const [menu, setMenu] = useState(false)

//     const toogleMenu = () => {
//         setMenu(!menu)
//     }

//     return (
//         <div className={style['contenedor-navbar']}>
//             <div className={style['contenedor-logo']}>
//                 <Link to='/'>
//                     <img src={logo} alt='logo de la empresa' />
//                 </Link>
//                 <button onClick={toogleMenu} className={style['menu-btn']}>
//                     <img style={{width:"150px", height:"50px"}} src="https://i.postimg.cc/CxnS1M8K/armado.png" alt="" />
//                 </button>
//             </div>
//             <div className={style['contenedor-menu']}>
//                 <div className={`${style.menu} ${menu ? style.isActive : ''}`}>
//                     <ul className={style['menu-ul']}>
//                     <li><Link className={style['categoria']} to='categoria/Oficina'>Office</Link></li>
//                     <li><Link className={style['categoria']} to='categoria/Basica'>Basica</Link></li>
//                     <li><Link className={style['categoria']} to='categoria/Medium'>Medium</Link></li>
//                     <li><Link className={style['categoria']} to='categoria/Elite'>Elite</Link></li>
//                     <li><Link className={style['categoria']} to='categoria/Extreme'>Extreme</Link></li>
//                     </ul>
//                 </div>
//             </div>
//             <div className={style['contenedor-carrito']}>
//                 <CartWidget />
//             </div>
//         </div>
//     )
// }


// export default LxtraNav