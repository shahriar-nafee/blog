import React from "react";
import Topbar from "./components/Navbar";
import Post from "./components/Post";
import Comments from "./components/Comments";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Profile from "./components/Profile";
import Users from "./components/User";
import UserProfile from "./components/UsersProfile";
import "./App.css";
import Footer from "./components/Footer";

export default function App() {
  return (
    <Router>
      <Topbar />
      <Switch>
        <Route exact path="/" component={Post} />
        <Route path="/profile" component={Profile} />
        <Route path="/users" component={Users} />
        <Route path="/userprofile/:userId" component={UserProfile} />
        <Route path="/comments/:postid" component={Comments} />
      </Switch>
      <Footer />
    </Router>
  );
}
