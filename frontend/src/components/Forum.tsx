import { Button } from "./ui/button";

interface Question {
  id: number;
  title: string;
  tags: string[];
  author: string;
  replies: number;
  lastActivity: string;
}

const questions: Question[] = [
  {
    id: 1,
    title: "Best practices for organic farming in dry regions?",
    tags: ["organic", "dry-farming", "tips"],
    author: "Rajesh Kumar",
    replies: 12,
    lastActivity: "2 hours ago"
  },
  {
    id: 2,
    title: "How to deal with pest infestation in tomato crops?",
    tags: ["pests", "tomatoes", "disease"],
    author: "Priya Singh",
    replies: 8,
    lastActivity: "5 hours ago"
  },
  {
    id: 3,
    title: "Recommended irrigation systems for small farms",
    tags: ["irrigation", "equipment", "water-management"],
    author: "Amit Patel",
    replies: 15,
    lastActivity: "1 day ago"
  }
];

const Forum = () => {
  return (
    <div className="bg-gradient-to-b from-gray-50 to-white py-16 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-12">
          <div>
            <h2 className="text-4xl font-bold text-gray-800 mb-2">Farmer's Forum</h2>
            <p className="text-gray-600">Join the discussion and share your farming experiences</p>
          </div>
          <Button 
            variant="gradient"
            size="lg"
            className="mt-4 sm:mt-0"
            leftIcon={
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
            }
          >
            Post a Question
          </Button>
        </div>
        <div className="space-y-6">
          {questions.map((question) => (
            <div 
              key={question.id} 
              className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2 hover:text-green-600 transition-colors cursor-pointer">
                    {question.title}
                  </h3>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {question.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 bg-green-50 text-green-600 rounded-full text-sm font-medium hover:bg-green-100 transition-colors cursor-pointer"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span className="flex items-center gap-1">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                      </svg>
                      {question.author}
                    </span>
                    <span className="flex items-center gap-1">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
                      </svg>
                      {question.replies} replies
                    </span>
                    <span className="flex items-center gap-1">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                      </svg>
                      {question.lastActivity}
                    </span>
                  </div>
                </div>
                <Button 
                  variant="outline"
                  className="text-green-600 border-green-600 hover:bg-green-50"
                >
                  View Discussion
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Forum; 