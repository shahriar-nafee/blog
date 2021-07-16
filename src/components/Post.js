import React from "react";
import axios from "axios";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { Card } from "react-bootstrap";

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
        <div className="task-header d-flex justify-content-between mt-5">
          <h2 className="text-center">All Posts</h2>

          <button className="btn btn-primary" onClick={handleClick}>
            ADD POST
          </button>
        </div>
        {showForm && (
          <div className="row justify-content-center mt-3">
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
        <div className="row mt-5">
          {post &&
            post.slice(0, visible).map((item) => (
              <div className="col-md-6 mt-3">
                <Card style={{ width: "100%", height: "100%" }} key={item.id}>
                  <Card.Body>
                    <Card.Title>{item.title}</Card.Title>
                    <Card.Text>{item.body}</Card.Text>
                  </Card.Body>
                  <Card.Footer>
                    <div className="text-center">
                      <button
                        className="btn btn-warning"
                        onClick={() => {
                          history.push(`/comments/${item.id}`);
                        }}
                      >
                        Details
                      </button>
                    </div>
                  </Card.Footer>
                </Card>
              </div>
            ))}
        </div>
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
