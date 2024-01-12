import React, { useContext, useEffect, useRef } from "react";
import { useState } from "react";
import "./users/article.css";
import { AppContext } from "../App";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ContentTop from "./ContentTop/ContentTop";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const Services = () => {
  const [showConfirm, setShowConfirm] = useState(false);
  const [artId, setArtId] = useState("");
  const [refresh, setRefresh] = useState(false);
  const { route, setLoader } = useContext(AppContext);
  const [data, setData] = useState([]);
  const [titleEn, setTitleEn] = useState("");
  const [titleAr, setTitleAr] = useState("");
  const [descriptionEn, setDescriptionEn] = useState("");
  const [descriptionAr, setDescriptionAr] = useState("");
  const [editId, setEditId] = useState("");

  const inputRef = useRef();
  const deleteButton = (id) => {
    setShowConfirm(true);
    setArtId(id);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    setLoader(true);
    fetch(`${route}/service${editId ? `/${editId}` : ""}`, {
      method: editId ? "PUT" : "POST",
      body: JSON.stringify({
        title_ar: titleAr,
        title_en: titleEn,
        description_ar: descriptionAr,
        description_en: descriptionEn,
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
        setTitleEn("");
        setDescriptionEn("");
        setDescriptionAr("");
        setTitleAr("");
        setEditId("");
      });
  };

  const deleteArt = async () => {
    setShowConfirm(false);
    setLoader(true);
    try {
      const response = await fetch(`${route}/service/${artId}`, {
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
    fetch(`${route}/service`, {
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
      <ContentTop headTitle="Services" />

      {showConfirm ? (
        <div className="confirm">
          <div>are you sure ?</div>
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
          <h1>{editId ? "Edit" : "Add"} Service</h1>
          <form action="" onSubmit={handleSubmit}>
            <label htmlFor="">
              Title En
              <input
                ref={inputRef}
                value={titleEn}
                onChange={(e) => setTitleEn(e.target.value)}
                required
                type="text"
              />
            </label>
            <label htmlFor="">
              Title Ar
              <input
                value={titleAr}
                onChange={(e) => setTitleAr(e.target.value)}
                required
                type="text"
              />
            </label>
            <label htmlFor="" style={{ display: "block" }}>
              Description En
              <ReactQuill
                theme="snow"
                value={descriptionEn}
                onChange={setDescriptionEn}
                required
              />
            </label>
            <label htmlFor="" style={{ display: "block" }}>
              Description Ar
              <ReactQuill
                theme="snow"
                value={descriptionAr}
                onChange={setDescriptionAr}
                required
              />
            </label>

            <button type="submit">{editId ? "edit" : "add"}</button>
          </form>
        </div>

        <h2 style={{ textAlign: "center" }}>Services</h2>
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
                  <td>
                    {item.title_ar} - {item.title_en}
                  </td>
                  <td>
                    {item.description_en} - {item.description_ar}
                  </td>
                  <td className="buttons">
                    <button
                      onClick={() => {
                        setEditId(item?.id);
                        setTitleEn(item?.title_en);
                        setTitleAr(item?.title_ar);
                        setDescriptionEn(item?.description_en);
                        setDescriptionAr(item?.description_ar);
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

export default Services;
