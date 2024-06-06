import React, { useState } from "react";

const Home = () => {
    const [inputValue, setInputValue] = useState("");
    const [todos, setTodos] = useState([]);

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && inputValue.trim() !== "") {
            setTodos([...todos, inputValue]);
            setInputValue("");
        }
    };

    const deleteTodo = (indexToDelete) => {
        setTodos(todos.filter((_, index) => index !== indexToDelete));
    };

    const resetTodos = () => {
        setTodos([]);
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
                                    value={item}
                                    readOnly
                                    className="form-control"
                                />
                                <div className="input-group-append">
                                    <span
                                        className="input-group-text"
                                        onClick={() => deleteTodo(index)}
                                        style={{ cursor: "pointer" }}
                                    >
                                       <i class="fa-solid fa-trash"></i>
                                    </span>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
               
            </div>
        </div>
    );
};

export default Home;
