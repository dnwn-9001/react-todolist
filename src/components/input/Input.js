import React from "react";

const Input = () => {
  return (
    <form>
      <div>
        <sapn>제목</sapn>
        <input />
      </div>
      <div>
        <sapn>내용</sapn>
        <input />
      </div>
      <button type="submit">추가하기</button>
    </form>
  );
};

export default Input;
