import React, { useState } from "react";
import { Input, List } from "../../components";
import styles from "./MainContainer.module.css";

const MainContainer = () => {
  const [titleData, setTitleData] = useState("");
  const [contentData, setContentData] = useState("");
  const [toDoList, setToDoList] = useState([]);

  const onChangeTitleHandler = (e) => {
    setTitleData(e.target.value);
  };

  const onChangeContentHandler = (e) => {
    setContentData(e.target.value);
  };

  const onAddClickHandler = (e) => {
    e.preventDefault();
    setToDoList((prev) => [
      ...prev,
      { title: titleData, content: contentData, isDone: false },
    ]);
    setTitleData("");
    setContentData("");
  };

  const onStatusClickHandler = (index) => {
    setToDoList((prev) =>
      prev.map((item, i) =>
        i === index ? { ...item, isDone: !item.isDone } : item
      )
    );
  };
  return (
    <div className={styles.container}>
      <Input
        titleVal={titleData}
        contentVal={contentData}
        onChangeTitle={onChangeTitleHandler}
        onChangeContent={onChangeContentHandler}
        onClick={onAddClickHandler}
      />
      <List listData={toDoList} onClickStatusBtn={onStatusClickHandler} />
    </div>
  );
};

export default MainContainer;
