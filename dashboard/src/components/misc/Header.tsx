import { Button } from "antd";
import React, { PureComponent } from "react";

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
      <div>
        <Button onClick={() => handleNavigate("info")} />
        <Button onClick={() => handleNavigate("accounting")} />
        <Button onClick={() => handleNavigate("planning")} />
        <Button onClick={() => handleNavigate("scheduler")} />
        <Button onClick={() => handleNavigate("analysis")} />
        <Button onClick={() => handleNavigate("settings")} />
        <Button onClick={handleLogout} />
      </div>
    );
  }
}

export default Header;
