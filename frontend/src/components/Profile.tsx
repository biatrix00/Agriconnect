import React, { useState } from 'react';
import { BadgeCheck, Edit, UserCircle, ThumbsUp, MessageSquare } from 'lucide-react';
import { Button } from './ui/button';

const mockUser = {
  name: 'Amit Patel',
  email: 'amit.patel@example.com',
  avatar: 'https://randomuser.me/api/portraits/men/65.jpg',
  badges: ['Top Contributor', 'Verified Farmer'],
  questions: [
    'Recommended irrigation systems for small farms',
    'How to improve soil fertility naturally?'
  ],
  answers: [
    'Drip irrigation is cost-effective and efficient.',
    'Try crop rotation and organic compost.'
  ],
  upvotes: 23
};

const Profile = () => {
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(mockUser.name);
  const [email, setEmail] = useState(mockUser.email);

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white py-16 px-4">
      <div className="container mx-auto max-w-2xl bg-white rounded-2xl shadow-xl p-8">
        <div className="flex flex-col items-center mb-8">
          <img src={mockUser.avatar} alt={name} className="w-24 h-24 rounded-full border-4 border-green-200 mb-4" />
          <h2 className="text-3xl font-bold text-gray-900 mb-1 flex items-center gap-2">
            {name}
            {mockUser.badges.includes('Verified Farmer') && (
              <BadgeCheck className="w-6 h-6 text-green-500" title="Verified Farmer" />
            )}
          </h2>
          <div className="text-gray-600 mb-2">{email}</div>
          <div className="flex gap-2 mb-2">
            {mockUser.badges.map(badge => (
              <span key={badge} className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                <BadgeCheck className="w-4 h-4" /> {badge}
              </span>
            ))}
          </div>
          <Button variant="outline" className="flex items-center gap-2" onClick={() => setEditing(!editing)}>
            <Edit className="w-4 h-4" /> {editing ? 'Cancel' : 'Edit Profile'}
          </Button>
        </div>
        {editing ? (
          <form className="space-y-4 mb-8">
            <div>
              <label className="block text-gray-700 font-medium mb-1">Name</label>
              <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1">Email</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
              />
            </div>
            <Button type="button" variant="gradient" onClick={() => setEditing(false)}>
              Save Changes
            </Button>
          </form>
        ) : null}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2 flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-green-600" /> My Questions
            </h3>
            <ul className="list-disc list-inside text-gray-700">
              {mockUser.questions.map(q => (
                <li key={q}>{q}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2 flex items-center gap-2">
              <ThumbsUp className="w-5 h-5 text-green-600" /> My Answers
            </h3>
            <ul className="list-disc list-inside text-gray-700">
              {mockUser.answers.map(a => (
                <li key={a}>{a}</li>
              ))}
            </ul>
            <div className="mt-4 text-green-700 font-semibold flex items-center gap-2">
              <ThumbsUp className="w-4 h-4" /> Upvotes: {mockUser.upvotes}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile; 