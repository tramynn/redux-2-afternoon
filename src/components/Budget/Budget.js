import React, { Component } from "react";
import Background from "./../shared/Background/Background";
import Chart1 from "./../shared/Chart1";
import Chart2 from "./../shared/Chart2";
import AddPurchase from "./../shared/AddPurchase";
import DisplayPurchases from "./../shared/DisplayPurchases";
import Loading from "./../shared/Loading/Loading";
import Nav from "./../shared/Nav";
import "./Budget.css";
import { connect } from "react-redux";
import { requestUserData } from "../../ducks/userReducer";
import {
  requestBudgetData,
  addPurchase,
  removePurchase
} from "../../ducks/budgetReducer";

class Budget extends Component {
  componentDidMount() {
    // After the this.props.requestUserData runs in the componentDidMount method, the http request should be sent for the user data.
    // When the user data comes back, the redux store gets updated, which will trigger a re-rending of the Budget component.
    this.props.requestUserData();
    this.props.requestBudgetData();
    this.props.removePurchase();
    this.props.addPurchase();
  }
  render() {
    // destructure loading from budgetReducer
    const { loading, purchases, budgetLimit } = this.props.budget;
    // destructure firstName and lastName from userReducer
    const { firstName, lastName } = this.props.user;
    return (
      <Background>
        {/* pass in loading */}
        {loading ? <Loading /> : null}
        <div className="budget-container">
          {/* pass in firstName and lastName as props to render */}
          <Nav firstName={firstName} lastName={lastName} />
          <div className="content-container">
            <div className="purchases-container">
              <AddPurchase addPurchase={this.props.addPurchase} />
              <DisplayPurchases
                purchases={purchases}
                removePurchase={this.props.removePurchase}
              />
            </div>
            <div className="chart-container">
              <Chart1 purchases={purchases} budgetLimit={budgetLimit} />
              <Chart2 purchases={purchases} />
            </div>
          </div>
        </div>
      </Background>
    );
  }
}

function mapStateToProps(state) {
  return {
    budget: state.budget,
    user: state.user
  };
}

export default connect(
  mapStateToProps,
  { requestUserData, requestBudgetData, addPurchase, removePurchase }
)(Budget);
