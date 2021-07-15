import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Card } from "react-bootstrap";

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
                  <div className="table-responsive">
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
                </div>
              );
          })}
        <div className="mt-5">
          <h4>Posts</h4>
        </div>
        {post &&
          post.map((item, index) => {
            if (item.userId == userId)
              return (
                <div className="mt-3" key={item.id}>
                  <Card style={{ width: "100%", height: "100%" }} key={item.id}>
                    <Card.Body>
                      <Card.Title>{item.title}</Card.Title>
                      <Card.Text>{item.body}</Card.Text>
                    </Card.Body>
                  </Card>
                </div>
              );
          })}
      </div>
    </div>
  );
}
