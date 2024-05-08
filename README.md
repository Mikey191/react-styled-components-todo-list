# Проект react-styled-components-todo-list.

### Создание проекта:
1. Создание проекта: npx create-react-add .
2. Установка библиотеки: npm install styled-components
3. Для автокомплита и подсветки синтаксиса в VSCode: vscode-styled-components
3. Подготовленные файлы с todo листом:

### Структура файлов проекта:
```bash
[] - src
 [] - components
  [] - todo-item
   [] - index.jsx
  [] - todo-list
   [] - index.jsx
 [] - App.jsx
 [] - data.js
 [] - index.js
```

## Файлы проекта:

### Файл App.jsx:
```javascript
import { useState } from "react";
import { startTodoList } from "./data";
import TodoList from "./components/todo-list";

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
    const today = newDate();
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
    <div className="App">
      {/* разметка приложения в которой есть заголовок и отдельные компоненты для каждого списка*/}
      <h1>Todo List</h1>
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
    </div>
  );
};

export default App;
```

### Файл data.js:
```javascript
// Готовый список Todo объектов
// text - текст задачи
// isDone - сделана задача или нет
// deadline - определяет актуальность задачи
export const startTodoList = [
  { id: 1, text: "Buy groceries", isDone: true, deadline: "2024-04-31" },
  { id: 2, text: "Do laundry", isDone: false, deadline: "2024-04-28" },
  { id: 3, text: "Clean bathroom", isDone: false, deadline: "2024-05-02" },
  { id: 4, text: "Walk the dog", isDone: false, deadline: "2024-02-29" },
  { id: 5, text: "Call mom", isDone: false, deadline: "2024-02-30" },
  { id: 6, text: "Read book", isDone: false, deadline: "2024-05-01" },
  { id: 7, text: "Write report", isDone: false, deadline: "2024-05-05" },
  { id: 8, text: "Pay bills", isDone: false, deadline: "2024-04-30" },
  { id: 9, text: "Go to gym", isDone: false, deadline: "2024-05-04" },
  { id: 10, text: "Attend meeting", isDone: false, deadline: "2024-05-05" },
  { id: 11, text: "Buy birthday gift", isDone: false, deadline: "2024-05-06" },
  { id: 12, text: "Finish project", isDone: true, deadline: "2024-05-07" },
  { id: 13, text: "Submit application", isDone: false, deadline: "2024-05-09" },
  { id: 14, text: "Practice piano", isDone: false, deadline: "2024-05-08" },
  { id: 15, text: "Cook dinner", isDone: true, deadline: "2024-05-02" },
];
```

### Файл index.js
```javascript
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
```

### Файл todo-item > index.jsx
```javascript
const TodoItem = ({ id, text, isDone, onToggleTodo }) => {
  const handleToggleTodo = () => {
    onToggleTodo?.(id);
  };
  return (
    <li>
      <input type="checkbox" checked={isDone} onChange={handleToggleTodo} />
      {/* Происходит зачеркивание элемента */}
      <span style={{ textDecoration: isDone ? "line-through" : "none" }}>
        {text}
      </span>
    </li>
  );
};

export default TodoItem;
```

### Файл todo-list > index.jsx
```javascript
import  TodoItem  from "../todo-item";

// Клмпонент содержащий в себе разметку, В которой каждый элемент по очереди будет отображаться на экране.
const TodoList = ({ title, items, onToggleTodo }) => {
  return (
    <>
      <h2>{title}</h2>
      <ul>
        {items.map((todo) => (
          <TodoItem 
          key={todo.id} 
          {...todo} 
          onToggleTodo={onToggleTodo} 
          />
        ))}
      </ul>
    </>
  );
};

export default TodoList;
```

## 1. БАЗОВОЕ ИСПОЛЬЗОВАНИЕ styled-components
    1.  Переходим в файл App.jsx
    2.  Для стилизации одного компонента создаем переменную Title. Значением она будет styled. .
    3.  Импортируем этот модуль из styled-components: import styled from "styled-components";.
    4.  Далее через точку указываем, какой элемент нам нужен: styled.h1
    5.  Далее все стили, которые мы будем применять к этому тегу будут прописываться внутри косых кавычек: styled.h1`color: blue;`
    6.  Теперь созданную переменную нужно использовать вместо названия тега. Переходим в разметку и вместо h1 записываем Title: <Title>Todo List</Title>. Цвет нашего текста в заголовке поменялся на Синий.
    7.  Если посмотреть в консоли разработчика на разметку, то мы увидим, что styled-components сгенерировал h1 с классом, у которого рандомное сгенерированное имя: sc-jTrOVX igAOsb.
    8.  Перейдем в компонент todo-item и стилизуем в нем тег li.
    9.  Создаем переменную ListElement.
    10. Присваиваем ей значение styled из styled-components.
    11. Тег добавляем li.
    12. Добавляем стили: const ListElement = styled.li`  list-style: none; `
    13. Меняем дефолтную li на ListElement и точки у todo исчезли.


## 2. СЕЛЕКТОРЫ НАСЛЕДОВАНИЯ И ПСЕВДОКЛАССЫ
    1.  Синтаксис styled-components поддерживает наследовательность.
    2.  Например, мы хотим задать стили для элемента внутри уже созданного. В нашем случае это будет input внутри ListElement. У наследования следующий синтаксис:
```javascript
const ListElement = styled.li`
  list-style: none;

  & input {
    margin-right: 15px;
  }
`
```
    3.  Таким же образом можно добавлять псевдоклассы и псевдоэлементы:
```javascript
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
```

## 3. ПРОПСЫ
    1.  Так же библиотека styled-components позволяет нам использовать пропсы для созданных новых элементов.
    2.  Стилизуем таким образом span, который находится внутри ListElement.
    3.  Внутри span присутствует логика: зачеркивать элемент или нет.
    4.  Выбор происходит исходя из того какое значение приходит в isDone.
    5.  Вот эту логику мы так же можем вынести в отдельный компонент с помощью styled.
    6.  Создаем новую переменную TaskText: const TaskText = styled.span` font-size: 20px; `
    7.  Поменяем span на компонент TaskText.
    8.  Вместо инлайн стиля будем использовать пропс: <TaskText isDone={isDone}>{text}</TaskText>.
    9.  Теперь это значение isDone мы можем получить находясь прямо внутри стилей. И внутри компонента со стилями прописать логику:
```javascript
const TaskText = styled.span`
  font-size: 20px;
  text-decoration: ${(props) => props.isDone ? "line-through" : "none"};
`
```
    10.  Для стиля text-decoration мы вызываем функцию с помощью синтаксиса ${}. Эта функция будет принимать все пропсы, передаваемые в наш компонент. ${(props) => }
    11.  И далее реализуем уже логику, с помощью которой значение в text-decoration будут меняться.


## 4. СТИЛИЗАЦИЯ КОМПОНЕНТОВ.
    1.  Переходим в файл todo-list. Будем стилизовать сам компонент TodoItem. Такое обычно может потребоваться, если компонент используется в разных частях приложения, и в каком-то конкретном месте нам нужен дополнительный стиль.
    2.  Создаем переменную StyledTodoItem. 
    3.  Присваиваем ей значение styled.
    4.  Далее, если мы используем уже созданный компонент, мы передаем его не через ".", а в круглые скобки "()": const StyledTodoItem = styled(TodoItem)` margin-bottom: 10px; `
    5.  И теперь эту переменную будем использовать вместо TodoItem:           <StyledTodoItem key={todo.id} {...todo} onToggleTodo={onToggleTodo} />
    6.  Пока стили не отработали. Что бы они отработали нам в самом компоненте TodoItem нужно указать в пропсах className, и этот className будет передаваться в родительский элемент нашего компонента:
```javascript
const TodoItem = ({className, id, text, isDone, onToggleTodo }) => {
  return <ListElement className={className} />
}
```

## 5. ТЕМЫ.
    1.  Темы в styled-components - это заранее заготовленные переменные, которые можно использовать по всему нашему приложению.
    2.  Переходим в App.jsx
    3.  Все наше приложение нужно обернуть в компонент ThemeProvider который мы будем импортировать из styled-components.
    4.  Этот компонент требует обязательный пропс, который называется theme.
    5.  Передаем этот пропс и создаем объект. Пока он будет пустой: const theme = {}
    6.  Внутри этого объекта можно создавать любую структуру данных.
    7.  Добавим две переменные: цвет заголовка и цвет текста задачи.

```javascript
const theme = {
  colors: {
    title: "green",
    task: '#555'
  }
};
```

    8.  Теперь этот объект в теме можно использовать как пропс в любом из компонентов.
    9.  Поменяем цвет заголовка: const Title = styled.h1` color: ${props => props.theme.colors.title}; `
    10. Часто можно встретить код с деструктуризацией: const Title = styled.h1` color: ${({theme}) => theme.colors.title}; `
    11. Добавим похожую конструкцию и для самих задач. Переходим в todo-list:

```javascript
const StyledTodoItem = styled(TodoItem)`
  margin-bottom: 10px;
  color: ${({theme}) => theme.colors.task}
`
```

    12. Главное преимущество очевидно. С помощью таких тем мы быстро можем менять разные значения. Например, можно сделать кнопку переключения с темной темы на светлую, и все это будет реализовано в одном месте кода.
    13. Например, создадим еще одну тему:

```javascript
const brightTheme = {
  colors:{
    title: "red",
    task: "orange"
  }
}
```

    14. И если мы передадим ее вместо theme в пропсы в <ThemeProvider theme={brightTheme}> то цвета поменяются.
    15. Обычно темы выносятся в отдельный файл. Создадим новую папку styles и в ней будут все файлы для стилей.
    16. Для тем создадим файл theme.jsx.
    17. Внутри развернем компонент, который будет возвращать ThemeProvider и внутрь передавать children. children будем получать из пропс.
    18. И туда же переносим реализацию theme и brightTheme.

```javascript
import { ThemeProvider } from "styled-components"

const theme = {
  colors: {
    title: "green",
    task: "#555",
  },
};

const brightTheme = {
  colors: {
    title: "red",
    task: "orange",
  },
};

const Theme = ({ children }) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default Theme;
```

    19. Теперь в компоненте App мы будем обертывать приложение в Theme вместо ThemeProvider.


## 6. ГЛОБАЛЬНЫЕ ТЕМЫ.
    1.  Например, убрать паддинг для всех элементов на странице.
    2.  Для этого мы можем из styled-components импортировать функцию, которая называется createGlobalStyle: import styled, { createGlobalStyle } from "styled-components";
    3.  Далее создаем переменную GlobalStyle.
    4.  Присвоим ей значение, которое возвращает функция createGlobalStyle.
    5.  Далее в косых кавычках прописываем глобальные стили:
```javascript
const GlobalStyle = createGlobalStyle`
  body{
    background-color: #ddd;
  }
`
```
    6.  Далее, что бы глобальные стили применились, этот компонент нужно передать в компонент App.
    7.  Где именно он будет вставляться не имеет особого значения, главное в App: const App = () => return ( <Theme> <GlobalStyle/> </Theme>)
    8.  Далее в этот глобальный стиль мы можем прописать например обнуление:
```javascript
const GlobalStyle = createGlobalStyle`
  * {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }
  body{
    background-color: #ddd;
  }
`
```
    9.  Далее сделаем декомпозицию и перенесем код связанный с глобальными стилями в файл с темой, потому что темы и глобальные стили обычно связаны между собой.
    10. И так же вставим этот компонент внутрь ThemeProvider, так как он все равно оборачивает все приложение.
```javascript
const GlobalStyle = createGlobalStyle`
  * {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }
  body{
    background-color: #ddd;
  }
`;

const Theme = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      {children}
    </ThemeProvider>
  );
};

```
