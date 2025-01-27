import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../Pages/AuthPage/AuthContext"; 
import { toast } from "sonner";
import { CheckCircle, Circle, Trash2, Edit } from "lucide-react";

// Supervisor Todo Page Component
const SupervisorTodoPage = () => {
  const [todos, setTodos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentTodo, setCurrentTodo] = useState(null);
  const [commentText, setCommentText] = useState("");
  const { currentUser, isAuthenticated, currentUserLoading } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      fetchTodos();
    }
  }, [isAuthenticated, currentUser]);

  const fetchTodos = async () => {
    setIsLoading(true);
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(
        `http://localhost:5000/todos/api/todos/${currentUser._id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setTodos(response.data);
    } catch (error) {
      console.error("Error fetching todos:", error);
      toast.error("Failed to load todos");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCommentSubmit = async (todoId) => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.post(
        `http://localhost:5000/todos/api/supervisor/todos/${todoId}/comments`,
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
      setCommentText(""); // Clear the comment input
    } catch (error) {
      console.error("Error adding comment:", error);
      toast.error("Failed to add comment");
    }
  };

  const handleStatusUpdate = async (todoId, status) => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.put(
        `http://localhost:5000/todos/api/supervisor/todos/${todoId}/status`,
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
      toast.error("Failed to update status");
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
      <h1 className="text-2xl font-bold mb-4">Supervisor Dashboard</h1>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className="bg-white shadow-lg rounded-lg p-4">
          <h2 className="text-xl font-semibold mb-2">Assigned Todos</h2>
          {todos.length === 0 ? (
            <p>No todos assigned to you.</p>
          ) : (
            <ul>
              {todos.map((todo) => (
                <li key={todo._id} className="flex items-center justify-between p-2 border-b">
                  <div className="flex-1">
                    <span className={`font-bold ${todo.completed ? "line-through" : ""}`}>
                      {todo.title}
                    </span>
                    <p>{todo.description}</p>
                    <div className="mt-1">
                      {todo.comments.map((comment, index) => (
                        <p key={index} className="text-gray-500 italic">{comment.text}</p>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center">
                    <button
                      onClick={() => handleStatusUpdate(todo._id, todo.completed ? 'pending' : 'completed')}
                      className={`mr-2 ${todo.completed ? "text-red-500" : "text-green-500"}`}
                    >
                      {todo.completed ? <Circle size={20} /> : <CheckCircle size={20} />}
                    </button>
                    <button
                      onClick={() => handleCommentSubmit(todo._id)}
                      className="text-blue-500 hover:text-blue-600"
                    >
                      Comment
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
      <div className="mt-4">
        <textarea
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          placeholder="Add a comment..."
          className="border rounded w-full p-2"
        />
      </div>
    </div>
  );
};

export default SupervisorTodoPage;