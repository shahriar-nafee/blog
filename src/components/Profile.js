import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Card } from "react-bootstrap";

export default function Profile() {
  const [id, setId] = useState();
  const [mypost, setMypost] = useState();
  const [showForm, setShowForm] = useState(false);
  const { register, handleSubmit, errors } = useForm();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      await axios
        .get("https://jsonplaceholder.typicode.com/posts")
        .then((response) => {
          setMypost(response.data);
        })
        .catch((err) => {
          console.log(`err`, err);
        });
    };
    fetchData();
  }, []);

  const handleDelete = (id, item) => {
    axios
      .delete(`https://jsonplaceholder.typicode.com/posts/${id}`, item)
      .then((res) => {
        alert("post deleted successfully");
      })
      .catch((err) => {
        console.log(`err`, err);
      });
  };

  const handleUpdate = (id) => {
    setId(id);
    axios
      .get(`https://jsonplaceholder.typicode.com/posts/${id}`)
      .then((res) => {
        setTitle(res.data.title);
        setDescription(res.data.body);
      })
      .catch((err) => {
        console.log(`err`, err);
      });

    if (showForm === false) {
      setShowForm(true);
    }
  };

  const onSubmit = () => {
    const data = { title, description };
    axios
      .put(`https://jsonplaceholder.typicode.com/posts/${id}`, data)
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
      <div className="container mt-5">
        <div className="task-header d-flex">
          <h2 className="text-center">My Posts</h2>
        </div>
        {showForm && (
          <div className="row justify-content-center">
            <div className="col-md-8 bg-light p-4">
              <form onSubmit={handleSubmit(onSubmit)}>
                <input
                  className="form-control"
                  name="Title"
                  value={title}
                  placeholder="Post Title"
                  ref={register({ required: true })}
                  onChange={(e) => {
                    setTitle(e.target.value);
                  }}
                />{" "}
                <br></br>
                <span className="text-danger">
                  {errors.Title && "Post Title is required"}
                </span>
                <textarea
                  className="form-control"
                  name="Description"
                  value={description}
                  placeholder="Description"
                  ref={register({ required: true })}
                  onChange={(e) => {
                    setDescription(e.target.value);
                  }}
                />{" "}
                {errors.Priority && "Description is required"}
                <br></br>
                <input className="btn btn-success" type="submit" />
              </form>
            </div>
          </div>
        )}

        {mypost &&
          mypost.map((item, index) => {
            if (item.userId === 2)
              return (
                <div className="mt-5" key={item.id}>
                  <Card style={{ width: "100%" }}>
                    <Card.Body>
                      <Card.Title>{item.title}</Card.Title>
                      <Card.Text>{item.body}</Card.Text>
                      <div className="text-center">
                        <button
                          className="btn btn-danger"
                          onClick={() => handleDelete(item.id, item)}
                        >
                          Delete
                        </button>
                        <button
                          className="btn btn-primary ml-2"
                          onClick={() => handleUpdate(item.id)}
                        >
                          Update
                        </button>
                      </div>
                    </Card.Body>
                  </Card>
                </div>
              );
          })}
      </div>
    </div>
  );
}
