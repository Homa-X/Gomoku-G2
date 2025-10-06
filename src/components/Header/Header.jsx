import React from "react";
import styles from "./Header.module.css";

const Header = ({ title = "Welcome to Tic-Tac-Toe!" }) => {
  return <h1 className={styles.headerTitle}>{title}</h1>;
};

export default Header;