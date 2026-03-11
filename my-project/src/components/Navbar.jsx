import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

export default function Navbar({ setCurrentPage }) {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav style={{
      background: '#1a1a1a', 
      padding: '1rem 5%', 
      display: 'flex',
      justifyContent: 'space-between', 
      alignItems: 'center',
      position: 'sticky',
      top: 0
    }}>
      <h1 style={{ color: 'white', margin: 0 }}>MyBlog</h1>
      
      <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
        <button onClick={() => setCurrentPage('home')} style={navButton}>Home</button>
        <button onClick={() => setCurrentPage('create')} style={navButton}>Write Post</button>
        
        {user ? (
          <>
            <span style={{ color: '#ddd' }}>Hi, {user.username}</span>
            <button onClick={logout} style={{ padding: '8px 16px', background: '#e63939', color: 'white', border: 'none', borderRadius: '6px' }}>Logout</button>
          </>
        ) : (
          <button style={navButton}>Login</button>
        )}
      </div>
    </nav>
  );
}

const navButton = {
  background: 'none',
  border: 'none',
  color: 'white',
  fontSize: '1.1rem',
  cursor: 'pointer'
};