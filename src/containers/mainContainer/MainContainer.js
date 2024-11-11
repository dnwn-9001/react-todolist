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
    if (!titleData || !contentData) {
      alert("제목과 내용을 입력해주세요.");
      return;
    }

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

  const onDeleteClickHandler = (index) => {
    setToDoList((prev) => prev.filter((_, i) => i !== index));
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
      <List
        listData={toDoList}
        onClickStatusBtn={onStatusClickHandler}
        onClickDeleteBtn={onDeleteClickHandler}
      />
    </div>
  );
};

export default MainContainer;
