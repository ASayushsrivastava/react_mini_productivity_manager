import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Todo } from "../types/Todo";

function TasksManager() {
  const [tasks, setTasks] = useState<Todo[]>([
    { id: 1, text: "Learn React", completed: false },
    { id: 2, text: "Practice TypeScript", completed: false },
  ]);
  const [newTask, setNewTask] = useState("");
  const [search, setSearch] = useState("");

  const inputRef = useRef<HTMLInputElement>(null);

  //On mount - auto focus
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  //add task
  const addTask = useCallback(() => {
    if (newTask.trim() === "") return;
    setTasks((prev) => [
      ...prev,
      { id: tasks.length + 1, text: newTask, completed: false },
    ]);
    setNewTask("");
  }, [newTask]);

  //toogle fnction
  const toggleTask = useCallback((id: number) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  }, []);

  //search with memo
  const filteredTasks = useMemo(() => {
    return tasks.filter((t) =>
      t.text.toLowerCase().includes(search.toLowerCase())
    );
  }, [tasks, search]);

  //task productivity score
  const prodScore = useMemo(() => {
    const completed = tasks.filter((t) => t.completed).length;
    return Math.round((completed / tasks.length) * 100);
  }, [tasks]);

  // component
  return (
    <div>
      <h2>Tasks Manager</h2>
      <input
        type="text"
        ref={inputRef}
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        placeholder="Add task..."
      />
      <button onClick={addTask}>Add</button>

      <div style={{ marginTop: 20 }}>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search tasks"
        />
      </div>

      <ul>
        {filteredTasks.map((tasks) => (
          <li
            key={tasks.id}
            onClick={() => toggleTask(tasks.id)}
            style={{
              cursor: "pointer",
              textDecoration: tasks.completed ? "line-through" : "none",
              color: tasks.completed ? "red" : "black",
            }}
          >
            {/* {tasks.text} {tasks.completed ? "✔" : ""} */}
            {tasks.text}
          </li>
        ))}
      </ul>

      <p>
        Productivity Score : <span>{prodScore}%</span>
      </p>
    </div>
  );
}

export default TasksManager;
