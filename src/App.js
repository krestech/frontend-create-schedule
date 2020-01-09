import React, { Component } from "react";
import { Provider } from "react-redux";
import configureStore from "./redux/configureStore";
import { PersistGate } from "redux-persist/integration/react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Schedule from "./component/createSchedule";

// import

// declaration
const { store, persistor } = configureStore();

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <Router>
                    <>
                        <Route exact path="/" component={Schedule} />
                        {/* <Route path="/Home" component={Home} />
                        <Route
                            path="/ChangePassword"
                            component={ChangePassword}
                        />
                        <Route path="/UserBill" component={UserBill} />
                        <Route path="/UserRedeem" component={UserRedeem} />
                        <Route path="/RedeemMenus" component={RedeemMenus} />
                        <Route
                            path="/ChangeProfile"
                            component={ChangeProfile}
                        /> */}
                    </>
                </Router>
            </Provider>
        );
    }
}

export default App;
