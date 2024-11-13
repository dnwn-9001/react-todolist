import React, { useState, useEffect } from "react";
import { Input, List } from "../../components";
import styles from "./MainContainer.module.css";

const MainContainer = () => {
  const [titleData, setTitleData] = useState("");
  const [contentData, setContentData] = useState("");
  const [toDoList, setToDoList] = useState([]);
  const [filteredList, setFilteredList] = useState(toDoList);
  const [filterVal, setFilterVal] = useState("");

  const onChangeTitleHandler = (e) => {
    setTitleData(e.target.value);
  };

  const onChangeContentHandler = (e) => {
    setContentData(e.target.value);
  };

  const onAddClickHandler = (e) => {
    e.preventDefault();
    if (!titleData.trim() || !contentData.trim()) {
      alert("제목과 내용을 입력해주세요.");
      return;
    }

    const newTask = { title: titleData, content: contentData, isDone: false };
    setToDoList((prev) => [...prev, newTask]);

    setTitleData("");
    setContentData("");

    e.target[0].focus();
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

  const sortByStatus = (val) => {
    setFilterVal(val);
    if (val === "") setFilteredList(toDoList);
    else setFilteredList(toDoList.filter((item) => item.isDone === val));
  };

  useEffect(() => {
    sortByStatus(filterVal);
  }, [toDoList]);

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
        listData={filteredList}
        onClickStatusBtn={onStatusClickHandler}
        onClickDeleteBtn={onDeleteClickHandler}
        onChangeSelect={sortByStatus}
      />
    </div>
  );
};

export default MainContainer;
