import { Clock, Search, TrendingUp } from 'lucide-react';

function SearchBar({ searchTerm, setSearchTerm, sortBy, setSortBy }) {
  return (
    <div style={{ marginBottom: '2rem' }}>
      <div style={{ 
        display: 'flex', 
        gap: '1rem', 
        marginBottom: '1.5rem',
        flexWrap: 'wrap',
        alignItems: 'center'
      }}>
        {/* Search Input */}
        <div style={{ flex: '1', minWidth: '250px', position: 'relative' }}>
          <Search 
            size={20} 
            style={{ 
              position: 'absolute', 
              left: '12px', 
              top: '50%', 
              transform: 'translateY(-50%)', 
              color: '#9ca3af' 
            }} 
          />
          <input
            type="text"
            placeholder="Search events..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: '100%',
              padding: '0.75rem 1rem 0.75rem 2.5rem',
              border: '2px solid #e5e7eb',
              borderRadius: '8px',
              fontSize: '1rem',
              transition: 'border-color 0.2s'
            }}
            onFocus={(e) => e.target.style.borderColor = '#6366f1'}
            onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
          />
        </div>
        
        {/* Sort Buttons */}
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button
            onClick={() => setSortBy('time')}
            type="button"
            style={{
              padding: '0.75rem 1rem',
              border: sortBy === 'time' ? '2px solid #6366f1' : '2px solid #e5e7eb',
              backgroundColor: sortBy === 'time' ? '#eef2ff' : 'white',
              borderRadius: '8px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              fontWeight: sortBy === 'time' ? '600' : '400',
              color: sortBy === 'time' ? '#6366f1' : '#374151',
              transition: 'all 0.2s',
              fontSize: '1rem',
              whiteSpace: 'nowrap'
            }}
            onMouseEnter={(e) => {
              if (sortBy !== 'time') {
                e.currentTarget.style.backgroundColor = '#f9fafb';
              }
            }}
            onMouseLeave={(e) => {
              if (sortBy !== 'time') {
                e.currentTarget.style.backgroundColor = 'white';
              }
            }}
          >
            <Clock size={18} />
            Recent
          </button>
          
          <button
            onClick={() => setSortBy('upvotes')}
            type="button"
            style={{
              padding: '0.75rem 1rem',
              border: sortBy === 'upvotes' ? '2px solid #6366f1' : '2px solid #e5e7eb',
              backgroundColor: sortBy === 'upvotes' ? '#eef2ff' : 'white',
              borderRadius: '8px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              fontWeight: sortBy === 'upvotes' ? '600' : '400',
              color: sortBy === 'upvotes' ? '#6366f1' : '#374151',
              transition: 'all 0.2s',
              fontSize: '1rem',
              whiteSpace: 'nowrap'
            }}
            onMouseEnter={(e) => {
              if (sortBy !== 'upvotes') {
                e.currentTarget.style.backgroundColor = '#f9fafb';
              }
            }}
            onMouseLeave={(e) => {
              if (sortBy !== 'upvotes') {
                e.currentTarget.style.backgroundColor = 'white';
              }
            }}
          >
            <TrendingUp size={18} />
            Popular
          </button>
        </div>
      </div>
    </div>
  );
}

export default SearchBar;