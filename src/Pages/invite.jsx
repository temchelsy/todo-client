


import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "./AuthPage/AuthContext";
import { toast } from "sonner";
import { CheckCircle, Circle } from "lucide-react";

const SupervisorTodoPage = () => {
  const [todo, setTodo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [commentText, setCommentText] = useState("");
  const { isAuthenticated } = useAuth();
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated && id) {
      fetchTodo();
    }
  }, [isAuthenticated, id]);

  const fetchTodo = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    try {
      const response = await axios.get(
        `https://todo-fn88.onrender.com/api/supervisor/todos/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      setTodo(response.data);
    } catch (error) {
      const errorMessage = error.response?.data?.error || "Failed to load todo";
      toast.error(errorMessage);
      if (error.response?.status === 401) {
        navigate("/login");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleCommentSubmit = async () => {
    if (!commentText.trim()) {
      toast.error("Please enter a comment");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    try {
      const response = await axios.post(
        `https://todo-fn88.onrender.com/api/supervisor/todos/${id}/comments`,
        { text: commentText },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      setTodo(response.data);
      setCommentText("");
      toast.success("Comment added successfully");
    } catch (error) {
      toast.error(error.response?.data?.error || "Failed to add comment");
    }
  };

  const handleStatusUpdate = async (status) => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    try {
      const response = await axios.put(
        `https://todo-fn88.onrender.com/api/supervisor/todos/${id}/status`,
        { status },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      setTodo(response.data);
      toast.success("Status updated successfully");
    } catch (error) {
      toast.error(error.response?.data?.error || "Failed to update status");
    }
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        {isLoading ? (
          <div className="p-6 text-center">
            <p className="text-gray-500">Loading...</p>
          </div>
        ) : !todo ? (
          <div className="p-6 text-center">
            <p className="text-gray-500">Todo not found or access denied</p>
          </div>
        ) : (
          <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">{todo.title}</h1>
            
            {/* Todo Details */}
            <div className="mb-6">
              <p className="text-gray-600">{todo.description}</p>
              <div className="mt-4 flex items-center justify-between">
                <span className="text-sm text-gray-500">
                  Status: {todo.status || (todo.completed ? "Completed" : "Pending")}
                </span>
                <button
                  onClick={() => handleStatusUpdate(todo.completed ? "pending" : "completed")}
                  className={`p-2 rounded-full transition-colors ${
                    todo.completed ? "text-gray-400 hover:text-gray-600" : "text-green-500 hover:text-green-600"
                  }`}
                >
                  {todo.completed ? (
                    <Circle className="w-6 h-6" />
                  ) : (
                    <CheckCircle className="w-6 h-6" />
                  )}
                </button>
              </div>
            </div>

            {/* Comments Section */}
            <div className="space-y-4">
              <h2 className="text-lg font-semibold">Comments</h2>
              
              {/* Existing Comments */}
              <div className="space-y-3">
                {todo.comments?.map((comment, index) => (
                  <div key={index} className="bg-gray-50 rounded-lg p-3">
                    <p className="text-sm text-gray-500 mb-1">
                      {comment.author === 'supervisor' ? 'You' : 'User'}:
                    </p>
                    <p className="text-gray-700">{comment.text}</p>
                  </div>
                ))}
              </div>

              {/* New Comment Form */}
              <div className="mt-4">
                <textarea
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  placeholder="Add your comment..."
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  rows="3"
                />
                <button
                  onClick={handleCommentSubmit}
                  className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                  Add Comment
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SupervisorTodoPage;