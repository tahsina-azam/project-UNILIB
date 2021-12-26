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
      userList = "there is no book record!";
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
            <div className="col-md-12">
              <br />
              <card className="card mx-auto" style={{ width: "18rem" }}>
                <h2 className="fnt-sheeva text-center">Users</h2>
              </card>
            </div>

            <div className="col-md-11">
              {/* <Link
                to="/create-book"
                className="btn btn-outline-warning float-right"
              >
                + Add New Book
           </Link>*/}
              <br />
              <br />
              <hr />
            </div>
          </div>

          <div className="list">{userList}</div>
        </div>
      </div>
    );
  }
}

export default ShowUserList;
