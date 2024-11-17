import React, { useState, useEffect } from "react";
import { Input, List } from "../../components";
import styles from "./MainContainer.module.css";
import { v4 as uuidv4 } from "uuid";

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

  // 추가
  const onAddClickHandler = (e) => {
    e.preventDefault();
    if (!titleData.trim() || !contentData.trim()) {
      alert("제목과 내용을 입력해주세요.");
      return;
    }

    const newTask = {
      title: titleData,
      content: contentData,
      isDone: false,
      id: uuidv4(),
    };
    setToDoList((prev) => [...prev, newTask]);

    setTitleData("");
    setContentData("");

    e.target[0].focus();
  };

  // 완료, 미완료 상태 변경
  const onStatusClickHandler = (id) => {
    setToDoList((prev) =>
      prev.map((item, i) =>
        item.id === id ? { ...item, isDone: !item.isDone } : item
      )
    );
  };

  // 삭제
  const onDeleteClickHandler = (id) => {
    const result = window.confirm("삭제하시겠습니까?");
    if (result) setToDoList((prev) => prev.filter((item, i) => item.id !== id));
  };

  // 상태별 필터
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
