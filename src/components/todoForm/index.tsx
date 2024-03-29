import  { useState } from "react";
import AddTaskIcon from "@mui/icons-material/AddTask";
import { Todos } from "../../types";
import { v4 as uuid } from "uuid";
import { useDispatch } from "react-redux";
import { addTodoAction } from "../../store/action";
import { StateManager } from "../../classes";

const TodoForm = () => {
  const [todo, setTodo] = useState<Todos | undefined>({
    id: "",
    done: false,
    todoName: null,
    endTime: null,
    startTime: null,
  });
  const dispatch = useDispatch();
  const changeTodoHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTodo({
      ...todo,
      id: uuid().slice(0, 7),
      [e.target.name]: e.target.value,
    } as Todos);
  };

  const addTodoHandler = () => {
    const newTodoClass = new StateManager();
    newTodoClass.addTodo(todo as Todos)
     dispatch(addTodoAction(todo as Todos));
    setTodo({
      id: "",
      done: false,
      todoName: "",
      endTime: "",
      startTime: "",
    });
  };

  return (
    <>
      <form className="flex border bg-white w-full p-1.5 justify-between rounded-lg flex-row">
        <div className={`flex justify-between items-center w-full`}>
          <div className={"w-1/4 flex"}>
            <input
              name={"todoName"}
              value={todo?.todoName as string}
              onChange={changeTodoHandler}
              placeholder={"Add new Todo..."}
              className={
                "w-full text-gray-400 px-4 outline-none placeholder-blue-500"
              }
              type="text"
            />
          </div>
          <div className={"flex items-center justify-center w-1/4"}>
            <input
              name={"startTime"}
              value={todo?.startTime as string}
              onChange={changeTodoHandler}
              placeholder={"start Todo..."}
              className={
                "p-0 outline-none hover:cursor-pointer placeholder-blue-500 "
              }
              type="date"
            />
            <span className={"flex  hover:cursor-pointer"}>start</span>
          </div>
          <div className={"flex items-center justify-center w-1/4"}>
            <input
              name={"endTime"}
              value={todo?.endTime as string}
              onChange={changeTodoHandler}
              placeholder={"end Todo..."}
              className={
                "p-0 outline-none hover:cursor-pointer placeholder-blue-500"
              }
              type="date"
            />
            <span className={"flex  hover:cursor-pointer"}>end</span>
          </div>
          <div className={"flex items-center justify-center"}>
            <span className={"flex  hover:cursor-pointer"}>
              <AddTaskIcon
                onClick={addTodoHandler}
                className={"text-2xl text-blue-400"}
              />
            </span>
          </div>
        </div>
      </form>
    </>
  );
};

export default TodoForm;
