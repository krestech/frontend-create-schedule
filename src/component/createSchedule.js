import React, { Component } from "react";

//import "./App.css";
// import { renderRoutes } from 'react-router-config';

import * as scheduleReducers from "../redux/modules/schedule";

import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import { Form, Select, Input, Button, DatePicker } from "antd";

import "antd/dist/antd.css";
const { Option } = Select;

function mapStateToProps(state) {
    return {
        schedule: state.schedule
    };
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({ ...scheduleReducers }, dispatch);
}

class Schedule extends Component {
    constructor(props) {
        super(props);

        // this.toggle = this.toggle.bind(this);
        // this.toggleFade = this.toggleFade.bind(this);
        this.state = {
            collapse: true,
            fadeIn: true,
            timeout: 300,
            dates: null,
            menu: "",
            batch: ""
        };
    }
    async componentDidMount() {
        await this.props.getAllProduct();
    }
    //const { Option } = Select;

    async handleDatePicker(date, dateString) {
        let dates = dateString;
        // return dates
        //console.log(dateString);
        await this.setState({
            dates: dateString
        });
        console.log("WOOOY", this.state.dates);
    }
    async onChangeMenu(value) {
        await this.setState({
            menu: `${value}`
        });
        console.log("WOOOY", this.state.menu);
    }
    async onChangeBatch(value) {
        await this.setState({
            batch: `${value}`
        });

        console.log("WOOOY", this.state.batch);
    }

    onBlur() {
        console.log("blur");
    }

    onFocus() {
        console.log("focus");
    }

    onSearch(val) {
        console.log("search:", val);
    }
    async handleOnSubmit() {
        let arangeData = {
            arrivalDate: this.state.dates,
            menu: this.state.menu,
            batch: this.state.batch
        };

        await this.props.createSchedule(arangeData);
        console.log("WOOY", arangeData);
    }

    render() {
        const menuData = this.props.schedule.productData;
        const listMenu = menuData.map((x, index) => {
            return (
                <Option key={index} value={x._id}>
                    {x.name}
                </Option>
            );
        });
        return (
            <div
                className="animated fadeIn"
                style={{ padding: (100, 100, 100, 100) }}
            >
                <div>
                    <h3>
                        Add Schedule{" "}
                        <strong
                            style={{ fontSize: 20, color: "rgb(211, 59, 61)" }}
                        >
                            Dailymeals
                        </strong>
                    </h3>
                </div>
                <Form>
                    <div style={{ paddingTop: 10, paddingBottom: 5 }}>
                        Tanggal
                    </div>
                    <DatePicker
                        style={{ width: 500 }}
                        onChange={(date, dateString) =>
                            this.handleDatePicker(date, dateString)
                        }
                    />
                    <div style={{ paddingTop: 10, paddingBottom: 5 }}>
                        Batch
                    </div>
                    <Select
                        label="Batch"
                        showSearch
                        style={{ width: 500 }}
                        placeholder="Select Batch"
                        optionFilterProp="children"
                        onChange={value => this.onChangeBatch(value)}
                        onFocus={this.onFocus}
                        onBlur={this.onBlur}
                        onSearch={this.onSearch}
                        filterOption={(input, option) =>
                            option.props.children
                                .toLowerCase()
                                .indexOf(input.toLowerCase()) >= 0
                        }
                    >
                        <Option value="Lunch">Lunch</Option>
                        <Option value="Dinner">Dinner</Option>
                    </Select>
                    <div style={{ paddingTop: 10, paddingBottom: 5 }}>Menu</div>
                    <Select
                        showSearch
                        style={{ width: 500 }}
                        placeholder="Select Menu"
                        optionFilterProp="children"
                        onChange={value => this.onChangeMenu(value)}
                        onFocus={this.onFocus}
                        onBlur={this.onBlur}
                        onSearch={this.onSearch}
                        filterOption={(input, option) =>
                            option.props.children
                                .toLowerCase()
                                .indexOf(input.toLowerCase()) >= 0
                        }
                    >
                        {listMenu}
                    </Select>
                    {(this.props.schedule.messageCreate === "success" && (
                        <div style={{ color: "green", paddingTop: 20 }}>
                            {" "}
                            Create Data Success .....!
                        </div>
                    )) ||
                        (this.props.schedule.messageCreate === "failed" && (
                            <div style={{ color: "red", paddingTop: 20 }}>
                                {" "}
                                Create Data Failed .....!
                            </div>
                        ))}

                    <div style={{ paddingTop: 20 }}>
                        <Button
                            type="primary"
                            onClick={() => this.handleOnSubmit()}
                        >
                            Insert
                        </Button>
                    </div>
                </Form>
            </div>
        );
    }
}

//export default App;
export default connect(mapStateToProps, mapDispatchToProps)(Schedule);
