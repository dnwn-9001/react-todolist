import { useEffect, useState } from "react";
import styles from "./List.module.css";
import { Select } from "antd";
import SearchBar from "../searchBar/SearchBar";

const List = ({
  filteredListData,
  toDoListData,
  filterOption,
  onClickStatusBtn,
  onClickDeleteBtn,
  onChangeSelect,
  onClickDeleteAllBtn,
  onClickModifyBtn,
  onSearch,
}) => {
  const [incompleteCnt, setIncompleteCnt] = useState(0);

  const todoRemaining = () => {
    setIncompleteCnt(toDoListData?.filter((item) => !item.isDone)?.length);
  };

  useEffect(() => {
    todoRemaining();
  }, [toDoListData]);

  return (
    <div className={styles.working}>
      <div className={styles.working__header}>
        <h3>Working</h3>
        <div>
          <button className={styles.btn__delete} onClick={onClickDeleteAllBtn}>
            전체 삭제
          </button>
          <Select
            defaultValue=""
            style={{ width: 120 }}
            onChange={onChangeSelect}
            options={[
              { value: "", label: "전체" },
              { value: true, label: "완료" },
              { value: false, label: "미완료" },
            ]}
          />
        </div>
      </div>

      {/* 검색바 : 검색 값, 비교해서 조회하는 로직*/}
      <SearchBar onSearch={onSearch} />

      <div className={styles.working__div}>
        {filteredListData?.length ? (
          <>
            <ul className={styles.working__ul}>
              {filteredListData.map(
                (v, i) =>
                  !v.isDone && (
                    <li
                      className={styles.working__ul__li}
                      key={`isNotDone_${i}`}
                    >
                      <div className={styles.working__ul__li__content}>
                        <h4>{v.title}</h4>
                        <p>{v.content}</p>
                      </div>
                      <div>
                        <button
                          className={styles.btn__delete}
                          onClick={() => onClickDeleteBtn(v.id)}
                        >
                          삭제
                        </button>
                        <button
                          className={styles.btn__modify}
                          onClick={() =>
                            onClickModifyBtn(v.id, v.title, v.content)
                          }
                        >
                          수정
                        </button>
                        <button
                          className={styles.btn__incomplete}
                          onClick={() => onClickStatusBtn(v.id)}
                        >
                          완료
                        </button>
                      </div>
                    </li>
                  )
              )}
            </ul>
            <ul className={styles.working__ul}>
              {filteredListData.map(
                (v, i) =>
                  v.isDone && (
                    <li className={styles.working__ul__li} key={`isDone_${i}`}>
                      <div className={styles.working__ul__li__content}>
                        <h4>{v.title}</h4>
                        <p>{v.content}</p>
                      </div>
                      <div>
                        <button
                          className={styles.btn__delete}
                          onClick={() => onClickDeleteBtn(v.id)}
                        >
                          삭제
                        </button>
                        <button
                          className={styles.btn__complete}
                          onClick={() => onClickStatusBtn(v.id)}
                        >
                          취소
                        </button>
                      </div>
                    </li>
                  )
              )}
            </ul>
          </>
        ) : (
          <p className={styles.phrase}>
            {filterOption === ""
              ? "No tasks added. Start by creating one!"
              : filterOption
              ? "You have a lot to do! Keep going!"
              : "All tasks completed. Congratulations!"}
          </p>
        )}
      </div>

      <p className={styles.remaining__cnt}>{incompleteCnt}개 남음</p>
    </div>
  );
};

export default List;
