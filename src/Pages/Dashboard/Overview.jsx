import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../AuthPage/AuthContext";
import { CheckCircle, Clock, List, Circle, Trash2, Edit } from "lucide-react"; 
import TodoModal from "../../Components/Modals/Todo";
import { toast } from "sonner";

const Overview = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [todos, setTodos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { isAuthenticated, currentUser, currentUserLoading } = useAuth();
  const [editingTodo, setEditingTodo] = useState(null);

  useEffect(() => {
    fetchTodos();
  }, [currentUser, isAuthenticated]);

  const fetchTodos = async () => {
    if (currentUserLoading || !isAuthenticated) return;
    
    const token = localStorage.getItem("token");
    if (!token) return;

    setIsLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:5000/todos/api/todos/${currentUser._id}`,
        {
          headers: { Authorization: `Bearer ${token}` }
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

  const handleAddTodos = async (newTodo) => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.post(
        "http://localhost:5000/todos/api/todos",
        newTodo,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      setTodos(prevTodos => [response.data, ...prevTodos]);
      toast.success("Todo added successfully!");
      return response.data;
    } catch (error) {
      console.error("Error adding todo:", error.response?.data || error.message);
      toast.error("Failed to add todo");
      throw error;
    }
  };

  const handleEditTodo = async (todoId, updatedData) => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const response = await axios.put(
        `http://localhost:5000/todos/api/todos/${todoId}`,
        updatedData,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      setTodos(prevTodos =>
        prevTodos.map(todo =>
          todo._id === todoId ? { ...todo, ...response.data } : todo
        )
      );
      toast.success("Todo updated successfully!");
      setEditingTodo(null);
    } catch (error) {
      console.error("Error updating todo:", error);
      toast.error("Failed to update todo");
      throw error;
    }
  };

  const toggleTodoCompletion = async (index) => {
    const updatedTodos = [...todos];
    updatedTodos[index].completed = !updatedTodos[index].completed;

    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const response = await axios.put(
        `http://localhost:5000/todos/api/todos/${updatedTodos[index]._id}`,
        updatedTodos[index],
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      setTodos(prevTodos =>
        prevTodos.map(todo =>
          todo._id === response.data._id ? response.data : todo
        )
      );
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  const handleDeleteTodo = async (todoId) => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      await axios.delete(`http://localhost:5000/todos/api/todos/${todoId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setTodos(prevTodos => prevTodos.filter(todo => todo._id !== todoId));
      toast.success("Todo deleted successfully!");
    } catch (error) {
      console.error("Delete todo error:", error);
      toast.error("Failed to delete todo");
    }
  };

  const toggleSubtaskVisibility = (index) => {
    const updatedTodos = [...todos];
    updatedTodos[index].showSubtasks = !updatedTodos[index].showSubtasks;
    setTodos(updatedTodos);
  };

  const remainingTodos = todos.filter(todo => !todo.completed);
  const completedTodosList = todos.filter(todo => todo.completed);

  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-center justify-between mb-4 gap-4">
        <h1 className="text-2xl font-bold text-center sm:text-left w-full">Overview</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-green-800 text-white px-4 py-2 rounded-lg transition hover:bg-green-900 w-full sm:w-auto"
        >
          Add Todo
        </button>
      </div>

      {/* Add Todo Modal */}
      <TodoModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddTodos={handleAddTodos}
      />

      {/* Edit Todo Modal */}
      {editingTodo && (
        <>
          <div className="fixed inset-0 bg-black/30 z-40" onClick={() => setEditingTodo(null)} />
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4" onClick={e => e.stopPropagation()}>
              <h2 className="text-xl font-bold mb-4">Edit Todo</h2>
              <form onSubmit={(e) => {
                e.preventDefault();
                handleEditTodo(editingTodo._id, {
                  title: e.target.title.value,
                  description: e.target.description.value
                });
              }} className="space-y-4">
                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                    Title
                  </label>
                  <input
                    id="title"
                    type="text"
                    defaultValue={editingTodo.title}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    id="description"
                    defaultValue={editingTodo.description}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    rows={4}
                  />
                </div>
                <div className="flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setEditingTodo(null)}
                    className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-green-800 text-white rounded-md hover:bg-green-900"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        </>
      )}

      {/* Stats Section */}
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4 w-full">
        <div className="flex flex-col items-center p-4 bg-gray-100 rounded-lg shadow-md">
          <Clock size={32} className="text-yellow-500 mb-4" />
          <h3 className="text-xl font-semibold">
            Pending ({remainingTodos.length})
          </h3>
        </div>

        <div className="flex flex-col items-center p-4 bg-gray-100 rounded-lg shadow-md">
          <CheckCircle size={32} className="text-green-500 mb-4" />
          <h3 className="text-xl font-semibold">
            Completed ({completedTodosList.length})
          </h3>
        </div>

        <div className="flex flex-col items-center p-4 bg-gray-100 rounded-lg shadow-md">
          <List size={32} className="text-blue-500 mb-4" />
          <h3 className="text-xl font-semibold">
            Total Todos ({todos.length})
          </h3>
        </div>
      </div>

      {/* Todos List */}
      <div className="mt-6 bg-custom-gradient shadow-lg rounded-lg p-4 sm:p-6 w-full">
        <h3 className="text-2xl font-semibold text-gray-800 mb-4">Your Todos</h3>
        {todos.length === 0 ? (
          <p className="text-center text-gray-500">No todos yet. Add a todo to get started!</p>
        ) : (
          <ul className="space-y-4">
            {todos.map((todo, index) => (
              <li
                key={todo._id || index}
                className={`flex flex-col p-4 rounded-md transition-all duration-200 
                  ${todo.completed ? "bg-gray-200" : "bg-white"} 
                  hover:shadow-lg border border-gray-200 w-full`}
              >
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-7">
                  <div className="flex items-center w-full gap-3">
                    <button
                      onClick={() => toggleTodoCompletion(index)}
                      className="focus:outline-none shrink-0"
                    >
                      {todo.completed ? (
                        <CheckCircle className="w-6 h-6 text-green-500 cursor-pointer" />
                      ) : (
                        <Circle className="w-6 h-6 text-gray-400 cursor-pointer" />
                      )}
                    </button>
                    <div
                      className={`flex-1 ${
                        todo.completed
                          ? "text-gray-500 line-through"
                          : "text-gray-800"
                      } transition-all w-full`}
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                        <span className="font-bold text-lg mb-2 sm:mb-0">
                          {todo.title}
                        </span>
                        
                        <div className="flex flex-wrap gap-2 items-center justify-start sm:justify-end">
                          {todo.priority && (
                            <span
                              className={`px-2 py-1 rounded-full text-white text-xs
                                ${
                                  todo.priority === "high"
                                    ? "bg-red-500"
                                    : todo.priority === "medium"
                                    ? "bg-yellow-500"
                                    : "bg-green-500"
                                }`}
                            >
                              {todo.priority.charAt(0).toUpperCase() +
                                todo.priority.slice(1)}
                            </span>
                          )}

                          {todo.dueDate && (
                            <span className="px-2 py-1 rounded-lg bg-gray-200 text-gray-700 text-xs">
                              Due: {new Date(todo.dueDate).toLocaleDateString()}
                            </span>
                          )}
                        </div>
                      </div>

                      {todo.description && (
                        <span className="block mt-2 text-sm text-gray-600">
                          {todo.description}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 sm:gap-4 w-full sm:w-auto justify-between sm:justify-end">
                    {todo.subtodos && todo.subtodos.length > 0 && (
                      <button
                        className="bg-blue-500 text-white rounded-full px-3 py-1 text-sm hover:bg-blue-600 transition-colors"
                        onClick={() => toggleSubtaskVisibility(index)}
                      >
                        {todo.subtodos.length} sub Task
                      </button>
                    )}
                    <button
                      onClick={() => setEditingTodo(todo)}
                      className="text-blue-500 hover:text-blue-600"
                    >
                      <Edit size={20} />
                    </button>
                    <button
                      onClick={() => handleDeleteTodo(todo._id)}
                      className="text-red-500 hover:text-red-600"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>

                {todo.showSubtasks && todo.subtodos && (
                  <div className="mt-4 ml-9">
                    <h4 className="font-semibold text-gray-700 mb-2">
                      Subtasks:
                    </h4>
                    <ul className="space-y-2">
                      {todo.subtodos.map((subtask, subIndex) => (
                        <li
                          key={subIndex}
                          className={`flex items-center gap-3 text-gray-600 
                            ${subtask.completed ? "line-through" : ""}`}
                        >
                          <div className="w-1.5 h-1.5 bg-gray-400 rounded-full"></div>
                          {subtask.title}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Overview;