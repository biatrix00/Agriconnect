import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Forum() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [newPost, setNewPost] = useState({ name: '', message: '' });

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/forum');
      setPosts(response.data);
    } catch (err) {
      setError('Failed to fetch forum posts');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/forum', newPost);
      setNewPost({ name: '', message: '' });
      fetchPosts();
    } catch (err) {
      setError('Failed to create post');
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/forum/${id}`);
      fetchPosts();
    } catch (err) {
      setError('Failed to delete post');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-lg text-gray-600">Loading forum posts...</div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-gray-900">Farmer Forum</h1>

      {error && (
        <div className="bg-red-50 text-red-500 p-4 rounded-lg">
          {error}
        </div>
      )}

      {/* New Post Form */}
      <div className="card">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Create New Post</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              id="name"
              value={newPost.name}
              onChange={(e) => setNewPost({ ...newPost, name: e.target.value })}
              className="input mt-1"
              required
            />
          </div>
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700">
              Message
            </label>
            <textarea
              id="message"
              value={newPost.message}
              onChange={(e) => setNewPost({ ...newPost, message: e.target.value })}
              className="input mt-1"
              rows={4}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Post Message
          </button>
        </form>
      </div>

      {/* Posts List */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-900">Recent Posts</h2>
        {posts.map((post) => (
          <div key={post._id} className="card">
            <div className="flex justify-between items-start">
              <div>
                <div className="font-medium text-gray-900">{post.name}</div>
                <div className="text-sm text-gray-500">
                  {new Date(post.createdAt).toLocaleString()}
                </div>
              </div>
              <button
                onClick={() => handleDelete(post._id)}
                className="text-red-600 hover:text-red-700"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
              </button>
            </div>
            <div className="mt-2 text-gray-600">{post.message}</div>
          </div>
        ))}
      </div>
    </div>
  );
} 