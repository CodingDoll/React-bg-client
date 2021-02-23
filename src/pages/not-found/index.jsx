import React, { Component } from "react";
import { connect } from "react-redux";
import { Button } from "antd";
import { setHeadTitle } from "../../redux/actions";

export class NotFound extends Component {
  render() {
    this.props.setHeadTitle("404");
    return (
      <div>
        <Button type="primary"></Button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({ headTitle: state.headTitle });

const mapDispatchToProps = { setHeadTitle };

export default connect(mapStateToProps, mapDispatchToProps)(NotFound);
