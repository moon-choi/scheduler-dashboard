import React, { Component } from "react";

import classnames from "classnames";
import Loading from "./Loading";
import Panel from "./Panel";


const data = [
  {
    id: 1,
    label: "Total Interviews",
    value: 6
  },
  {
    id: 2,
    label: "Least Popular Time Slot",
    value: "1pm"
  },
  {
    id: 3,
    label: "Most Popular Day",
    value: "Wednesday"
  },
  {
    id: 4,
    label: "Interviews Per Day",
    value: "2.3"
  }
];

class Dashboard extends Component {
  //initial state
  state = {
    loading: false,
    focused: null
  };

  //state setter
  selectPanel(id) {
    this.setState(previousState => ({
      focused: previousState.focused !== null ? null : id
    }));
  }

  render() {
    const dashboardClasses = classnames("dashboard", {
      "dashboard--focused": this.state.focused
    });

    if (this.state.loading) {
      return <Loading />;
    }

    // We filter the data first. The condition that we filter panels on depends on the this.state.focused value. If this.state.focused is null then return true for every panel. If this.state.focused is equal to the Panel, then let it through the filter.

    const panels = (this.state.focused ? data.filter(panel => this.state.focused === panel.id) : data)
      .map(panel => (
        <Panel
          key={panel.id}
          id={panel.id}
          label={panel.label}
          value={panel.value}
          onSelect={event => this.selectPanel(panel.id)}
        />
      ));

    return (
      <main className={dashboardClasses}>
        {panels}
      </main>
    );
  }
}


// different syntax

/*
function Dashboard(props) {
  const [state, setState] = React.useState({focused: null});
  const dashboardClasses = classnames("dashboard");

  function selectPanel(id) {
    setState({
      focused: id
    });
  }
  return <main className={dashboardClasses} />;
}
*/

export default Dashboard;
