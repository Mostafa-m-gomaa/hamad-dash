import React, { useContext, useEffect } from "react";
import { useState } from "react";
import "./article.css";
import { AppContext } from "../../App";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ContentTop from "../ContentTop/ContentTop";
import { Link } from "react-router-dom";
import { countries } from "../../data/countries";
import UserRow from "./UserRow";

const Users = () => {
  const [showConfirm, setShowConfirm] = useState(false);
  const [artId, setArtId] = useState("");
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

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoader(true);
    try {
      const response = await fetch(`${route}/users`, {
        method: "POST",
        body: JSON.stringify({
          username: userName,
          email: email,
          password: password,
          passwordConfirm: passwordConfirmation,
          role: role,
          phone: phone,
          country: country,
        }),
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      }).then((res) => res.json());
      setLoader(false);
      console.log(response);
      if (response.data) {
        toast.success("Added Successfully");
        setRefresh(!refresh);
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

  return (
    <div className="articles">
      <ContentTop headTitle="Users" />

      <div className="container">
        {myRole === "admin" && (
          <>
            <div className="add">
              <h1>Add User</h1>
              <form action="" onSubmit={handleSubmit}>
                <label htmlFor="">
                  Name
                  <input
                    onChange={(e) => setUsername(e.target.value)}
                    type="text"
                  />
                </label>
                <label htmlFor="">
                  Email
                  <input
                    onChange={(e) => setEmail(e.target.value)}
                    type="text"
                  />
                </label>
                <label htmlFor="">
                  Phone
                  <input
                    onChange={(e) => setPhone(e.target.value)}
                    type="text"
                  />
                </label>
                <label htmlFor="">
                  Password
                  <input
                    onChange={(e) => setPassword(e.target.value)}
                    type="text"
                  />
                </label>
                <label htmlFor="">
                  confirm Password
                  <input
                    onChange={(e) => setPasswordConfirmation(e.target.value)}
                    type="text"
                  />
                </label>
                <label htmlFor="">
                  Role
                  <select
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
                <label htmlFor="">
                  Country
                  <select
                    onChange={(e) => setCountry(e.target.value)}
                    required
                    className="input"
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
                return <UserRow item={item} key={item.id} />;
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Users;
