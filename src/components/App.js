import React, { useState, useEffect } from "react";
import "../styles/App.css";
import { Loader } from "./Loader";
import { Todo } from "./Todo";

const App = () => {
  const [todo, setTodos] = useState([]);
  const [loader, setLoader] = useState(false);
  const [showData, setShowData] = useState([]);
  const [checkedCompleted, setCheckedCompleted] = useState(true)
  const [checkedInCompleted, setCheckedInCompleted] = useState(true)

  useEffect(() => {
    getAllTodos();
  }, []);

  useEffect(() => {
    loadFilterProducts();
  }, [checkedCompleted, checkedInCompleted]);


  
  const getAllTodos = async () => {
    setLoader(true);
    await fetch("https://jsonplaceholder.typicode.com/todos")
      .then((response) => response.json())
      .then((data) => {
        setTodos(data.slice(0,20));
        setShowData(data.slice(0,20));
      });
    setLoader(false);
  };

  const loadFilterProducts = () => {
    if(checkedCompleted && checkedInCompleted){
      let newFilter = [...todo];
      setShowData(newFilter);
    } else if(checkedCompleted){
      let newFilter = [...todo];
      newFilter = newFilter.filter((data) => data.completed)
      setShowData(newFilter);
      setCheckedCompleted(true)
    } else if(!checkedCompleted){
      let newFilter = [...todo];
      newFilter = newFilter.filter((data) => !data.completed)
      setShowData(newFilter);
      setCheckedInCompleted(true)
    }
  }
  
  return (
    <>
      {loader ? <Loader /> : null}
      <ol>
        {showData.map(
          (t) =>
              <li key={t.id}>
                {" "}
                <Todo id={t.id} title={t.title} completed={t.completed} />{" "}
              </li>
        )}
      </ol>

      <div id="filter-holder">
        <label htmlFor="completed-checkbox">Show completed</label>
        <input
          type="checkbox"
          id="completed-checkbox"
          name="complete"
          value="completed"
          checked={checkedCompleted}
          onChange={(e) => setCheckedCompleted(e.target.checked)}
        />{" "}
        <br />
        <label htmlFor="incompleted-checkbox">Show Incompleted</label>
        <input
          type="checkbox"
          id="incompleted-checkbox"
          name="incomplete"
          value="incompleted"
          checked={checkedInCompleted}
          onChange={(e) => setCheckedInCompleted(e.target.checked)}
        />
      </div>
    </>
  );
};

export default App;
