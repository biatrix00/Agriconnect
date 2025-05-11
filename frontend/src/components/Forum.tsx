import React, { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { UserCircle, MessageSquare, Tag, Clock, Flame, ThumbsUp, CheckCircle, X } from "lucide-react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

interface Answer {
  id: number;
  author: string;
  avatarUrl?: string;
  content: string;
  replies?: Answer[];
}

interface Question {
  id: number;
  title: string;
  tags: string[];
  author: string;
  replies: number;
  lastActivity: string;
  avatarUrl?: string;
  latestReply?: string;
  upvotes?: number;
  bestAnswer?: boolean;
  answers?: Answer[];
  description?: string;
}

const questions: Question[] = [
  {
    id: 1,
    title: "Best practices for organic farming in dry regions?",
    tags: ["organic", "dry-farming", "tips"],
    author: "Rajesh Kumar",
    replies: 12,
    lastActivity: "2 hours ago",
    avatarUrl: "https://randomuser.me/api/portraits/men/32.jpg",
    latestReply: "Try mulching and drip irrigation for best results.",
    upvotes: 5,
    bestAnswer: false,
    answers: [
      {
        id: 1,
        author: "Priya Singh",
        avatarUrl: "https://randomuser.me/api/portraits/women/44.jpg",
        content: "Try mulching and drip irrigation for best results.",
        replies: [
          {
            id: 2,
            author: "Rajesh Kumar",
            avatarUrl: "https://randomuser.me/api/portraits/men/32.jpg",
            content: "Thank you! I'll try that.",
          }
        ]
      }
    ]
  },
  {
    id: 2,
    title: "How to deal with pest infestation in tomato crops?",
    tags: ["pests", "tomatoes", "disease"],
    author: "Priya Singh",
    replies: 0,
    lastActivity: "5 hours ago",
    avatarUrl: "https://randomuser.me/api/portraits/women/44.jpg",
    latestReply: "",
    upvotes: 1,
    bestAnswer: false
  },
  {
    id: 3,
    title: "Recommended irrigation systems for small farms",
    tags: ["irrigation", "equipment", "water-management"],
    author: "Amit Patel",
    replies: 15,
    lastActivity: "1 day ago",
    avatarUrl: "https://randomuser.me/api/portraits/men/65.jpg",
    latestReply: "Drip irrigation is cost-effective and efficient.",
    upvotes: 8,
    bestAnswer: true
  },
  {
    id: 4,
    title: "What are the best high-yield rice varieties for monsoon?",
    tags: ["rice", "varieties", "monsoon"],
    author: "Sunita Rao",
    replies: 3,
    lastActivity: "3 hours ago",
    avatarUrl: "https://randomuser.me/api/portraits/women/55.jpg",
    latestReply: "Try IR64 and Swarna for good results.",
    upvotes: 2,
    bestAnswer: false
  },
  {
    id: 5,
    title: "How to get government subsidies for farm equipment?",
    tags: ["government", "subsidy", "equipment"],
    author: "Vikram Desai",
    replies: 5,
    lastActivity: "6 hours ago",
    avatarUrl: "https://randomuser.me/api/portraits/men/77.jpg",
    latestReply: "Check your state agriculture portal for schemes.",
    upvotes: 4,
    bestAnswer: false
  },
  {
    id: 6,
    title: "Organic vs chemical fertilizers: which is better?",
    tags: ["fertilizer", "organic", "chemicals"],
    author: "Meena Sharma",
    replies: 7,
    lastActivity: "8 hours ago",
    avatarUrl: "https://randomuser.me/api/portraits/women/68.jpg",
    latestReply: "Organic is safer for long-term soil health.",
    upvotes: 6,
    bestAnswer: false
  },
  {
    id: 7,
    title: "How to protect crops from unseasonal rain?",
    tags: ["weather", "protection", "rain"],
    author: "Ramesh Yadav",
    replies: 2,
    lastActivity: "10 hours ago",
    avatarUrl: "https://randomuser.me/api/portraits/men/80.jpg",
    latestReply: "Use plastic mulch and quick drainage.",
    upvotes: 3,
    bestAnswer: false
  },
  {
    id: 8,
    title: "Best mobile apps for farm management?",
    tags: ["technology", "apps", "management"],
    author: "Kavita Joshi",
    replies: 4,
    lastActivity: "12 hours ago",
    avatarUrl: "https://randomuser.me/api/portraits/women/81.jpg",
    latestReply: "Try Kisan Suvidha and AgriApp.",
    upvotes: 5,
    bestAnswer: false
  },
  {
    id: 9,
    title: "How to market produce directly to consumers?",
    tags: ["marketing", "direct-sales", "consumers"],
    author: "Suresh Kumar",
    replies: 9,
    lastActivity: "1 day ago",
    avatarUrl: "https://randomuser.me/api/portraits/men/90.jpg",
    latestReply: "Use local WhatsApp groups and online platforms.",
    upvotes: 7,
    bestAnswer: false
  },
  {
    id: 10,
    title: "Tips for water conservation in drought-prone areas?",
    tags: ["water", "conservation", "drought"],
    author: "Anjali Verma",
    replies: 6,
    lastActivity: "2 days ago",
    avatarUrl: "https://randomuser.me/api/portraits/women/92.jpg",
    latestReply: "Rainwater harvesting and drip irrigation help a lot.",
    upvotes: 6,
    bestAnswer: false
  }
];

const allTags = Array.from(new Set(questions.flatMap(q => q.tags)));

const Forum = () => {
  const [search, setSearch] = useState("");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [forumQuestions, setForumQuestions] = useState(questions);
  const [showModal, setShowModal] = useState(false);
  const [newQuestion, setNewQuestion] = useState({
    title: '',
    tags: '',
    description: ''
  });
  const [replyingTo, setReplyingTo] = useState<{questionId: number, answerId: number | null} | null>(null);
  const [replyContent, setReplyContent] = useState('');

  const filteredQuestions = questions.filter(q => {
    const matchesSearch = q.title.toLowerCase().includes(search.toLowerCase());
    const matchesTag = selectedTag ? q.tags.includes(selectedTag) : true;
    return matchesSearch && matchesTag;
  });

  const handleUpvote = (id: number) => {
    setForumQuestions(prev => prev.map(q => q.id === id ? { ...q, upvotes: (q.upvotes || 0) + 1 } : q));
  };

  const handleBestAnswer = (id: number) => {
    setForumQuestions(prev => prev.map(q => q.id === id ? { ...q, bestAnswer: true } : { ...q, bestAnswer: false }));
  };

  const handlePostQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newQuestion.title.trim()) return;
    setForumQuestions(prev => [
      {
        id: prev.length + 1,
        title: newQuestion.title,
        tags: newQuestion.tags.split(',').map(t => t.trim()),
        author: 'You',
        replies: 0,
        lastActivity: 'just now',
        avatarUrl: 'https://randomuser.me/api/portraits/lego/1.jpg',
        latestReply: '',
        upvotes: 0,
        bestAnswer: false
      },
      ...prev
    ]);
    setShowModal(false);
    setNewQuestion({ title: '', tags: '', description: '' });
  };

  const handlePostReply = (questionId: number, answerId: number | null) => {
    setForumQuestions(prev => prev.map(q => {
      if (q.id !== questionId) return q;
      if (answerId === null) return q; // Only support replies to answers for now
      return {
        ...q,
        answers: q.answers?.map(a => {
          if (a.id !== answerId) return a;
          return {
            ...a,
            replies: [
              ...(a.replies || []),
              {
                id: Date.now(),
                author: 'You',
                avatarUrl: 'https://randomuser.me/api/portraits/lego/2.jpg',
                content: replyContent
              }
            ]
          };
        })
      };
    }));
    setReplyingTo(null);
    setReplyContent('');
  };

  return (
    <div className="bg-gradient-to-b from-gray-50 to-white py-16 px-4 min-h-screen">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
          <div>
            <h2 className="text-4xl font-bold text-gray-800 mb-2">Farmer's Forum</h2>
            <p className="text-gray-600">Join the discussion and share your farming experiences</p>
          </div>
          <Button 
            variant="gradient"
            size="lg"
            className="mt-4 sm:mt-0 flex items-center gap-2"
            onClick={() => setShowModal(true)}
          >
            <MessageSquare className="w-5 h-5" /> Post a Question
          </Button>
        </div>

        {/* Post a Question Modal */}
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
            <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-lg relative animate-fade-in-up">
              <button className="absolute top-4 right-4 text-gray-400 hover:text-red-500" onClick={() => setShowModal(false)}>
                <X className="w-6 h-6" />
              </button>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">Post a New Question</h3>
              <form onSubmit={handlePostQuestion} className="space-y-4">
                <div>
                  <label className="block text-gray-700 font-medium mb-1">Title</label>
                  <Input
                    type="text"
                    value={newQuestion.title}
                    onChange={e => setNewQuestion(q => ({ ...q, title: e.target.value }))}
                    placeholder="Enter your question title"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-1">Tags (comma separated)</label>
                  <Input
                    type="text"
                    value={newQuestion.tags}
                    onChange={e => setNewQuestion(q => ({ ...q, tags: e.target.value }))}
                    placeholder="e.g. irrigation, wheat, organic"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-1">Description</label>
                  <div className="bg-white border rounded-lg">
                    <ReactQuill
                      value={newQuestion.description}
                      onChange={value => setNewQuestion(q => ({ ...q, description: value }))}
                      theme="snow"
                      className="min-h-[100px]"
                    />
                  </div>
                </div>
                <Button type="submit" variant="gradient" className="w-full">Post Question</Button>
              </form>
            </div>
          </div>
        )}

        {/* Search and Tag Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-8 items-center">
          <Input
            type="text"
            placeholder="Search questions..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full md:w-1/2"
          />
          <div className="flex flex-wrap gap-2">
            <span className="text-gray-500 mr-2">Filter by tag:</span>
            <button
              className={`px-3 py-1 rounded-full border ${selectedTag === null ? 'bg-green-600 text-white' : 'bg-white text-green-600 border-green-200'} font-medium transition-colors`}
              onClick={() => setSelectedTag(null)}
            >
              All
            </button>
            {allTags.map(tag => (
              <button
                key={tag}
                className={`px-3 py-1 rounded-full border ${selectedTag === tag ? 'bg-green-600 text-white' : 'bg-white text-green-600 border-green-200'} font-medium transition-colors`}
                onClick={() => setSelectedTag(tag)}
              >
                #{tag}
              </button>
            ))}
          </div>
        </div>

        {/* Questions List */}
        <div className="space-y-6">
          {filteredQuestions.length === 0 && (
            <div className="text-center text-gray-500 py-12">
              <p>No questions found. Try a different search or tag.</p>
            </div>
          )}
          {filteredQuestions.map((question) => {
            const q = forumQuestions.find(fq => fq.id === question.id) || question;
            return (
              <div 
                key={q.id} 
                className={`bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border-l-4 ${q.replies === 0 ? 'border-red-400' : 'border-green-400'} ${q.bestAnswer ? 'ring-2 ring-green-400' : ''}`}
            >
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div className="flex items-center gap-4 mb-4 sm:mb-0">
                    <img
                      src={q.avatarUrl}
                      alt={q.author}
                      className="w-12 h-12 rounded-full border-2 border-green-200 object-cover"
                    />
                    <div>
                      <h3 className="text-xl font-semibold text-gray-800 mb-1 hover:text-green-600 transition-colors cursor-pointer flex items-center gap-2">
                        {q.title}
                        {q.bestAnswer && (
                          <span className="inline-flex items-center gap-1 text-green-600 text-base font-semibold ml-2">
                            <CheckCircle className="w-5 h-5" /> Best Answer
                          </span>
                        )}
                  </h3>
                      <div className="flex flex-wrap gap-2 mb-2">
                        {q.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 bg-green-50 text-green-600 rounded-full text-sm font-medium hover:bg-green-100 transition-colors cursor-pointer"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                      <div className="flex items-center gap-3 text-sm text-gray-500">
                    <span className="flex items-center gap-1">
                          <UserCircle className="w-4 h-4" />
                          {q.author}
                    </span>
                    <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {q.lastActivity}
                    </span>
                    <span className="flex items-center gap-1">
                          <MessageSquare className="w-4 h-4" />
                          {q.replies} replies
                        </span>
                        {q.replies === 0 && (
                          <span className="flex items-center gap-1 text-red-500 font-semibold">
                            <Flame className="w-4 h-4" /> Unanswered
                    </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 items-end">
                <Button 
                  variant="outline"
                      className="text-green-600 border-green-600 hover:bg-green-50 flex items-center gap-2"
                      onClick={() => handleUpvote(q.id)}
                    >
                      <ThumbsUp className="w-4 h-4" /> Upvote ({q.upvotes || 0})
                    </Button>
                    <Button
                      variant="ghost"
                      className="text-green-700 hover:bg-green-50 flex items-center gap-2"
                      onClick={() => handleBestAnswer(q.id)}
                      disabled={q.bestAnswer}
                    >
                      <CheckCircle className="w-4 h-4" /> Mark as Best
                </Button>
              </div>
                </div>
                {/* Latest Reply Preview */}
                {q.latestReply && (
                  <div className="mt-4 pl-16 text-gray-700 italic border-l-2 border-green-100">
                    <span className="text-green-600 font-medium mr-2">Latest:</span>
                    {q.latestReply}
                  </div>
                )}
                {q.answers && q.answers.length > 0 && (
                  <div className="mt-6 pl-8 border-l-2 border-green-100 space-y-6">
                    {q.answers.map(answer => (
                      <div key={answer.id} className="bg-green-50 rounded-lg p-4 mb-2">
                        <div className="flex items-center gap-3 mb-2">
                          <img src={answer.avatarUrl} alt={answer.author} className="w-8 h-8 rounded-full border border-green-200" />
                          <span className="font-semibold text-green-800">{answer.author}</span>
                        </div>
                        <div className="text-gray-800 mb-2" dangerouslySetInnerHTML={{ __html: answer.content }} />
                        {/* Replies to this answer */}
                        {answer.replies && answer.replies.length > 0 && (
                          <div className="pl-8 border-l-2 border-green-200 space-y-2">
                            {answer.replies.map(reply => (
                              <div key={reply.id} className="flex items-center gap-2 text-sm text-gray-700">
                                <img src={reply.avatarUrl} alt={reply.author} className="w-6 h-6 rounded-full border border-green-100" />
                                <span className="font-semibold">{reply.author}:</span>
                                <span dangerouslySetInnerHTML={{ __html: reply.content }} />
                              </div>
                            ))}
                          </div>
                        )}
                        {/* Reply form */}
                        {replyingTo && replyingTo.questionId === q.id && replyingTo.answerId === answer.id ? (
                          <form onSubmit={e => { e.preventDefault(); handlePostReply(q.id, answer.id); }} className="mt-2 flex flex-col gap-2">
                            <div className="bg-white border rounded-lg">
                              <ReactQuill
                                value={replyContent}
                                onChange={setReplyContent}
                                theme="snow"
                                className="min-h-[60px]"
                              />
                            </div>
                            <div className="flex gap-2 mt-2">
                              <Button type="submit" variant="gradient">Reply</Button>
                              <Button type="button" variant="ghost" onClick={() => setReplyingTo(null)}>Cancel</Button>
                            </div>
                          </form>
                        ) : (
                          <Button variant="ghost" size="sm" className="mt-2" onClick={() => setReplyingTo({questionId: q.id, answerId: answer.id})}>Reply</Button>
                        )}
            </div>
          ))}
                  </div>
                )}
                {q.description && (
                  <div className="mt-2 prose prose-green max-w-none" dangerouslySetInnerHTML={{ __html: q.description }} />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Forum; 