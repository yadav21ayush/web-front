import { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import Editor from '../components/Editor';

export default function CreatePost() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const slug = title.toLowerCase().replace(/\s+/g, '-');
    const newPost = {
      title,
      slug,
      content,
      excerpt: content.replace(/<[^>]+>/g, '').slice(0, 160) + '...',
      author: user ? user.username : 'Guest',
      featuredImage: `https://picsum.photos/id/${Math.floor(Math.random() * 100)}/600/400`,
      published: true
    };

    await api.post('/posts', newPost); 
    alert('Blog Published Successfully! 🎉');
    navigate('/');
  };

  return (
    <div style={{ maxWidth: '900px', margin: '3rem auto', padding: '0 2rem' }}>
      <h1 style={{ textAlign: 'center' }}>Write Your Blog Post</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Blog Title"
          value={title}
          onChange={e => setTitle(e.target.value)}
          style={{ width: '100%', padding: '1rem', fontSize: '1.3rem', marginBottom: '1rem' }}
          required
        />
        <Editor value={content} onChange={setContent} />
        <button type="submit" style={{
          marginTop: '2rem', padding: '1rem 3rem', fontSize: '1.2rem',
          background: '#1a1a1a', color: 'white', border: 'none', borderRadius: '8px'
        }}>
          Publish Post
        </button>
      </form>
    </div>
  );
}