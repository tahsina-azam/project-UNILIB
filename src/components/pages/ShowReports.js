import React, { Component } from "react";
import axios from "axios";
import ReportCard from "./ReportCard";
import "../../styles/Library.css";
import "./LibrarySearchBar";
import LibrarySearchBar from "./LibrarySearchBar";
import selectType from "../popups";

/**
 * its a class for showing all the reports made by user to the admin
 * @class
 * @constructor
 * @public
 */
class ShowReports extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reports: [],
      searchResult: [],
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
   * lifecycle method for requesting the issued book list from the backend
   * @method
   */
  componentDidMount() {
    axios
      .get("http://localhost:4000/allreports")
      .then((res) => {
        this.setState({
          reports: res.data,
          searchResult: res.data,
        });
        // selectType("success", "requested items");
      })
      .catch((err) => {
        selectType("error", "requested items");
        console.log("Error from ShowBookList");
      });
  }

  render() {
    const reports = this.state.reports;
    const searchResult = this.state.searchResult;
    let reportList;

    if (!reports) {
      reportList = "there are no reports!";
    } else if (!searchResult) {
      reportList = reports.map((report, k) => (
        <ReportCard report={report} key={k} />
      ));
    } else {
      reportList = searchResult.map((report, k) => (
        <ReportCard report={report} key={k} />
      ));
    }

    return (
      <div className="ShowBookList">
        <div className="container">
          <div className="row">
            <div className="list">{reportList}</div>
          </div>
        </div>
      </div>
    );
  }
}

export default ShowReports;
