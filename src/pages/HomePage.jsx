import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PostCard from '../components/PostCard';
import SearchBar from '../components/SearchBar';
import { supabase } from '../utils/supabaseClient';

function HomePage() {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [sortBy, setSortBy] = useState('time');
  const [searchTerm, setSearchTerm] = useState('');
  

  const fetchPosts = async () => {
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (data) {
      setPosts(data);
    }
    
    if (error) {
      console.error('Error fetching posts:', error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const filteredPosts = (posts || []).filter(post =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedPosts = [...filteredPosts].sort((a, b) => {
    if (sortBy === 'upvotes') {
      return (b.upvotes || 0) - (a.upvotes || 0);
    }
    return new Date(b.created_at) - new Date(a.created_at);
  });

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f5f7fa' }}>
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
            onClick={() => navigate('/create')}
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

      {/* Main Content */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem' }}>
        <SearchBar 
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          sortBy={sortBy}
          setSortBy={setSortBy}
        />

        {sortedPosts.length === 0 ? (
          <div style={{
            textAlign: 'center',
            padding: '4rem 2rem',
            backgroundColor: 'white',
            borderRadius: '12px',
            border: '2px dashed #e5e7eb'
          }}>
            <p style={{ fontSize: '1.25rem', color: '#6b7280', marginBottom: '1rem' }}>
              No events found
            </p>
            <p style={{ color: '#9ca3af' }}>
              {searchTerm ? 'Try a different search term' : 'Be the first to create an event!'}
            </p>
          </div>
        ) : (
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', 
            gap: '1.5rem' 
          }}>
            {sortedPosts.map(post => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default HomePage;