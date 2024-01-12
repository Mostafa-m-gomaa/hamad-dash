import React, { useContext, useEffect, useRef } from "react";
import { useState } from "react";
import "./users/article.css";
import { AppContext } from "../App";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ContentTop from "./ContentTop/ContentTop";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
//
const Country = () => {
  const [showConfirm, setShowConfirm] = useState(false);
  const [artId, setArtId] = useState("");
  const [refresh, setRefresh] = useState(false);
  const { route, setLoader } = useContext(AppContext);
  const [data, setData] = useState([]);
  const [editId, setEditId] = useState("");
  const [titleEn, setTitleEn] = useState("");
  const [image, setImage] = useState(null);
  const [titleAr, setTitleAr] = useState("");
  const [descriptionEn, setDescriptionEn] = useState("");
  const [descriptionAr, setDescriptionAr] = useState("");
  const inputRef = useRef();
  const deleteButton = (id) => {
    setShowConfirm(true);
    setArtId(id);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    setLoader(true);
    const formData = new FormData();
    formData.append("title_ar", titleAr);
    formData.append("title_en", titleEn);
    formData.append("description_ar", descriptionAr);
    formData.append("description_en", descriptionEn);
    formData.append("image", image);
    fetch(`${route}/countryOfStudy${editId ? `/${editId}` : ""}`, {
      method: editId ? "PUT" : "POST",
      body: formData,
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
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
          <h1>{editId ? "Edit" : "Add"} County</h1>
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
            <label htmlFor="">
              Image (jpeg only)
              <input
                onChange={(e) => {
                  console.log(e.target.files[0]);
                  setImage(e.target.files[0]);
                }}
                required={editId ? false : true}
                accept="image/jpeg"
                type="file"
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

        <h2 style={{ textAlign: "center" }}>Countries</h2>
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>descriptionEn</th>
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

export default Country;
