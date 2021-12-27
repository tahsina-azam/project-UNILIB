import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import UserCard from "./UserCard";
import "../../styles/Fonts.css";
import "../../styles/ManageUser.css";
import AdminUserSearch from "../AdminUserSearch";

class ShowUserList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      searchResult: [],
    };
  }

  updateState = (obj) => {
    this.setState({ searchResult: obj }, () =>
      console.log(this.state.searchResult)
    );
  };

  componentDidMount() {
    axios
      .get("http://localhost:4000/allusers")
      .then((res) => {
        this.setState({
          users: res.data,
          searchResult: res.data,
        });
      })
      .catch((err) => {
        console.log("Error from ShowUserList");
      });
  }

  render() {
    const users = this.state.users;
    const searchResult = this.state.searchResult;
    console.log("PrintUser: " + users);
    let userList;

    if (!users) {
      userList = "there is no user record!";
    } else if (!searchResult) {
      userList = users.map((user, k) => <UserCard user={user} key={k} />);
    } else {
      userList = searchResult.map((user, k) => (
        <UserCard user={user} key={k} />
      ));
    }

    return (
      <div className="ShowBookList">
        <div className="container">
          <div className="row">
            <AdminUserSearch
              users={this.state.users}
              updateParent={this.updateState}
            />
          </div>

          <div className="list">{userList}</div>
        </div>
      </div>
    );
  }
}

export default ShowUserList;
