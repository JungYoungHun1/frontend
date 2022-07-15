import React, { useEffect, useState } from "react";
import axios from "axios";
import BoardInsert from "./BoardInsert";
import "./ListBoard.css";

const allSelect = (setBoards, pages) => {
  axios.get("/api/boards?page=" + pages).then((res) => {
    {
      setBoards(res.data);
      console.log(res.data);
    }
  });
};

function ListBoard() {
  const [pages, setPages] = useState(1);
  const [boards, setBoards] = useState("");
  useEffect(() => {
    allSelect(setBoards, pages);
  }, [pages]);
  return (
    <div>
      <div className="view_container">
        <div>
          <div className="mainHead">
            <span>
              {" "}
              <img className="mainLeft" src="/main5.png"></img>
            </span>
            <span className="mainBoard">게시판</span>
            <a href="/boardInsert">
              <span className="goInsert">등록</span>
            </a>
          </div>
          <div className="tableMain">
            <span>
              <img className="tableLeft" src="/main1.png"></img>
            </span>
            <table>
              <thead>
                <tr>
                  <th>No</th>
                  <th>제목</th>
                  <th>작성자</th>
                  <th>등록일</th>
                </tr>
              </thead>
              <tbody>
                <tr></tr>
                {boards &&
                  boards.dtoList.map((board) => {
                    return (
                      <tr key={board.boardNo}>
                        <td>{board.boardNo}</td>
                        <td className="titleBoard">
                          <a href={`/boardView?boardNo=${board.boardNo}`}>
                            {board.boardTitle}
                          </a>
                        </td>
                        <td>
                          {board.user &&
                            board &&
                            board.user.userEmail.split("@", 1)}
                        </td>
                        <td>
                          {board.registeredDate &&
                            board &&
                            board.registeredDate.split("T")[0]}
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
            <span>
              <img className="tableRight" src="/main2.png"></img>
            </span>
          </div>
        </div>
        <div>
          <button
            className="pageButton"
            onClick={() =>
              setPages(
                boards.start - boards.size >= 1
                  ? boards.start - boards.size
                  : pages
              )
            }
          >
            이전
          </button>

          {boards &&
            boards.pageList.map((page) => {
              return (
                <span
                  className={pages === page ? "pageNum" : "pageOut"}
                  onClick={() => {
                    setPages(page);
                  }}
                  key={page}
                >
                  {page}
                </span>
              );
            })}
          <button
            className="pageButton"
            onClick={() =>
              setPages(
                boards.start + boards.size > boards.totalPage
                  ? pages
                  : boards.start + boards.size
              )
            }
          >
            다음
          </button>
        </div>
      </div>
      <footer>footer</footer>
    </div>
  );
}

export default ListBoard;
