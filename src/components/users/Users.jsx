import React, { useContext, useEffect, useRef } from "react";
import { useState } from "react";
import "./article.css";
import { AppContext } from "../../App";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ContentTop from "../ContentTop/ContentTop";
import { countries } from "../../data/countries";
import UserRow from "./UserRow";

const Users = () => {
  const [refresh, setRefresh] = useState(false);
  const { route, setLoader } = useContext(AppContext);
  const [users, setUsers] = useState([]);
  const [role, setRole] = useState("");
  const [phone, setPhone] = useState("");
  const [userName, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [filter, setFilter] = useState("");
  const myRole = sessionStorage.getItem("role");
  const [country, setCountry] = useState("");
  const [deleteId, setDeleteId] = useState("");
  const [updateId, setUpdateId] = useState("");
  const inputRef = useRef();
  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoader(true);
    try {
      let data = {
        username: userName,
        email: email,
        phone: phone,
        country: country,
      };
      if (!updateId) {
        data = {
          ...data,
          password: password,
          passwordConfirm: passwordConfirmation,
          role: role,
        };
      }
      const response = await fetch(
        `${route}/users${updateId && `/${updateId}`}`,
        {
          method: updateId ? "PUT" : "POST",
          body: JSON.stringify(data),
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      ).then((res) => res.json());
      setLoader(false);
      if (response.data) {
        toast.success("Added Successfully");
        setRefresh(!refresh);
        setUsername("");
        setEmail("");
        setPhone("");
        setRole("");
        setCountry("");
        setPassword("");
        setPasswordConfirmation("");
        setUpdateId("");
      } else if (response.errors) {
        toast.error(response.errors[0].msg);
      } else {
        console.log(response);
        toast.error("هناك خطأ");
      }
    } catch (error) {}
  };
  useEffect(() => {
    fetch(`${route}/users${filter ? `/${filter}` : ""}`, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.data) {
          setUsers(data.data);
        }
      });
  }, [refresh, filter, route]);

  const deleteUser = () => {
    setLoader(true);
    fetch(`${route}/users/${deleteId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .finally(() => {
        setLoader(false);
        setRefresh(!refresh);
        setDeleteId("");
      });
  };
  const clickUpdate = (user) => {
    setUpdateId(user.id);
    setUsername(user.username);
    setEmail(user.email);
    setPhone(user.phone);
    setCountry(user.country);

    inputRef.current.focus();
    inputRef.current.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  };
  return (
    <div className="articles">
      <ContentTop headTitle="Users" />
      {deleteId ? (
        <div className="confirm">
          <div>are you sure ?</div>
          <div className="btns">
            <button onClick={deleteUser} className="yes">
              Yes
            </button>
            <button onClick={() => setDeleteId("")} className="no">
              No
            </button>
          </div>
        </div>
      ) : null}
      <div className="container">
        {myRole === "admin" && (
          <>
            <div className="add">
              <h1>Add User</h1>
              <form action="" onSubmit={handleSubmit}>
                <label htmlFor="">
                  Name
                  <input
                    ref={inputRef}
                    onChange={(e) => setUsername(e.target.value)}
                    value={userName}
                    type="text"
                  />
                </label>
                <label htmlFor="">
                  Email
                  <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="text"
                  />
                </label>
                <label htmlFor="">
                  Phone
                  <input
                    onChange={(e) => setPhone(e.target.value)}
                    value={phone}
                    type="text"
                  />
                </label>
                {!updateId && (
                  <>
                    <label htmlFor="">
                      Password
                      <input
                        onChange={(e) => setPassword(e.target.value)}
                        type="text"
                        value={password}
                      />
                    </label>
                    <label htmlFor="">
                      confirm Password
                      <input
                        onChange={(e) =>
                          setPasswordConfirmation(e.target.value)
                        }
                        value={passwordConfirmation}
                        pattern={password}
                        type="text"
                      />
                    </label>{" "}
                    <label htmlFor="">
                      Role
                      <select
                        value={role}
                        name=""
                        id=""
                        onChange={(e) => setRole(e.target.value)}
                      >
                        <option value="">select role</option>
                        <option value="user">user</option>
                        <option value="admin">admin</option>
                        <option value="employee">employee</option>
                      </select>
                    </label>
                  </>
                )}

                <label htmlFor="">
                  Country
                  <select
                    onChange={(e) => setCountry(e.target.value)}
                    required
                    className="input"
                    value={country}
                  >
                    <option value="">country</option>
                    {countries.map((country) => (
                      <option value={country.value} key={country.value}>
                        {country.value}
                      </option>
                    ))}
                  </select>
                </label>
                <button type="submit">add</button>
              </form>
            </div>
            <div>
              <label style={{ fontSize: "25px", fontWeight: "700" }}>
                Filter :{" "}
              </label>
              <select
                style={{ padding: "10px" }}
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
              >
                <option value="">all</option>
                <option value="employee">employees only</option>
                <option value="user">user only</option>
                <option value="admin">admin only</option>
              </select>
            </div>
          </>
        )}
        <h2 style={{ textAlign: "center" }}>Users</h2>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>UserName</th>
                <th>Email</th>
                <th>Role</th>
                <th>Request Type</th>
                <th>Phone</th>
                <th>Country</th>
                <th>comment</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((item) => {
                return (
                  <UserRow
                    onDelete={(id) => setDeleteId(id)}
                    item={item}
                    key={item.id}
                    clickUpdate={clickUpdate}
                  />
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Users;
