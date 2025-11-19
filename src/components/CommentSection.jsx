import { MessageSquare } from 'lucide-react';
import { useEffect, useState } from 'react';
import { supabase } from '../utils/supabaseClient';

function CommentSection({ postId }) {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchComments = async () => {
      const { data, error } = await supabase
        .from('comments')
        .select('*')
        .eq('post_id', postId)
        .order('created_at', { ascending: false });
      
      if (data) {
        setComments(data);
      }
      
      if (error) {
        console.error('Error fetching comments:', error);
      }
      
      setLoading(false);
    };

    fetchComments();
  }, [postId]);

  const handleAddComment = async (e) => {
    e.preventDefault();
    
    if (!newComment.trim()) {
      alert('Comment cannot be empty!');
      return;
    }

    const { data, error } = await supabase
      .from('comments')
      .insert([{
        post_id: postId,
        comment_text: newComment,
        created_at: new Date().toISOString()
      }])
      .select();

    if (error) {
      alert('Error adding comment: ' + error.message);
      console.error('Error:', error);
    } else if (data && data.length > 0) {
      setComments([data[0], ...comments]);
      setNewComment('');
    }
  };

  const getTimeAgo = (timestamp) => {
    const now = new Date();
    const past = new Date(timestamp);
    const diffInSeconds = Math.floor((now - past) / 1000);

    if (diffInSeconds < 60) return 'Just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
    if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}d ago`;
    
    return past.toLocaleDateString();
  };

  return (
    <div style={{ marginTop: '2rem' }}>
      <h3 style={{ 
        fontSize: '1.5rem', 
        fontWeight: '600', 
        marginBottom: '1rem', 
        display: 'flex', 
        alignItems: 'center', 
        gap: '0.5rem' 
      }}>
        <MessageSquare size={24} />
        Comments ({comments.length})
      </h3>

      <form onSubmit={handleAddComment} style={{ marginBottom: '1.5rem' }}>
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Share your thoughts about this event..."
          rows="3"
          style={{
            width: '100%',
            padding: '0.75rem',
            border: '2px solid #e5e7eb',
            borderRadius: '8px',
            fontSize: '1rem',
            fontFamily: 'inherit',
            marginBottom: '0.75rem',
            resize: 'vertical'
          }}
        />
        <button
          type="submit"
          style={{
            padding: '0.75rem 1.5rem',
            backgroundColor: '#6366f1',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: '600',
            fontSize: '1rem'
          }}
        >
          Post Comment
        </button>
      </form>

      {loading ? (
        <p style={{ textAlign: 'center', color: '#6b7280' }}>Loading comments...</p>
      ) : comments.length === 0 ? (
        <p style={{ 
          textAlign: 'center', 
          color: '#9ca3af', 
          padding: '2rem',
          backgroundColor: '#f9fafb',
          borderRadius: '8px',
          border: '1px solid #e5e7eb'
        }}>
          No comments yet. Be the first to comment!
        </p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {comments.map(comment => (
            <div
              key={comment.id}
              style={{
                padding: '1rem',
                backgroundColor: '#f9fafb',
                borderRadius: '8px',
                border: '1px solid #e5e7eb'
              }}
            >
              <p style={{ 
                fontSize: '0.875rem', 
                color: '#6b7280', 
                marginBottom: '0.5rem' 
              }}>
                {getTimeAgo(comment.created_at)}
              </p>
              <p style={{ 
                color: '#374151',
                lineHeight: '1.5',
                whiteSpace: 'pre-wrap'
              }}>
                {comment.comment_text}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default CommentSection;