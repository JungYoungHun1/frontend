import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import "./BoardView.css";

const selectBoard = (setBoard, name) => {
  axios.get("/api/board/" + name).then((res) => setBoard(res.data));
};

const selectComment = (board, setComments) => {
  axios.get("/api/comment/" + board.boardNo).then((res) => {
    setComments(res.data);
  });
};

const insertComment = (board) => {
  const contentElem = document.getElementById("commentContent");
  const commenterElem = document.getElementById("commenter");
  axios
    .post(
      "/api/comment",
      {
        board: {
          boardNo: board.boardNo,
        },
        commentContent: contentElem.value,
        commenter: commenterElem.value,
      },
      {
        headers: {
          "Content-type": "application/json",
        },
      }
    )
    .then((res) => console.log(res.data));
};

const updateComment = (comment, contentValue) => {
  axios
    .put("/api/comment/" + comment.commentNo, {
      commentContent: contentValue,
    })
    .then((res) => alert("수정완료"));
};

const deleteComment = (comment, setCheck) => {
  axios.delete("/api/comment/" + comment.commentNo).then((res) => {
    alert("삭제완료");
    setCheck(true);
  });
};

function CommentView() {
  const params = new URLSearchParams(window.location.search);
  let name = params.get("boardNo");

  const [board, setBoard] = useState("");
  const [comments, setComments] = useState("");
  const [contentValue, setContentValue] = useState("");
  const [check, setCheck] = useState(0);
  const [checkComment, setCheckComment] = useState(0);

  useEffect(() => {
    selectBoard(setBoard, name);
  }, [checkComment]);
  useEffect(() => {
    board && selectComment(board, setComments);
  }, [check, board, checkComment]);
  return (
    <div>
      <div>
        <button
          onClick={() => {
            selectComment(board, setComments);
            setCheck(1);
          }}
        >
          댓글 [{comments.length}]
        </button>
        <button
          onClick={() => {
            setCheckComment(1);
          }}
        >
          작성
        </button>
      </div>

      <div id="insertCommentView">
        {checkComment != 0 ? (
          <div>
            <div>
              댓글 작성자 :{" "}
              <input
                id="commenter"
                className="insertCommentWritter"
                type="text"
              ></input>
            </div>
            <div>
              댓글 내용 : &nbsp;
              <input
                id="commentContent"
                className="insertCommentContent"
                type="text"
              ></input>
            </div>
            <a href={`/BoardView?boardNo=` + name}>
              <button
                onClick={() => {
                  insertComment(board);
                  setCheck(0);
                }}
              >
                작성
              </button>
            </a>
          </div>
        ) : (
          <></>
        )}
        {check != 0 ? (
          <div>
            {comments &&
              comments.map((comment) => {
                return (
                  <div className="commentBox" key={comment.commentNo}>
                    <div>댓글 작성자 : {comment.commenter}</div>
                    <div>
                      댓글 내용 :
                      <input
                        type="text"
                        className="commentView"
                        onChange={(e) => {
                          setContentValue(e.target.value);
                        }}
                        defaultValue={comment.commentContent}
                      ></input>
                    </div>
                    <div>
                      <button
                        onClick={() => {
                          {
                            updateComment(comment, contentValue);
                          }
                        }}
                      >
                        수정
                      </button>
                      <button
                        onClick={() => {
                          deleteComment(comment, setCheck);
                        }}
                      >
                        삭제
                      </button>
                    </div>
                  </div>
                );
              })}
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}

export default CommentView;
