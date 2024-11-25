import { Input } from "antd";
import styles from "./SearchBar.module.css";

const SearchBar = ({ onSearch }) => {
  const { Search } = Input;

  return (
    <Search
      className={styles.search__bar}
      placeholder="input search text"
      onSearch={onSearch}
    />
  );
};

export default SearchBar;
