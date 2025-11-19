import { useNavigate } from 'react-router-dom';
import CreatePost from '../components/CreatePost';

function CreatePostPage() {
  const navigate = useNavigate();

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f5f7fa' }}>
      {/* Header */}
      <header style={{
        backgroundColor: '#6366f1',
        color: 'white',
        padding: '1.5rem 2rem',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h1 
            style={{ fontSize: '1.75rem', fontWeight: 'bold', cursor: 'pointer' }}
            onClick={() => navigate('/')}
          >
            FreeTime
          </h1>
          <button
            onClick={() => navigate('/')}
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
            ← Back to Events
          </button>
        </div>
      </header>

      <CreatePost />
    </div>
  );
}

export default CreatePostPage;