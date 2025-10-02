import { NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav style={{ padding: '1rem', backgroundColor: '#eee' }}>
      <NavLink
        to="/"
        style={({ isActive }) => ({
          fontWeight: 'bold',
          marginRight: 10,
          backgroundColor: isActive ? 'rgb(200, 200, 200)' : 'transparent',
          padding: 6,
          borderRadius: 4,
          textDecoration: isActive ? 'underline' : 'none',
        })}
      >
        Invoices
      </NavLink>
      <NavLink
        to="/client"
        style={({ isActive }) => ({
          fontWeight: 'bold',
          backgroundColor: isActive ? 'rgb(200, 200, 200)' : 'transparent',
          padding: 6,
          borderRadius: 4,
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
