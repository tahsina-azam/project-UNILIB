import React, { Component } from "react";
import { Button } from "react-bootstrap";
import axios from "axios";
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
      show: true,
      buttonText: "Hide users",
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
        <div className="container text-center">
          <div className="col-md-8 m-auto">
            <h1 className="display-4 text-center text-success mt-3">
              Issue This Book To Users
            </h1>
            <hr /> <br />
          </div>
          <div>
            <div className="row">
              <AdminUserSearch
                users={this.state.users}
                updateParent={this.updateState}
              />
            </div>

            <Button
              className="bg-success border-0 m-2"
              onClick={() => {
                this.setState({ show: !this.state.show });
                const setText =
                  this.state.buttonText === "Show users"
                    ? "Hide users"
                    : "Show users";
                this.setState({ buttonText: setText });
              }}
            >
              {this.state.buttonText}
            </Button>
            {this.state.show && <div className="list">{userList}</div>}
          </div>
        </div>
      </div>
    );
  }
}

export default ShowUserList;
