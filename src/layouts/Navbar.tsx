import { NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav style={{ padding: '1rem', backgroundColor: '#eee' }}>
      <NavLink
        to="/"
        style={({ isActive }) => ({
          marginRight: 10,
          textDecoration: isActive ? 'underline' : 'none',
        })}
      >
        Invoices
      </NavLink>
      <NavLink
        to="/client"
        style={({ isActive }) => ({
          marginRight: 10,
          textDecoration: isActive ? 'underline' : 'none',
        })}
      >
        Client
      </NavLink>
    </nav>
  );
};

export default Navbar;
