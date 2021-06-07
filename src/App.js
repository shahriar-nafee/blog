import React from "react";
import Post from "./components/Post";
import Comments from "./components/Comments";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Profile from "./components/Profile";
import Users from "./components/User";
import UserProfile from "./components/UsersProfile";
import "./App.css";

export default function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Post} />
        <Route exact path="/profile" component={Profile} />
        <Route exact path="/users" component={Users} />
        <Route exact path="/userprofile/:userId" component={UserProfile} />
        <Route exact path="/comments/:postid" component={Comments} />
      </Switch>
    </Router>
  );
}
