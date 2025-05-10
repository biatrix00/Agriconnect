import React, { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { UserCircle, MessageSquare, Tag, Clock, Flame, ThumbsUp, CheckCircle } from "lucide-react";

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
    bestAnswer: false
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
  }
];

const allTags = Array.from(new Set(questions.flatMap(q => q.tags)));

const Forum = () => {
  const [search, setSearch] = useState("");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [forumQuestions, setForumQuestions] = useState(questions);

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
            className="mt-4 sm:mt-0"
            leftIcon={<MessageSquare className="w-5 h-5" />}
          >
            Post a Question
          </Button>
        </div>

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
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Forum; 