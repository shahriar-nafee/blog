import React from "react";
import Post from "./Post";
import Comments from "./Comments";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Profile from "./Profile";
import Users from "./User";
import UserProfile from "./UsersProfile";

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
