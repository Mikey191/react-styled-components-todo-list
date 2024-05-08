import { useState } from "react";
import { startTodoList } from "./data";
import TodoList from "./components/todo-list";
import styled from "styled-components";
import Theme from "./styles/theme";

const Title = styled.h1`
  color: ${({theme}) => theme.colors.title};
`

const App = () => {
  // состояние в которм содержатся todo элементы
  const [todos, setTodos] = useState(startTodoList);

  // Функции для фильтрации задач по определенным параметрам
  // В приложении все задачи распределены на три пункта:
  // 1. Overdue - просроченные
  // 2. Actual - актуальные
  // 3. Completed - выполненные
  // Если задача выполняется, то она попадает в другой список. В пункт Overdue попадают задачи, дедлайн у которых уже прошел. Actual - это задачи у которых дедлайн еще не наступил
  const getOverdueTodos = () => {
    const today = new Date();
    return todos.filter(
      (todo) => !todo.isDone && new Date(todo.deadline) < today
    );
  };

  const getActualTodos = () => {
    const today = new Date();
    return todos.filter(
      (todo) => !todo.isDone && new Date(todo.deadline) >= today
    );
  };

  const getCompletedTodos = () => {
    return todos.filter((todo) => todo.isDone);
  };

  //Функция управляет тем, как мы зачеркиваем задачи. Как изменяется isDone
  const toggleTodo = (id) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, isDone: !todo.isDone };
      } else {
        return todo;
      }
    });
    setTodos(updatedTodos);
  };

  return (
    <Theme>
      {/* разметка приложения в которой есть заголовок и отдельные компоненты для каждого списка*/}
      <Title>Todo List</Title>
      <TodoList
      // Заголовок списка
        title="Overdue"
        // какие Todo в нем будут
        items={getOverdueTodos()}
        // Функция которое меняет idDone. Передается так же в каждый компонент
        onToggleTodo={toggleTodo}
      />
      <TodoList
        title="Actual"
        items={getActualTodos()}
        onToggleTodo={toggleTodo}
      />
      <TodoList
        title="Completed"
        items={getCompletedTodos()}
        onToggleTodo={toggleTodo}
      />
    </Theme>
  );
};

export default App;