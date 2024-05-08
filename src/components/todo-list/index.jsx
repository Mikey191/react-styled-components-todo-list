import styled from "styled-components";
import  TodoItem  from "../todo-item";

const StyledTodoItem = styled(TodoItem)`
  margin-bottom: 10px;
  color: ${({theme}) => theme.colors.task}
`

// Клмпонент содержащий в себе разметку, В которой каждый элемент по очереди будет отображаться на экране.
const TodoList = ({ title, items, onToggleTodo }) => {
  return (
    <>
      <h2>{title}</h2>
      <ul>
        {items.map((todo) => (
          <StyledTodoItem key={todo.id} {...todo} onToggleTodo={onToggleTodo} />
        ))}
      </ul>
    </>
  );
};

export default TodoList;
