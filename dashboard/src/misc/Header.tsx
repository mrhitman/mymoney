import React, { PureComponent } from "react";
import { ButtonGroup, Button, Divider, Icon } from "@blueprintjs/core";

export type ActivePage =
  | "info"
  | "accounting"
  | "planning"
  | "scheduler"
  | "analysis"
  | "settings"
  | undefined;

interface HeaderProps {
  activePage: ActivePage;
  handleLogout: () => void;
  handleNavigate: (activePage: ActivePage) => void;
}

export class Header extends PureComponent<HeaderProps> {
  public render() {
    const { activePage, handleLogout, handleNavigate } = this.props;

    return (
      <ButtonGroup large minimal fill>
        <Button
          active={activePage === "info"}
          icon={"info-sign"}
          text="Information"
          onClick={() => handleNavigate("info")}
        />
        <Button
          active={activePage === "accounting"}
          icon={"user"}
          text="Accounting"
          onClick={() => handleNavigate("accounting")}
        />
        <Button
          active={activePage === "planning"}
          icon={"predictive-analysis"}
          text="Planning"
          onClick={() => handleNavigate("planning")}
        />
        <Button
          active={activePage === "scheduler"}
          icon={"timeline-events"}
          text="Scheduler"
          onClick={() => handleNavigate("scheduler")}
        />
        <Button
          active={activePage === "analysis"}
          icon={"chart"}
          text="Analysis"
          onClick={() => handleNavigate("analysis")}
        />
        <Divider />
        <Button
          active={activePage === "settings"}
          large={false}
          minimal={false}
          text={<Icon icon="settings" />}
          onClick={() => handleNavigate("settings")}
        />
        <Button
          large={false}
          minimal={false}
          text={<Icon icon="log-out" />}
          onClick={handleLogout}
        />
      </ButtonGroup>
    );
  }
}

export default Header;
