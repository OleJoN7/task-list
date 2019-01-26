import React from 'react';
import TodoListItem from '../TodoListItem';
import './TodoList.css'

const TodoList = ({onDone,onMarkImportant,onDeleted,todos}) => {
    return (
        <ul className="list-group todo-list">
            {  
               todos.map(item => {
                   const {id,...itemProps} = item;
                   return(
                    <li key={id} className="list-group-item">
                       <TodoListItem 
                            onDeleted={onDeleted} 
                            onMarkImportant={onMarkImportant} 
                            onDone={onDone}  
                            id={id}
                            {...itemProps}
                       />
                    </li>
                   )
               })
            }
        </ul>
    )
}

export default TodoList;