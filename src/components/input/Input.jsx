import styles from "./Input.module.css";

const Input = ({
  onClick,
  onChangeTitle,
  onChangeContent,
  titleVal,
  contentVal,
}) => {
  return (
    <form className={styles.form__area} onSubmit={onClick}>
      <div>
        <h3 className={styles.input__title}>Title</h3>
        <input
          type="text"
          className={styles.input__box}
          placeholder="제목을 입력해주세요."
          onChange={onChangeTitle}
          value={titleVal}
        />
      </div>
      <div>
        <h3 className={styles.input__title}>Content</h3>
        <input
          type="text"
          className={styles.input__box}
          placeholder="내용을 입력해주세요."
          onChange={onChangeContent}
          value={contentVal}
        />
      </div>
      <button className={styles.add__btn} type="submit">
        Add
      </button>
    </form>
  );
};

export default Input;
