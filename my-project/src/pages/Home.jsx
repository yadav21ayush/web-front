import { useState, useEffect } from 'react';
import api from '../services/api';

export default function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    api.get('/posts')
      .then(res => setPosts(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div style={{ padding: '2rem 5%' }}>
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h1 style={{ fontSize: '3rem' }}>Discover Amazing Stories</h1>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
        {posts.map(post => (
          <div key={post.id} style={{
            borderRadius: '16px', overflow: 'hidden', boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
            transition: 'transform 0.3s'
          }}
            onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-10px)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
          >
            <div style={{ height: '260px', background: '#ddd' }}>
              <img src={post.featuredImage || 'https://picsum.photos/600/400'} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <div style={{ padding: '1.5rem' }}>
              <h3>{post.title}</h3>
              <p style={{ color: '#555', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                {post.excerpt}
              </p>
              <Link to={`/posts/${post.slug}`} style={{ color: '#e63939', fontWeight: 'bold' }}>Read Full Story →</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}