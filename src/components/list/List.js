const List = ({ listData, onClickStatusBtn }) => {
  return (
    <div>
      <p>Working</p>
      <div>
        <ul>
          {listData.map((v, i) =>
            !v.isDone ? (
              <li key={`isNotDone_${i}`}>
                <div>
                  <p>{v.title}</p>
                  <p>{v.content}</p>
                </div>
                <button onClick={() => onClickStatusBtn(i)}>완료</button>
              </li>
            ) : (
              ""
            )
          )}
        </ul>
        <ul>
          {listData.map((v, i) =>
            v.isDone ? (
              <li key={`isDone_${i}`}>
                <div>
                  <p>{v.title}</p>
                  <p>{v.content}</p>
                </div>
                <button onClick={() => onClickStatusBtn(i)}>취소</button>
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
