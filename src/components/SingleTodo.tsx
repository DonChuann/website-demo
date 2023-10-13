import React, { useEffect, useRef, useState } from 'react';
import { Todo } from '../model';
import { AiFillEdit, AiFillDelete, AiOutlineCheck } from 'react-icons/ai';
import './styles.css'
import { TodoReducer } from './TodoReducer';


type Props = {
    todo:Todo
    todos:Todo[]
    setTodos: React.Dispatch<React.SetStateAction<Todo[]>>
}


const SingleTodo = ({todo, todos, setTodos}: Props) => {
    const [edit, setEdit] = useState<boolean>(false);
    const [editTodo, setEditTodo] = useState<string>(todo.todo);

    const handleDone = (id:number) => {
        setTodos(TodoReducer(todos, {type: 'done', payload: id}))
    };

    const handleDelete = (id:number) => {
        setTodos(todos.filter((todo) => todo.id !== id))
    }

    const handleEdit = (e:React.FormEvent, id:number) => {
        e.preventDefault();

        setTodos(todos.map((todo) => (
            todo.id===id?{...todo, todo:editTodo}: todo
        )))
        setEdit(false);
    }

    const editRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
          editRef.current?.focus();
      }, [edit]);

  return (
    <form className='todos__single' onSubmit={(e) => handleEdit(e, todo.id)}>
        {edit ? (
            <input 
            ref={editRef}
            value={editTodo} 
            onChange={(e) => setEditTodo(e.target.value)}
            className='todos__single--text'
            />
        ): todo.isDone ? (
                <s className="todos__single--text">{todo.todo}</s>
            ):(
                <span className="todos__single--text">{todo.todo}</span>
            )}
        
        <div>
            <span className="icon" onClick={() =>{
                if(!edit && !todo.isDone){
                    setEdit(!edit);
                }
            }}
            >
                <AiFillEdit />
            </span>
            <span className="icon" onClick={()=>handleDelete(todo.id)}>
                <AiFillDelete />
            </span>
            <span className="icon" onClick={()=>handleDone(todo.id)}>
                <AiOutlineCheck />
            </span>
        </div>
    </form>
  )
}

export default SingleTodo