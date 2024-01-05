import React, { useContext, useEffect, useRef } from "react";
import { useState } from "react";
import "./users/article.css";
import { AppContext } from "../App";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ContentTop from "./ContentTop/ContentTop";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";

const Country = () => {
  const [showConfirm, setShowConfirm] = useState(false);
  const [artId, setArtId] = useState("");
  const [refresh, setRefresh] = useState(false);
  const { route, setLoader } = useContext(AppContext);
  const [data, setData] = useState([]);
  const [title, setTitle] = useState("");
  const [editId, setEditId] = useState("");
  const [description, setDescription] = useState("");
  const inputRef = useRef();
  const deleteButton = (id) => {
    setShowConfirm(true);
    setArtId(id);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    setLoader(true);
    fetch(`${route}/countryOfStudy${editId ? `/${editId}` : ""}`, {
      method: editId ? "PUT" : "POST",
      body: JSON.stringify({
        title: title,
        description: description,
      }),
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((response) => {
        if (response.data) {
          toast.success("Added Successfully");
          setRefresh(!refresh);
        } else if (response.errors) {
          toast.error(response.errors[0].msg);
        }
      })
      .catch(() => {
        toast.error("هناك خطأ");
      })
      .finally(() => {
        setLoader(false);
        setTitle("");
        setDescription("");
        setEditId("");
      });
  };

  const deleteArt = async () => {
    setShowConfirm(false);
    setLoader(true);
    try {
      const response = await fetch(`${route}/countryOfStudy/${artId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      });
      if (response.ok) {
        toast.success("Deleted Successfully");
        setRefresh(!refresh);
      } else if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      setLoader(false);
    } catch (error) {
      setLoader(false);
    }
  };

  useEffect(() => {
    fetch(`${route}/countryOfStudy`, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.data) {
          setData(data.data);
        }
        console.log(data);
      });
  }, [refresh, route]);
  return (
    <div className="articles">
      <ContentTop headTitle="Countries" />

      {showConfirm ? (
        <div className="confirm">
          <div>are yoy sure ?</div>
          <div className="btns">
            <button onClick={deleteArt} className="yes">
              Yes
            </button>
            <button onClick={() => setShowConfirm(false)} className="no">
              No
            </button>
          </div>
        </div>
      ) : null}
      <div className="container">
        <div className="add">
          <h1>{editId ? "Edit" : "Add"} County</h1>
          <form action="" onSubmit={handleSubmit}>
            <label htmlFor="">
              Title
              <input
                ref={inputRef}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                type="text"
              />
            </label>
            <label htmlFor="">
              description
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                type="text"
              />
            </label>

            <button type="submit">{editId ? "edit" : "add"}</button>
          </form>
        </div>

        <h2 style={{ textAlign: "center" }}>Countries</h2>
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => {
              return (
                <tr key={index}>
                  <td>{item.title}</td>
                  <td>{item.description}</td>
                  <td className="buttons">
                    <button
                      onClick={() => {
                        setEditId(item?.id);
                        setTitle(item?.title);
                        setDescription(item?.description);
                        inputRef.current.focus();
                        inputRef.current.scrollIntoView({
                          behavior: "smooth",
                          block: "center",
                        });
                      }}
                    >
                      Edit
                    </button>

                    <button onClick={() => deleteButton(item.id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {/* <div className="pagination">
          <button disabled={true}>
            <BsArrowLeft />
          </button>
          <span>1</span>
          <button>
            <BsArrowRight />
          </button>
        </div> */}
      </div>
    </div>
  );
};

export default Country;
