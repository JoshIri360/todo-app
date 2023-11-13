import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "./components/ui/button";
import { Minus, Plus } from "lucide-react";
import { motion } from "framer-motion";

import "./App.css";

const svgVariants = {
  hidden: { rotate: -180, scale: 0, y: 1 },
  visible: {
    rotate: 0,
    y: [5, -2, 3, 0],
    transition: { duration: 0.5 },
    scale: [1.4, 1],
  },
};

const pathVariants = {
  hidden: { opacity: 0, pathLength: 0 },
  visible: {
    opacity: 1,
    pathLength: 1,
    transition: { duration: 0.5, ease: "easeInOut" },
  },
};

const App = () => {
  const [tasks, setTasks] = useState<string[]>([]);
  const [newTask, setNewTask] = useState<string>("");
  const [completedTasksIndex, setCompletedTasksIndex] = useState<number[]>([]);

  const addTask = () => {
    if (newTask.trim() !== "") {
      setTasks([...tasks, newTask]);
      setNewTask("");
      // Remove the new task from the completed tasks index
      const updatedCompletedTasksIndex = [...completedTasksIndex];
      updatedCompletedTasksIndex.splice(
        updatedCompletedTasksIndex.indexOf(tasks.length),
        1
      );
      setCompletedTasksIndex(updatedCompletedTasksIndex);
    }
  };

  const removeTask = (index: number) => {
    const updatedTasks = [...tasks];
    updatedTasks.splice(index, 1);
    setTasks(updatedTasks);
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex flex-col items-center mt-14">
        <h1 className="text-2xl font-bold mb-5">To-Do App</h1>
        <div className="grid grid-cols-6 gap-5 mb-5 w-72">
          <Input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            className="col-span-5"
          />
          <Button onClick={addTask} className="p-2">
            <Plus />
          </Button>
        </div>
        <ul className="flex flex-col gap-5 w-72">
          {tasks.map((task, index) => (
            <li key={index} className="grid grid-cols-6 gap-5">
              <div className="rounded-md bg-secondary flex gap-2 col-span-5 p-2 break-words w-60 overflow-hidden">
                <div
                  className="rounded-full bg-slate-300 cursor-pointer flex items-center justify-center p-1 min-w-[26px] h-[26px]"
                  onClick={() => {
                    if (!completedTasksIndex.includes(index)) {
                      setCompletedTasksIndex([...completedTasksIndex, index]);
                    } else {
                      const updatedCompletedTasksIndex = [
                        ...completedTasksIndex,
                      ];
                      updatedCompletedTasksIndex.splice(
                        updatedCompletedTasksIndex.indexOf(index),
                        1
                      );
                      setCompletedTasksIndex(updatedCompletedTasksIndex);
                    }
                  }}
                >
                  {completedTasksIndex.includes(index) ? (
                    <motion.svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-check"
                      id={`svg-${index}`}
                      variants={svgVariants}
                      initial="hidden"
                      animate="visible"
                    >
                      <motion.path
                        d="M20 6 9 17l-5-5"
                        variants={pathVariants}
                      />
                    </motion.svg>
                  ) : (
                    <></>
                  )}
                </div>
                {task}
              </div>
              <Button
                onClick={() => {
                  removeTask(index);
                }}
                className="p-2"
              >
                <Minus />
              </Button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;
