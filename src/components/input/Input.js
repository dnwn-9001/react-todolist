import React from "react";

const Input = ({
  onClick,
  onChangeTitle,
  onChangeContent,
  titleVal,
  contentVal,
}) => {
  return (
    <form onSubmit={onClick}>
      <div>
        <sapn>제목</sapn>
        <input
          type="text"
          placeholder="제목을 입력해주세요."
          onChange={onChangeTitle}
          value={titleVal}
        />
      </div>
      <div>
        <sapn>내용</sapn>
        <input
          type="text"
          placeholder="내용을 입력해주세요."
          onChange={onChangeContent}
          value={contentVal}
        />
      </div>
      <button type="submit">추가하기</button>
    </form>
  );
};

export default Input;
