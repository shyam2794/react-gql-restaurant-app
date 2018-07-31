import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Homepage from "./components/LandingPage/Homepage";
import HistoryContainer from "./components/History/HistoryContainer";
import WeeklyBillContainer from "./components/History/weeklybills/WeeklyBillsContainer";
import LoginPage from "./components/Login";
import Booking from "./components/Tables/TableView";
import TableForm from "./components/Tables/TablesContainer";
import AddMenu from "./components/Menulist/MenulistContainer";
import FinalMenu from "./components/MenuFromDb/MenusFromDBContainer";
import PrintBill from "./components/Tables/BillToBePrinted";
import PrintToKitchenContainer from "./components/Tables/ToKitchen/PrintToKitchenContainer";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/Home" component={Homepage} />
          <Route path="/printBill" component={PrintBill} />
          <Route path="/PrintToKitchen" component={PrintToKitchenContainer} />
          <Route path="/Menu" component={AddMenu} />
          <Route path="/FinalMenuList" component={FinalMenu} />
          <Route path="/TableDetails" component={TableForm} />
          <Route path="/Booking" component={Booking} />
          <Route path="/bills" component={HistoryContainer} />
          <Route path="/weeklybills" component={WeeklyBillContainer} />
          <Route exact path="/" component={LoginPage} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
