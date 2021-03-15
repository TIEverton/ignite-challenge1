import { useState } from 'react'

import '../styles/tasklist.scss'

import { FiTrash, FiCheckSquare } from 'react-icons/fi'
import toast, { Toaster } from 'react-hot-toast';

interface Task {
  id: number;
  title: string;
  isComplete: boolean;
}

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  function handleCreateNewTask() {
    if (!newTaskTitle) {
      toast.error('A task precisa de um nome! 😥')
      return
    };

    const newTask = {
      id: Math.random(),
      title: newTaskTitle,
      isComplete: false,
    }

    setTasks(oldState => [...oldState, newTask]);
    toast.success('Uma task foi adicionada! 🎉')
    setNewTaskTitle('');
  }

  function handleToggleTaskCompletion(id: number) {
    const newTask = tasks.map(task => task.id === id ? {
      ...task,
      isComplete: !task.isComplete
    } : task)

    tasks.map(task => task.id === id && task.isComplete === false ? (
      toast.success('Você completou uma tarefa! 💥')
    ) : task)

    tasks.map(task => task.id === id && task.isComplete === true ? (
      toast.error('Por que marcou se você não completou?! 😠')
    ) : task)

    setTasks(newTask);
  }

  function handleRemoveTask(id: number) {
    const filteredTasks = tasks.filter(task => task.id !== id);
    toast.success('Você removeu uma task! 💔')
    setTasks(filteredTasks);
  }

  return (
    <>
      <section className="task-list container">
        <header>
          <h2>Minhas tasks</h2>

          <div className="input-group">
            <input
              type="text"
              placeholder="Adicionar novo todo"
              onChange={(e) => setNewTaskTitle(e.target.value)}
              value={newTaskTitle}
            />
            <button type="submit" data-testid="add-task-button" onClick={handleCreateNewTask}>
              <FiCheckSquare size={16} color="#fff" />
            </button>
          </div>
        </header>

        <main>
          <ul>
            {tasks.map(task => (
              <li key={task.id}>
                <div className={task.isComplete ? 'completed' : ''} data-testid="task" >
                  <label className="checkbox-container">
                    <input
                      type="checkbox"
                      readOnly
                      checked={task.isComplete}
                      onClick={() => handleToggleTaskCompletion(task.id)}
                    />
                    <span className="checkmark"></span>
                  </label>
                  <p>{task.title}</p>
                </div>

                <button type="button" data-testid="remove-task-button" onClick={() => handleRemoveTask(task.id)}>
                  <FiTrash size={16} />
                </button>
              </li>
            ))}

          </ul>
        </main>
      </section>
      <Toaster
        toastOptions={{
          duration: 3000,
        }}
        position="top-right"
      />
    </>
  )
}