import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function User() {
  const [users, setUsers] = useState();
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      await axios
        .get("https://jsonplaceholder.typicode.com/users")
        .then((response) => {
          setUsers(response.data);
        })
        .catch((err) => {
          console.log(`err`, err);
        });
    };
    fetchData();
  }, []);

  return (
    <div className="container">
      <div className="d-flex justify-content-center mt-3">
        <Link to="/">
          <button className="btn btn-info mb-5">Home</button>
        </Link>
      </div>
      <div className="mb-2">
        <input
          type="text"
          placeholder="search..."
          onChange={(e) => {
            setSearch(e.target.value);
          }}
        />
      </div>
      <h3>Users Information:</h3>
      {users && (
        <table class="table mt-2">
          <thead class="thead-dark">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Website</th>
            </tr>
          </thead>
          <tbody>
            {users
              .filter((item) => {
                if (search === "") {
                  return item;
                } else if (
                  item.name.toLowerCase().includes(search.toLowerCase())
                ) {
                  return item;
                } else if (
                  item.email.toLowerCase().includes(search.toLowerCase())
                ) {
                  return item;
                } else if (
                  item.website.toLowerCase().includes(search.toLowerCase())
                ) {
                  return item;
                }
              })
              .map((item, index) => (
                <tr>
                  <th scope="row">{index + 1}</th>
                  <td>
                    <Link to={`/userprofile/${item.id}`}>{item.name}</Link>
                  </td>
                  <td>{item.email}</td>
                  <td>{item.website}</td>
                </tr>
              ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
