import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function UsersProfile() {
  const { userId } = useParams();
  const [post, setPost] = useState();
  const [user, setUser] = useState();

  useEffect(() => {
    const fetch = async () => {
      await axios
        .get("https://jsonplaceholder.typicode.com/posts")
        .then((response) => {
          setPost(response.data);
        })
        .catch((err) => {
          console.log(`err`, err);
        });
    };
    fetch();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      await axios
        .get("https://jsonplaceholder.typicode.com/users")
        .then((res) => {
          setUser(res.data);
        })
        .catch((err) => {
          console.log(`err`, err);
        });
    };
    fetchData();
  }, []);

  return (
    <div className="jumbotron">
      <div className="container">
        {user &&
          user.map((item) => {
            if (item.id == userId)
              return (
                <div className="row mt-5" key={item.id}>
                  <table className="table">
                    <thead className="thead-dark">
                      <tr>
                        <th scope="row" colSpan="2" className="text-center">
                          user details
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <th scope="row">Name:</th>
                        <td>{item.name}</td>
                      </tr>
                      <tr>
                        <th scope="row">Email:</th>
                        <td>{item.email}</td>
                      </tr>
                      <tr>
                        <th scope="row">Username:</th>
                        <td>{item.username}</td>
                      </tr>
                      <tr>
                        <th scope="row">Website:</th>
                        <td>{item.website}</td>
                      </tr>
                      <tr>
                        <th scope="row">Phone:</th>
                        <td>{item.phone}</td>
                      </tr>
                      <tr>
                        <th scope="row">Zipcode:</th>
                        <td>{item.address.zipcode}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              );
          })}
        {post &&
          post.map((item, index) => {
            if (item.userId == userId)
              return (
                <div className="row mt-5 item mb-3" key={item.id}>
                  <div className="col-10">
                    <p>No. {index + 1}</p>
                    <h5>Title: {item.title}</h5>
                    <h6>Description: {item.body}</h6>
                  </div>
                </div>
              );
          })}
      </div>
    </div>
  );
}
