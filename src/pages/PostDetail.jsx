import { ArrowLeft, ArrowUp, Calendar, Clock, Edit, ExternalLink, MapPin, Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import CommentSection from '../components/CommentSection';
import { supabase } from '../utils/supabaseClient';

function getTimeAgo(timestamp) {
  const now = new Date();
  const past = new Date(timestamp);
  const diffInSeconds = Math.floor((now - past) / 1000);

  if (diffInSeconds < 60) return 'Just now';
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
  if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}d ago`;
  
  return past.toLocaleDateString();
}

function PostDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .eq('id', id)
        .single();
      
      if (data) {
        setPost(data);
      }
      
      if (error) {
        console.error('Error fetching post:', error);
      }
      
      setLoading(false);
    };

    fetchPost();
  }, [id]);

  const handleUpvote = async () => {
    const { data, error } = await supabase
      .from('posts')
      .update({ upvotes: (post.upvotes || 0) + 1 })
      .eq('id', id)
      .select();
    
    if (data && data.length > 0) {
      setPost(data[0]);
    }
    
    if (error) {
      console.error('Error upvoting:', error);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this event?')) {
      return;
    }

    const { error } = await supabase
      .from('posts')
      .delete()
      .eq('id', id);

    if (!error) {
      navigate('/');
    } else {
      alert('Error deleting post: ' + error.message);
    }
  };

  if (loading) {
    return <div style={{ textAlign: 'center', padding: '4rem' }}>Loading...</div>;
  }

  if (!post) {
    return <div style={{ textAlign: 'center', padding: '4rem' }}>Post not found</div>;
  }

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

      {/* Content */}
      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '2rem' }}>
        <button
          onClick={() => navigate('/')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.5rem 1rem',
            border: 'none',
            backgroundColor: 'transparent',
            color: '#6b7280',
            cursor: 'pointer',
            fontSize: '1rem',
            marginBottom: '1rem'
          }}
        >
          <ArrowLeft size={20} />
          Back to Events
        </button>

        <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '2rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '1.5rem' }}>
            <div style={{ flex: 1 }}>
              <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '1rem' }}>{post.title}</h1>
              
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', color: '#6b7280', fontSize: '0.875rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Clock size={16} />
                  <span>{getTimeAgo(post.created_at)}</span>
                </div>
                
                {post.location && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <MapPin size={16} />
                    <span>{post.location}</span>
                  </div>
                )}
                
                {post.event_date && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Calendar size={16} />
                    <span>{new Date(post.event_date).toLocaleString()}</span>
                  </div>
                )}
              </div>
            </div>

            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button
                onClick={() => navigate(`/edit/${id}`)}
                style={{
                  padding: '0.5rem',
                  border: 'none',
                  backgroundColor: '#f3f4f6',
                  borderRadius: '8px',
                  cursor: 'pointer'
                }}
                title="Edit"
              >
                <Edit size={20} color="#6b7280" />
              </button>
              <button
                onClick={handleDelete}
                style={{
                  padding: '0.5rem',
                  border: 'none',
                  backgroundColor: '#fee2e2',
                  borderRadius: '8px',
                  cursor: 'pointer'
                }}
                title="Delete"
              >
                <Trash2 size={20} color="#dc2626" />
              </button>
            </div>
          </div>

          {post.image_url && (
            <img
              src={post.image_url}
              alt={post.title}
              style={{
                width: '100%',
                maxHeight: '400px',
                objectFit: 'cover',
                borderRadius: '8px',
                marginBottom: '1.5rem'
              }}
              onError={(e) => { e.target.style.display = 'none'; }}
            />
          )}

          {post.content && (
            <p style={{ fontSize: '1.125rem', lineHeight: '1.75', color: '#374151', marginBottom: '1.5rem', whiteSpace: 'pre-wrap' }}>
              {post.content}
            </p>
          )}

          {post.registration_url && (
            <div style={{ marginBottom: '1.5rem', padding: '1rem', backgroundColor: '#f0f9ff', borderRadius: '8px', border: '1px solid #bae6fd' }}>
              <p style={{ fontSize: '0.875rem', color: '#0369a1', marginBottom: '0.5rem', fontWeight: '600' }}>
                Register for this event:
              </p>
              <a 
                href={post.registration_url} 
                target="_blank" 
                rel="noopener noreferrer"
                style={{
                  color: '#0284c7',
                  textDecoration: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  fontSize: '0.875rem'
                }}
              >
                {post.registration_url}
                <ExternalLink size={14} />
              </a>
            </div>
          )}

          <div style={{ borderTop: '1px solid #e5e7eb', paddingTop: '1.5rem', marginTop: '1.5rem' }}>
            <button
              onClick={handleUpvote}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.75rem 1.5rem',
                backgroundColor: '#eef2ff',
                border: '2px solid #6366f1',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '1rem',
                fontWeight: '600',
                color: '#6366f1'
              }}
            >
              <ArrowUp size={20} />
              Upvote ({post.upvotes || 0})
            </button>
          </div>

          <CommentSection postId={id} />
        </div>
      </div>
    </div>
  );
}

export default PostDetail;