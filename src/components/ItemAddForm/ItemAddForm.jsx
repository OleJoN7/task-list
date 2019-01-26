import React from 'react';
import './ItemAddForm.css';

class ItemAddForm extends React.Component {
    constructor() {
        super();
        this.state = {
            label:''
        }
    }
   
    onLabelChange = (e) => {
        const check = /^\s+/gm;
        if(e.target.value.match(check)) {
            this.setState({
                label:e.target.value.trim()
             })
        } else {
            this.setState({
                label:e.target.value
             })
        }
    }
    onSubmit = (e) => {
        e.preventDefault();
        if(this.state.label === '') {
            return false
        }
        this.props.onAdded(this.state.label);
        this.setState({
            label: ''
        })
    }
    render() {
        return (
            <form className="item-add-form d-flex" onSubmit={this.onSubmit}>
               <input 
                    type="text" 
                    className="form-control" 
                    onChange={this.onLabelChange}
                    placeholder="New task"
                    value={this.state.label}
                />
               <button 
                    className="btn btn-outline-secondary" 
                    type="submit">Add
                </button>
            </form>
        )
    }
    
}

export default ItemAddForm;