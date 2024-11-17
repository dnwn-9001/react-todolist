import { useEffect, useState } from "react";
import styles from "./List.module.css";
import { Select } from "antd";

const List = ({
  filteredListData,
  toDoListData,
  onClickStatusBtn,
  onClickDeleteBtn,
  onChangeSelect,
  onClickDeleteAllBtn,
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

      <div className={styles.working__div}>
        <ul className={styles.working__ul}>
          {filteredListData.map(
            (v, i) =>
              !v.isDone && (
                <li className={styles.working__ul__li} key={`isNotDone_${i}`}>
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
      </div>

      <p className={styles.remaining__cnt}>{incompleteCnt}개 남음</p>
    </div>
  );
};

export default List;
