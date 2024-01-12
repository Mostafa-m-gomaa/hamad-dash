import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../../App";
import { toast } from "react-toastify";
import { BsWhatsapp } from "react-icons/bs";

const UserRow = ({ item }) => {
  const [showCommentId, setShowCommentId] = useState("");
  const [comments, setComments] = useState([]);
  const { route, setLoader } = useContext(AppContext);
  const [updateId, setUpdateId] = useState("");
  const [comment, setComment] = useState("");
  const [deleteId, setDeleteId] = useState("");
  const role = sessionStorage.getItem("role");
  const getComments = (id) => {
    fetch(`${route}/comment/${id}`, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setComments(data.data);
      });
  };
  const updateUser = (e) => {
    e.preventDefault();
    setLoader(true);
    fetch(`${route}/comment`, {
      method: "POST",
      body: JSON.stringify({
        content: comment,
        UserId: updateId,
      }),
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.data) {
          toast.success("Updated Successfully");
          setUpdateId("");
        }
      })
      .finally(() => {
        setLoader(false);
        setUpdateId("");
      });
  };
  const deleteComment = () => {
    setLoader(true);
    fetch(`${route}/comment/${deleteId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    })
      .then(() => {
        toast.success("Deleted Successfully");
        getComments(showCommentId);
      })
      .finally(() => {
        setLoader(false);
        setDeleteId("");
      });
  };
  console.log(comments);
  return (
    <>
      {updateId ? (
        <div className="confirm">
          <form
            onSubmit={(e) => {
              updateUser(e);
            }}
          >
            <div>
              <label
                style={{
                  display: "block",
                  textAlign: "start",
                  width: "100%",
                  fontSize: "20px",
                  fontWeight: "700",
                }}
                htmlFor="comment"
              >
                Comment
              </label>
              <textarea
                style={{ width: "100%" }}
                type="text"
                onChange={(e) => setComment(e.target.value)}
              />
            </div>
            <div className="btns">
              <button type="submit" className="no">
                Submit
              </button>
              <button
                type="button"
                onClick={() => setUpdateId(false)}
                className="yes"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      ) : null}
      {showCommentId ? (
        <div className="confirm">
          {deleteId ? (
            <div className="confirm">
              <div>are you sure ?</div>
              <div className="btns">
                <button onClick={deleteComment} className="yes">
                  Yes
                </button>
                <button onClick={() => setDeleteId(false)} className="no">
                  No
                </button>
              </div>
            </div>
          ) : null}
          <table>
            <thead>
              <tr>
                <th>Sender</th>
                <th>comment</th>
                <th>created at</th>
                {role === "admin" && <th>Actions</th>}
              </tr>
            </thead>
            <tbody>
              {comments.map((commentC) => (
                <tr key={commentC?.id}>
                  <td>
                    {commentC?.creator?.username} - {commentC?.creator?.email}
                  </td>
                  <td>{commentC?.content}</td>
                  <td>{new Date(commentC?.createdAt).toDateString()}</td>
                  {role === "admin" && (
                    <td>
                      <button
                        onClick={() => {
                          setDeleteId(commentC?.id);
                        }}
                      >
                        Delete
                      </button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
          <div className="btns" style={{ justifyContent: "center" }}>
            <button
              type="button"
              onClick={() => setShowCommentId(false)}
              className="yes"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : null}
      <tr
        style={{
          backgroundColor: item.role === "user" ? "#957d7d1f" : "",
        }}
      >
        <td>{item.username}</td>
        <td>{item.email}</td>
        <td>{item.role}</td>
        <td>{item.role === "user" ? item.type : "-"}</td>
        <td>{item.phone}</td>
        <td>{item.country}</td>
        <td>
          <button
            onClick={() => {
              setShowCommentId(item.id);
              getComments(item.id);
            }}
          >
            Show comments
          </button>
        </td>
        <td className="buttons">
          {item.role === "employee" && (
            <Link to={`/employer-requests/${item.id}`}>History</Link>
          )}
          <a
            target="_blank"
            rel="noreferrer"
            href={`https://wa.me/${item.phone}`}
            style={{ backgroundColor: "green" }}
          >
            <BsWhatsapp />
          </a>
          <button onClick={() => setUpdateId(item.id)}>Add comment</button>
        </td>
      </tr>
    </>
  );
};

export default UserRow;
