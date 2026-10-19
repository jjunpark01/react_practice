import "./App.css";
import { useState } from "react";
import Header from "./components/Header";
import Editor from "./components/Editor";
import List from "./components/List";

const initialTodos = [
  {id: 0 , isDone: false, content : "React study", date:Date.now()},
  {id: 1 , isDone: true, content : "ㅇㅇ", date:Date.now()},
  {id: 2 , isDone: false, content : "메렁 ㅋㅋ", date:Date.now()}
];


function App() {
  const [todos, setTodos] = useState(initialTodos);
  console.log(todos);


  return (
    <div className="App">
      <Header/>
      <Editor/>
      <List/>
    </div>
  );
}

export default App;
