import { ArrowUp, Clock, MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

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

function PostCard({ post }) {
  const navigate = useNavigate();
  const timeAgo = getTimeAgo(post.created_at);

  return (
    <div
      onClick={() => navigate(`/post/${post.id}`)}
      style={{
        backgroundColor: 'white',
        borderRadius: '12px',
        padding: '1.5rem',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        cursor: 'pointer',
        transition: 'all 0.2s',
        border: '1px solid #e5e7eb'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-4px)';
        e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.1)';
      }}
    >
      <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.75rem', color: '#1f2937' }}>
        {post.title}
      </h3>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', color: '#6b7280', fontSize: '0.875rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Clock size={16} />
          <span>{timeAgo}</span>
        </div>
        
        {post.location && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <MapPin size={16} />
            <span>{post.location}</span>
          </div>
        )}
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.5rem' }}>
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '0.25rem',
            padding: '0.25rem 0.75rem',
            backgroundColor: '#f3f4f6',
            borderRadius: '999px'
          }}>
            <ArrowUp size={16} color="#6366f1" />
            <span style={{ fontWeight: '600', color: '#6366f1' }}>{post.upvotes || 0}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostCard;