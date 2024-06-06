

import React, { useState, useEffect } from "react";

const Home = () => {
    const [inputValue, setInputValue] = useState("");
    const [todos, setTodos] = useState([]);

    const apiUrl = 'https://github.com/4GeeksAcademy/Todolist-Application-Using-React_MO';

    // Método GET para obtener la lista de tareas
    const getTodos = () => {
        fetch(apiUrl)
            .then(resp => resp.json())
            .then(data => setTodos(data))
            .catch(error => console.log(error));
    };

    // Método POST para crear una nueva tarea
    const addTodo = (newTodo) => {
        fetch(apiUrl, {
            method: "POST",
            body: JSON.stringify(newTodo),
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(resp => resp.json())
        .then(data => {
            getTodos(); // Actualizar la lista de tareas después de agregar
        })
        .catch(error => console.log(error));
    };

    // Método PUT para actualizar la lista de tareas
    const updateTodos = (newTodos) => {
        fetch(apiUrl, {
            method: "PUT",
            body: JSON.stringify(newTodos),
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(resp => resp.json())
        .then(data => setTodos(newTodos))
        .catch(error => console.log(error));
    };

    // Método DELETE para eliminar todas las tareas
    const deleteTodos = () => {
        fetch(apiUrl, {
            method: "DELETE"
        })
        .then(resp => {
            if (resp.ok) {
                setTodos([]);
            }
        })
        .catch(error => console.log(error));
    };

    useEffect(() => {
        getTodos(); // Cargar las tareas al iniciar
    }, []);

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && inputValue.trim() !== "") {
            const newTodo = { label: inputValue, done: false };
            addTodo(newTodo);
            setInputValue("");
        }
    };

    const deleteTodo = (indexToDelete) => {
        const newTodos = todos.filter((index) => index !== indexToDelete);
        updateTodos(newTodos);
    };

    const resetTodos = () => {
        deleteTodos();
    };

    return (
        <div>
            <div className="container">
                <h1 className="text-center mt-5">My todos</h1>
                <ul className="list-group">
                    <li className="list-group-item">
                        <div className="input-group">
                            <input
                                type="text"
                                onChange={(e) => setInputValue(e.target.value)}
                                value={inputValue}
                                onKeyPress={handleKeyPress}
                                placeholder="What do you need to do"
                                className="form-control"
                            />
                        </div>
                    </li>
                    {todos.map((item, index) => (
                        <li key={index} className="list-group-item">
                            <div className="input-group">
                                <input
                                    type="text"
                                    value={item.label}
                                    readOnly
                                    className="form-control"
                                />
                                <div className="input-group-append">
                                    <span
                                        className="input-group-text"
                                        onClick={() => deleteTodo(index)}
                                        style={{ cursor: "pointer" }}
                                    >
                                        <i className="fa-solid fa-trash"></i>
                                    </span>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
                <button className="btn btn-danger mt-3" onClick={resetTodos}>
                    Clear All Todos
                </button>
            </div>
        </div>
    );
};

export default Home;
