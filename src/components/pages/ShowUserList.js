import React, { Component } from "react";
import { Button } from "react-bootstrap";
import axios from "axios";
import UserCard from "./UserCard";
import "../../styles/Fonts.css";
import "../../styles/ManageUser.css";
import AdminUserSearch from "../AdminUserSearch";
import selectType from "../popups";
/**
 * it is a class for showing the list of users
 * @class
 * @constructor
 * @public
 */
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
  /**
   *updates the state variable searchResult if it is passed as props to other components
   * @param {array} obj result from the searches made by the user
   */

  updateState = (obj) => {
    this.setState({ searchResult: obj }, () =>
      console.log(this.state.searchResult)
    );
  };

  /**
   * lifecycle method in which request is made to the backend for data
   * @method
   */
  componentDidMount() {
    axios
      .get("http://localhost:4000/allusers")
      .then((res) => {
        this.setState({
          users: res.data,
          searchResult: res.data,
        });
        // selectType("success", "requested items");
      })
      .catch((err) => {
        selectType("waiting", "requested page");
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
      <div className="ShowBookList mt-5">
        <div className="container text-center">
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
