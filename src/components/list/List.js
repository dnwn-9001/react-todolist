import styles from "./List.module.css";

const List = ({ listData, onClickStatusBtn }) => {
  return (
    <div className={styles.working}>
      <h3>Working</h3>
      <div>
        <ul className={styles.working__ul}>
          {listData.map((v, i) =>
            !v.isDone ? (
              <li className={styles.working__ul__li} key={`isNotDone_${i}`}>
                <div className={styles.working__ul__li__content}>
                  <h4>{v.title}</h4>
                  <p>{v.content}</p>
                </div>
                <button
                  className={styles.btn__incomplete}
                  onClick={() => onClickStatusBtn(i)}
                >
                  완료
                </button>
              </li>
            ) : (
              ""
            )
          )}
        </ul>
        <ul className={styles.working__ul}>
          {listData.map((v, i) =>
            v.isDone ? (
              <li className={styles.working__ul__li} key={`isDone_${i}`}>
                <div className={styles.working__ul__li__content}>
                  <h4>{v.title}</h4>
                  <p>{v.content}</p>
                </div>
                <button
                  className={styles.btn__complete}
                  onClick={() => onClickStatusBtn(i)}
                >
                  취소
                </button>
              </li>
            ) : (
              ""
            )
          )}
        </ul>
      </div>
    </div>
  );
};

export default List;
