import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../Pages/AuthPage/AuthContext";
import { toast } from "sonner";
import { CheckCircle, Circle } from "lucide-react";

const SupervisorTodoPage = () => {
  const [todos, setTodos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [commentText, setCommentText] = useState("");
  const { isAuthenticated } = useAuth();
  const { id } = useParams(); // Get the ID from URL parameters

  useEffect(() => {
    if (isAuthenticated && id) {
      fetchTodos();
    }
  }, [isAuthenticated, id]);

  const fetchTodos = async () => {
    setIsLoading(true);
    const token = localStorage.getItem("token");
    
    if (!token) {
      toast.error("Authentication token not found");
      setIsLoading(false);
      return;
    }

    try {
      const response = await axios.get(
        `https://todo-fn88.onrender.com/todos/api/todos/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setTodos(Array.isArray(response.data) ? response.data : [response.data]);
    } catch (error) {
      console.error("Error fetching todos:", error);
      toast.error(error.response?.data?.message || "Failed to load todos");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCommentSubmit = async (todoId) => {
    if (!commentText.trim()) {
      toast.error("Please enter a comment");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Authentication token not found");
      return;
    }

    try {
      const response = await axios.post(
        `https://todo-fn88.onrender.com/todos/api/supervisor/todos/${todoId}/comments`,
        { text: commentText },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setTodos((prevTodos) =>
        prevTodos.map((todo) =>
          todo._id === response.data._id ? response.data : todo
        )
      );
      toast.success("Comment added successfully!");
      setCommentText("");
    } catch (error) {
      console.error("Error adding comment:", error);
      toast.error(error.response?.data?.message || "Failed to add comment");
    }
  };

  const handleStatusUpdate = async (todoId, status) => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Authentication token not found");
      return;
    }

    try {
      const response = await axios.put(
        `https://todo-fn88.onrender.com/todos/api/supervisor/todos/${todoId}/status`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setTodos((prevTodos) =>
        prevTodos.map((todo) =>
          todo._id === response.data._id ? response.data : todo
        )
      );
      toast.success("Status updated successfully!");
    } catch (error) {
      console.error("Error updating status:", error);
      toast.error(error.response?.data?.message || "Failed to update status");
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <p className="text-red-500">Please log in to view this page.</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
      <h1 className="text-2xl font-bold mb-4">Supervisor Dashboard</h1>
      {isLoading ? (
        <div className="flex justify-center items-center h-32">
          <p>Loading...</p>
        </div>
      ) : (
        <div className="bg-white shadow-lg rounded-lg p-4">
          <h2 className="text-xl font-semibold mb-2">Assigned Todos</h2>
          {todos.length === 0 ? (
            <p>No todos found.</p>
          ) : (
            <>
              <ul className="space-y-4">
                {todos.map((todo) => (
                  <li
                    key={todo._id}
                    className="flex flex-col p-4 border rounded-lg"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h3
                          className={`text-lg font-semibold ${
                            todo.completed ? "line-through text-gray-500" : ""
                          }`}
                        >
                          {todo.title}
                        </h3>
                        <p className="text-gray-600 mt-1">{todo.description}</p>
                      </div>
                      <button
                        onClick={() =>
                          handleStatusUpdate(
                            todo._id,
                            todo.completed ? "pending" : "completed"
                          )
                        }
                        className={`ml-4 p-2 rounded-full hover:bg-gray-100 ${
                          todo.completed ? "text-gray-500" : "text-green-500"
                        }`}
                      >
                        {todo.completed ? (
                          <Circle className="w-6 h-6" />
                        ) : (
                          <CheckCircle className="w-6 h-6" />
                        )}
                      </button>
                    </div>
                    <div className="mt-4">
                      <div className="space-y-2">
                        {todo.comments.map((comment, index) => (
                          <div
                            key={index}
                            className="bg-gray-50 p-2 rounded text-gray-600 italic"
                          >
                            {comment.text}
                          </div>
                        ))}
                      </div>
                      <div className="mt-4 flex gap-2">
                        <textarea
                          value={commentText}
                          onChange={(e) => setCommentText(e.target.value)}
                          placeholder="Add a comment..."
                          className="flex-1 border rounded p-2 min-h-[60px]"
                        />
                        <button
                          onClick={() => handleCommentSubmit(todo._id)}
                          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                        >
                          Comment
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default SupervisorTodoPage;