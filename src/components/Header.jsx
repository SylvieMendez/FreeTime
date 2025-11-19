function Header({ navigateTo }) {
  return (
    <header style={{
      backgroundColor: '#6366f1',
      color: 'white',
      padding: '1.5rem 2rem',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 
          style={{ fontSize: '1.75rem', fontWeight: 'bold', cursor: 'pointer' }}
          onClick={() => navigateTo('home')}
        >
          FreeTime
        </h1>
        <button
          onClick={() => navigateTo('create')}
          style={{
            backgroundColor: 'white',
            color: '#6366f1',
            border: 'none',
            padding: '0.75rem 1.5rem',
            borderRadius: '8px',
            fontWeight: '600',
            cursor: 'pointer',
            fontSize: '1rem'
          }}
        >
          + Create Event
        </button>
      </div>
    </header>
  );
}
export default Header;