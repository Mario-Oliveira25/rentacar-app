import { Link, NavLink } from "react-router-dom";

const links = [
  { to: "/", texto: "Carros" },
  { to: "/favoritos", texto: "Favoritos" },
  { to: "/reservas", texto: "As minhas reservas" },
];

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand app-navbar sticky-top">
      <div className="container">
        <Link className="navbar-brand" to="/">
          Rent-a-car
        </Link>
        <ul className="navbar-nav ms-auto flex-wrap">
          {links.map((link) => (
            <li className="nav-item" key={link.to}>
              <NavLink className="nav-link" to={link.to} end={link.to === "/"}>
                {link.texto}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
