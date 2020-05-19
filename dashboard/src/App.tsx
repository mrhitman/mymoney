import "./App.css";
import {
  Alignment,
  Classes,
  InputGroup,
  Navbar,
  Tab,
  Tabs,
} from "@blueprintjs/core";
import React from "react";

class App extends React.Component {
  public state = {
    activePanelOnly: false,
    animate: true,
    navbarTabId: "Home",
    vertical: true,
  };

  public render() {
    return (
      <div className="App">
        <Navbar>
          <Navbar.Group>
            <Navbar.Heading>
              Current page: <strong>{this.state.navbarTabId}</strong>
            </Navbar.Heading>
          </Navbar.Group>
          <Navbar.Group align={Alignment.RIGHT}>
            <Tabs
              animate={this.state.animate}
              id="navbar"
              large={true}
              selectedTabId={this.state.navbarTabId}
            >
              <Tab id="Home" title="Home" />
              <Tab id="Files" title="Files" />
              <Tab id="Builds" title="Builds" />
            </Tabs>
          </Navbar.Group>
        </Navbar>
        <Tabs
          animate={this.state.animate}
          id="TabsExample"
          key={this.state.vertical ? "vertical" : "horizontal"}
          renderActiveTabPanelOnly={this.state.activePanelOnly}
          vertical={this.state.vertical}
        >
          <Tab id="rx" title="React" panel={<div />} />
          <Tab id="ng" title="Angular" panel={<div />} />
          <Tab
            id="mb"
            title="Ember"
            panel={<div />}
            panelClassName="ember-panel"
          />
          <Tab id="bb" disabled={true} title="Backbone" panel={<div />} />
          <Tabs.Expander />
          <InputGroup
            className={Classes.FILL}
            type="text"
            placeholder="Search..."
          />
        </Tabs>
      </div>
    );
  }
}

export default App;
