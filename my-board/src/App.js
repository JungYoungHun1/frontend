import logo from "./logo.svg";
import "./App.css";
import ListBoard from "./components/ListBoard";
import BoardInsert from "./components/BoardInsert";
import BoardView from "./components/BoardView";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <header>
        <span>
          {" "}
          <img className="headerImg" src="/main4.png"></img>
        </span>
        <span className="headerText">
          <a href="/">게시판</a>
        </span>
        <span>
          {" "}
          <img className="headerImg" src="/main3.png"></img>
        </span>
      </header>

      {/* <ListBoard></ListBoard> */}
      {/* <BoardInsert></BoardInsert>
      <BoardView></BoardView> */}
      <Outlet></Outlet>
    </div>
  );
}

export default App;
