import { useState, useEffect, useContext } from 'react';
import { AuthContext } from './context/AuthContext';
import Navbar from './components/Navbar';


const INITIAL_POSTS = [
  {
    id: 1,
    title: "My First Blog Post",
    content: "This is the full content of my first blog. Welcome to my website!",
    excerpt: "This is the full content of my first blog...",
    author: "Ayush",
    featuredImage: "https://picsum.photos/id/1015/600/400",
    date: new Date().toISOString()
  },
  {
    id: 2,
    title: "How I Built This Blog",
    content: "I learned React and now I can build full websites!",
    excerpt: "I learned React and now I can build full websites!",
    author: "Ayush",
    featuredImage: "https://picsum.photos/id/201/600/400",
    date: new Date().toISOString()
  }
];

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedPost, setSelectedPost] = useState(null);
  const [posts, setPosts] = useState([]);


  useEffect(() => {
    const savedPosts = localStorage.getItem('blogPosts');
    if (savedPosts) {
      setPosts(JSON.parse(savedPosts));
    } else {
      setPosts(INITIAL_POSTS);
      localStorage.setItem('blogPosts', JSON.stringify(INITIAL_POSTS));
    }
  }, []);


  const savePosts = (newPosts) => {
    setPosts(newPosts);
    localStorage.setItem('blogPosts', JSON.stringify(newPosts));
  };

  const refreshPosts = () => {

  };

  return (
    <div>
      <Navbar setCurrentPage={setCurrentPage} />

      {}
      {currentPage === 'home' && (
        <HomePage 
          posts={posts} 
          setSelectedPost={setSelectedPost} 
          setCurrentPage={setCurrentPage} 
        />
      )}

      {}
      {currentPage === 'create' && (
        <CreatePostPage 
          posts={posts}
          savePosts={savePosts}
          setCurrentPage={setCurrentPage} 
        />
      )}

      {}
      {currentPage === 'detail' && selectedPost && (
        <PostDetailPage 
          post={selectedPost} 
          setCurrentPage={setCurrentPage} 
        />
      )}
    </div>
  );
}


function HomePage({ posts, setSelectedPost, setCurrentPage }) {
  return (
    <div style={{ padding: '2rem 5%' }}>
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h1 style={{ fontSize: '3rem' }}>Discover Amazing Stories</h1>
      </div>

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', 
        gap: '2rem' 
      }}>
        {posts.map(post => (
          <div 
            key={post.id}
            style={{
              borderRadius: '16px',
              overflow: 'hidden',
              boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
              cursor: 'pointer'
            }}
            onClick={() => {
              setSelectedPost(post);
              setCurrentPage('detail');
            }}
            onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-10px)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
          >
            <div style={{ height: '260px', background: '#ddd' }}>
              <img 
                src={post.featuredImage} 
                style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
              />
            </div>
            <div style={{ padding: '1.5rem' }}>
              <h3>{post.title}</h3>
              <p style={{ 
                color: '#555', 
                display: '-webkit-box',
                WebkitLineClamp: 3,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden'
              }}>
                {post.excerpt}
              </p>
              <small>By {post.author}</small>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}


function CreatePostPage({ posts, savePosts, setCurrentPage }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const { user } = useContext(AuthContext);

  const handlePublish = () => {
    if (!title || !content) return alert("Title and content are required!");

    const newPost = {
      id: Date.now(), 
      title,
      content,
      excerpt: content.slice(0, 160) + '...',
      author: user ? user.username : 'Guest',
      featuredImage: `https://picsum.photos/id/${Math.floor(Math.random() * 100)}/600/400`,
      date: new Date().toISOString()
    };

    const updatedPosts = [newPost, ...posts];
    savePosts(updatedPosts);
    
    alert(' Blog Published Successfully!');
    setCurrentPage('home');
  };

  return (
    <div style={{ maxWidth: '900px', margin: '3rem auto', padding: '0 2rem' }}>
      <h1 style={{ textAlign: 'center' }}>Write Your Blog Post</h1>
      
      <input
        type="text"
        placeholder="Blog Title"
        value={title}
        onChange={e => setTitle(e.target.value)}
        style={{ width: '100%', padding: '1rem', fontSize: '1.3rem', marginBottom: '1rem' }}
      />

      <textarea
        placeholder="Write your story here..."
        value={content}
        onChange={e => setContent(e.target.value)}
        style={{ 
          width: '100%', 
          height: '420px', 
          padding: '1rem', 
          fontSize: '1.1rem',
          border: '2px solid #ddd',
          borderRadius: '8px'
        }}
      />

      <button 
        onClick={handlePublish}
        style={{
          marginTop: '1rem',
          padding: '1rem 3rem',
          fontSize: '1.2rem',
          background: '#1a1a1a',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer'
        }}
      >
        Publish Post
      </button>
    </div>
  );
}

function PostDetailPage({ post, setCurrentPage }) {
  return (
    <div style={{ maxWidth: '800px', margin: '2rem auto', padding: '0 2rem' }}>
      <button 
        onClick={() => setCurrentPage('home')}
        style={{ color: '#e63939', background: 'none', border: 'none', fontSize: '1.1rem', cursor: 'pointer' }}
      >
        ← Back to Home
      </button>

      <h1 style={{ fontSize: '2.8rem', margin: '2rem 0' }}>{post.title}</h1>
      <p style={{ color: '#666' }}>By {post.author} • {new Date(post.date).toLocaleDateString()}</p>

      <div style={{ 
        lineHeight: '1.8', 
        fontSize: '1.15rem',
        whiteSpace: 'pre-wrap' 
      }}>
        {post.content}
      </div>
    </div>
  );
}