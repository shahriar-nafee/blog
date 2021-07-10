import React from "react";
import axios from "axios";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useHistory, Link } from "react-router-dom";

function Post() {
  let history = useHistory();
  const [data, setData] = useState({
    Title: "",
    Description: "",
  });
  const [post, setPost] = useState();
  const [visible, setVisible] = useState(10);
  const [showForm, setShowForm] = useState(false);
  const { register, handleSubmit, errors } = useForm();

  useEffect(() => {
    const fetchData = async () => {
      await axios
        .get("https://jsonplaceholder.typicode.com/posts")
        .then((response) => {
          setPost(response.data);
        })
        .catch((err) => {
          console.log(`err`, err);
        });
    };
    fetchData();
  }, []);

  const handleLoadButton = () => {
    setVisible(visible + 10);
  };

  const handleClick = () => {
    if (showForm === true) {
      setShowForm(false);
    } else {
      setShowForm(true);
    }
  };

  const handleInput = (e) => {
    const newData = { ...data };
    newData[e.target.name] = e.target.value;
    setData(newData);
  };

  const onSubmit = (data) => {
    axios
      .post("https://jsonplaceholder.typicode.com/posts", data)
      .then((res) => {
        alert(JSON.stringify(res.data));
      })
      .catch((err) => {
        console.log(`err`, err);
      });
    setShowForm(false);
  };

  return (
    <div className="jumbotron">
      <div className="container container-fluid">
        <div className="task-header d-flex justify-content-between pl-5 pr-5 mt-5">
          <h2 className="text-center">All Posts</h2>

          <button className="btn btn-primary" onClick={handleClick}>
            ADD POST
          </button>
        </div>
        {showForm && (
          <div className="row justify-content-center">
            <div className="col-md-8 bg-light p-4">
              <form onSubmit={handleSubmit(onSubmit)}>
                <input
                  className="form-control"
                  name="Title"
                  placeholder="Post Title"
                  ref={register({ required: true })}
                  onChange={(e) => handleInput(e)}
                />{" "}
                <br></br>
                <span className="text-danger">
                  {errors.Title && "Post Title is required"}
                </span>
                <textarea
                  className="form-control"
                  name="Description"
                  placeholder="Description"
                  ref={register({ required: true })}
                  onChange={(e) => handleInput(e)}
                />{" "}
                {errors.Priority && "Description is required"}
                <br></br>
                <input className="btn btn-success" type="submit" />
              </form>
            </div>
          </div>
        )}
        {post &&
          post.slice(0, visible).map((item, index) => (
            <div className="row mt-5 item" key={item.id}>
              <div className="col-md-10">
                <p>No. {index + 1}</p>
                <h4>Title: {item.title}</h4>
                <h5>Description: {item.body}</h5>
              </div>
              <div className="col-md-2 text-center align-self-center p-2">
                <button
                  className="btn btn-warning ml-2"
                  onClick={() => {
                    history.push(`/comments/${item.id}`);
                  }}
                >
                  Details
                </button>
              </div>
            </div>
          ))}
        <button
          className="btn btn-block btn-primary mt-5 mb-5"
          onClick={handleLoadButton}
        >
          load more
        </button>
      </div>
    </div>
  );
}

export default Post;
