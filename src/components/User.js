import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function User() {
  const [users, setUsers] = useState();
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");

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
    <div className="jumbotron">
      <div className="container mt-5">
        <div className="row mb-2">
          <div className="col-6">
            <label className="mr-2">Search:</label>
            <input
              style={{ maxWidth: "140px" }}
              type="text"
              className="form-control-sm"
              placeholder="search users..."
              onChange={(e) => {
                setSearch(e.target.value);
              }}
            />
          </div>

          <div className="col-6 text-right">
            <label className="mr-2">Sorting:</label>
            <select
              onChange={(e) => {
                setSort(e.target.value);
              }}
              className="form-control-sm"
              style={{ maxWidth: "140px" }}
            >
              <option>Select</option>
              <option value="asc">Ascending</option>
              <option value="desc">Descending</option>
            </select>
          </div>
        </div>

        <h3>Users Information:</h3>
        {users && (
          <div className="table-responsive">
            <table className="table">
              <thead className="thead-dark">
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
                  .sort((a, b) => {
                    if (sort === "asc") {
                      return a.name < b.name ? -1 : 1;
                    } else if (sort === "desc") {
                      return a.name < b.name ? 1 : -1;
                    }
                  })
                  .map((item, index) => (
                    <tr key={item.id}>
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
          </div>
        )}
      </div>
    </div>
  );
}
