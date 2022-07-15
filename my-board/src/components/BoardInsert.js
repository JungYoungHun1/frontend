import React from "react";
import axios from "axios";
import "./BoardInsert.css";

const boardInsert = () => {
  const boardTitle = document.getElementById("title");
  const boardContent = document.getElementById("content");
  const userEmail = document.getElementById("user");
  axios
    .post(
      "/api/board",
      {
        boardTitle: boardTitle.value,
        boardContent: boardContent.value,
        user: { userEmail: userEmail.value },
      },
      {
        headers: {
          "Content-type": "application/json",
        },
      }
    )
    .catch((e) => alert("작성 실패"))
    .then((window.location.href = "/"));
};

function BoardInsert() {
  return (
    <div className="view_containerInsert">
      <div>
        <h1>게시판 등록</h1>
        <div>제목</div>
        <input className="titleInsert" type="text" id="title"></input>
        <div>내용</div>
        <textarea type="text" className="contentInsert" id="content"></textarea>
        <div>작성자</div>
        <input type="text" className="writerInsert" id="user"></input>
        <div>
          <button className="insertBtn" onClick={boardInsert}>
            등록
          </button>
        </div>
      </div>
      <footer className="insertFooter">footer</footer>
    </div>
  );
}

export default BoardInsert;
