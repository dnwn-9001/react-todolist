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
  const [toDoId, setToDoId] = useState("");
  const [searchWord, setSearchWord] = useState("");

  const onChangeTitleHandler = (e) => {
    setTitleData(e.target.value);
  };

  const onChangeContentHandler = (e) => {
    setContentData(e.target.value);
  };

  // 추가 및 수정
  const onAddClickHandler = (e) => {
    e.preventDefault();
    if (!titleData.trim() || !contentData.trim()) {
      alert("제목과 내용을 입력해주세요.");
      return;
    }

    if (!toDoId) {
      // id가 존재하지 않으면 추가
      const newTask = {
        title: titleData,
        content: contentData,
        isDone: false,
        id: uuidv4(),
      };
      setToDoList((prev) => [...prev, newTask]);
    } else {
      // id가 존재하면 수정
      setToDoList((prev) =>
        prev.map((item, i) =>
          item.id === toDoId
            ? { ...item, title: titleData, content: contentData }
            : item
        )
      );

      setToDoId("");
    }

    setTitleData("");
    setContentData("");

    e.target[0].focus();
  };

  // 수정을 위한 셋팅
  const onModifyHandler = (id, title, content) => {
    setToDoId(id);
    setTitleData(title);
    setContentData(content);
  };

  // 완료, 미완료 상태 변경
  const onStatusClickHandler = (id) => {
    // 기본적으로 toDoList의  isDone 상태를 변경
    setToDoList((prev) =>
      prev.map((item, i) =>
        item.id === id ? { ...item, isDone: !item.isDone } : item
      )
    );
    if (filterVal) {
      if (!searchWord) {
        // 검색어 없을때
        setFilteredList(toDoList.filter((item) => item.isDone === filterVal));
      } else if (searchWord) {
        // 검색어 있을때
        setFilteredList(
          toDoList.filter(
            (item) =>
              item.isDone === filterVal &&
              (item.title.includes(searchWord) ||
                item.content.includes(searchWord))
          )
        );
      }
    }
  };

  // 삭제
  const onDeleteClickHandler = (id) => {
    const result = window.confirm("삭제하시겠습니까?");
    if (result) setToDoList((prev) => prev.filter((item, i) => item.id !== id));
  };

  // 전체 삭제
  const onDeleteAll = () => {
    const result = window.confirm("모두 삭제하시겠습니까?");
    if (result) {
      setToDoList([]);
      setFilteredList([]);
    }
  };

  // 상태별 필터
  const sortByStatus = (val) => {
    setFilterVal(val);

    if (val === "") {
      // 전체검색이면서 검색어가 없을때
      if (!searchWord) setFilteredList(toDoList);
      // 검색어가 있을때
      else {
        setFilteredList(
          toDoList.filter(
            (item) =>
              item.title.includes(searchWord) ||
              item.content.includes(searchWord)
          )
        );
      }
    } else {
      // 필터링 상태이면서 검색어 없을때
      if (!searchWord)
        setFilteredList(toDoList.filter((item) => item.isDone === val));
      else {
        // 검색어 있을때
        setFilteredList(
          toDoList.filter(
            (item) =>
              item.isDone === val &&
              (item.title.includes(searchWord) ||
                item.content.includes(searchWord))
          )
        );
      }
    }
  };

  // 검색 필터
  const onSearch = (value = "") => {
    setSearchWord(value);

    if (!value) {
      sortByStatus(filterVal);
    } else {
      if (filterVal) {
        setFilteredList((prev) =>
          prev.filter(
            (item) => item.title.includes(value) || item.content.includes(value)
          )
        );
      } else {
        setFilteredList(
          toDoList.filter(
            (item) => item.title.includes(value) || item.content.includes(value)
          )
        );
      }
    }
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
        filteredListData={filteredList}
        toDoListData={toDoList}
        filterOption={filterVal}
        onClickStatusBtn={onStatusClickHandler}
        onClickDeleteBtn={onDeleteClickHandler}
        onChangeSelect={sortByStatus}
        onClickDeleteAllBtn={onDeleteAll}
        onClickModifyBtn={onModifyHandler}
        onSearch={onSearch}
      />
    </div>
  );
};

export default MainContainer;
