import axios from "axios";
import React, { useEffect, useState } from "react";
import CommentView from "./CommentView";
import "./BoardView.css";

const selectBoard = (setBoard, name) => {
  axios.get("/api/board/" + name).then((res) => setBoard(res.data));
};

const deleteBoard = (board) => {
  axios
    .delete("/api/board/" + board.boardNo)
    .then((res) => alert("삭제완료"))
    .then((window.location.href = "/"));
};

const updateBoard = (board) => {
  const title = document.getElementById("title");
  const content = document.getElementById("content");
  axios
    .put(
      "/api/board/" + board.boardNo,
      {
        boardTitle: title.value,
        boardContent: content.value,
      },
      {
        headers: {
          "Content-type": "application/json",
        },
      }
    )
    .then((res) => alert("수정 완료"));
};

function BoardView() {
  const params = new URLSearchParams(window.location.search);
  let name = params.get("boardNo");

  const [board, setBoard] = useState("");
  const [checkComment, setCheckComment] = useState(0);

  useEffect(() => {
    selectBoard(setBoard, name);
  }, [checkComment]);

  return (
    <div className="view_containerBoard">
      <div className="mainView">
        <span>
          <button className="listBtn">
            <a href="/">리스트</a>
          </button>
        </span>
        <span>
          <h1 className="viewMainTitle">게시판 보기</h1>
        </span>
        <span className="modBtn">
          <button onClick={() => updateBoard(board)}>수정</button>
          <button onClick={() => deleteBoard(board)}>삭제</button>
        </span>
      </div>
      <div className="view_container">
        <h3>제목</h3>
        <input
          className="viewTitle"
          type="text"
          id="title"
          defaultValue={board.boardTitle}
        ></input>
        <h3>내용</h3>
        <textarea
          type="text"
          className="viewContent"
          id="content"
          defaultValue={board.boardContent}
        ></textarea>
        <h3>작성자</h3>
        <div>{board.user && board.user.userEmail.split("@", 1)}</div>
        <h3>등록일</h3>
        <div>{board && board.registeredDate.split("T")[0]}</div>
        <h3>수정일</h3>
        <div>{board && board.modifiedDate.split("T")[0]}</div>

        <CommentView></CommentView>
        <footer className="viewFooter">footer</footer>
      </div>
    </div>
  );
}

export default BoardView;
