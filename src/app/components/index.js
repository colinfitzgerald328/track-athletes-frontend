import React from "react";
import DesktopVersion from "./desktop/desktop";
import MobileVersion from "./mobile/mobile";
import styles from "./styles.module.css";

export default class MainComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      width: 0,
      height: 0,
    };
  }

  componentDidMount() {
    window.addEventListener("resize", this.updateWindowDimensions.bind(this));
    this.updateWindowDimensions();
  }

  updateWindowDimensions() {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  }

  render() {
    if (this.state.width > 1400) {
      return (
        <div className={styles.desktopMain}>
          <DesktopVersion />
        </div>
      );
    } else {
      return (
        <div className={styles.mobileMain}>
          <MobileVersion />
        </div>
      );
    }
  }
}
