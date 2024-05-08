import styled from "styled-components";

const ListElement = styled.li`
  list-style: none;

  & input {
    margin-right: 15px;
  }
  &:hover{
    background-color: #eee;
    cursor: pointer;
  }
`

const TaskText = styled.span`
  font-size: 20px;
  text-decoration: ${(props) => props.isDone ? "line-through" : "none"};
`

const TodoItem = ({className, id, text, isDone, onToggleTodo }) => {
  const handleToggleTodo = () => {
    onToggleTodo?.(id);
  };
  return (
    <ListElement className={className}>
      <input type="checkbox" checked={isDone} onChange={handleToggleTodo} />
      {/* Происходит зачеркивание элемента */}
      <TaskText isDone={isDone}>{text}</TaskText>
    </ListElement>
  );
};

export default TodoItem;