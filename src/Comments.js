import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

export default function Comments() {
  const { postid } = useParams();
  const [post, setPost] = useState();
  const [comment, setComment] = useState();

  useEffect(() => {
    const fetch = async () => {
      await axios
        .get(`https://jsonplaceholder.typicode.com/posts/${postid}`)
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
        .get(`https://jsonplaceholder.typicode.com/comments?postId=${postid}`)
        .then((response) => {
          setComment(response.data);
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
          <button className="btn btn-info">Home</button>
        </Link>
      </div>
      {post && (
        <div className="post mt-3 p-2">
          <h3>User Id: {post.userId}</h3>
          <h4>Title: {post.title}</h4>
          <h5>Description: {post.body}</h5>
        </div>
      )}
      {comment &&
        comment.map((item, index) => (
          <div className="item m-5 p-2" key={item.id}>
            <h5>Comment: {item.body}</h5>
            <p>
              Name: {item.name}
              <br></br>
              Email: {item.email}
            </p>
          </div>
        ))}
    </div>
  );
}
