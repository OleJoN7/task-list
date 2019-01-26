import React from 'react';
import './TodoListItem.css';

const TodoListItem = (props) => {
    const {important,id,label,done,onDone,onDeleted,onMarkImportant} = props;
    let classNames = 'todo-list-item';
    if(done) {
        classNames += ' done'
    }
    if(important) {
        classNames += ' important'
    }
    return(
        <span className={classNames}>
            <span
                onClick={() => onDone(id)}
                className="todo-list-item-label"
                >
                {label}
            </span>
    
            <button onClick={() => onMarkImportant(id)}
                    type="button"
                    className="btn btn-outline-success btn-sm float-right">
                <i className="fa fa-exclamation" />
            </button>
    
            <button onClick={() => onDeleted(id)} 
                    type="button"
                    className="btn btn-outline-danger btn-sm float-right">
                <i className="fa fa-trash-o" />
            </button>
      </span>
    )
        
}

export default TodoListItem;