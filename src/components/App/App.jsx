import React from 'react';
import Particles from 'react-particles-js';
import TodoList from '../TodoList';
import AppHeader from '../AppHeader';
import SearchPanel from '../SearchPanel';
import ItemStatusFilter from '../ItemStatusFilter';
import ItemAddForm from '../ItemAddForm';
import './App.css';

const parcticleOptions = {
    particles: {
        number: {
          value: 100,
          density: {
            enable: false,
            value_area: 800
          }
        },
        color: {
          value: '#ffffff'
        },
        shape: {
          type: 'circle',
          stroke: {
            width: 0,
            color: '#7d6262'
          },
          polygon: {
            nb_sides: 5
          },
          image: {
            src: 'img/github.svg',
            width: 100,
            height: 100
          }
        },
        opacity: {
          value: 0.5,
          random: false,
          anim: {
            enable: false,
            speed: 1,
            opacity_min: 0.1,
            sync: false
          }
        },
        size: {
          value: 5,
          random: true,
          anim: {
            enable: false,
            speed: 40,
            size_min: 0.1,
            sync: false
          }
        },
        line_linked: {
          enable: true,
          distance: 150,
          color: '#ffffff',
          opacity: 0.4,
          width: 1
        },
        move: {
          enable: true,
          speed: 6,
          direction: 'none',
          random: false,
          straight: false,
          out_mode: 'out',
          bounce: false,
          attract: {
            enable: false,
            rotateX: 600,
            rotateY: 1200
          }
        }
      },
      interactivity: {
        detect_on: 'canvas',
        events: {
          onhover: {
            enable: true,
            mode: 'repulse'
          },
          onclick: {
            enable: true,
            mode: 'push'
          },
          resize: true
        },
        modes: {
          grab: {
            distance: 400,
            line_linked: {
              opacity: 1
            }
          },
          bubble: {
            distance: 400,
            size: 40,
            duration: 2,
            opacity: 8,
            speed: 3
          },
          repulse: {
            distance: 200,
            duration: 0.4
          },
          push: {
            particles_nb: 4
          },
          remove: {
            particles_nb: 2
          }
        }
      },
      retina_detect: true
}

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            todoData: [
                this.createTodoItem("Drink Coffee"),
                this.createTodoItem("Watch awesome movie"),
                this.createTodoItem("Have a lunch"),
            ],
            search:'',
            filter:'all'
        }
    }

    newId = 1;
    createTodoItem(label) {
        return {
            label,
            important: false,
            done:false,
            id: this.newId++
        }
    }
    toggleProperty(arr,id,propName) {
        const newArr = arr.map(item => {
            if(item.id === id) {
               item[propName] = !item[propName]
            } 
            return item
        })
        return newArr;
    }
    onDone = (id) => {
        this.setState({
            todoData:this.toggleProperty(this.state.todoData,id,'done')
        })
    }
    onMarkImportant = (id) => {
        this.setState({
            todoData:this.toggleProperty(this.state.todoData,id,'important')
        })
    }
    onDeleted = (id) => {
    //-------Another way to refresh this.state without changing initial state-----------
        // this.setState(({todoData}) => {
        //     const itemId = todoData.findIndex(item => item.id === id);
        //     return {
        //         todoData: [...todoData.slice(0,itemId),...todoData.slice(itemId + 1)]
        //     }})
    //----------------------------------------------------------------------------------
        const saveItems = this.state.todoData.filter(item => item.id !== id)
        this.setState({
            todoData:saveItems
        })
        setTimeout(() => {
           console.log(this.state) 
        },0)
    }
    onAdded = (text) => {
        let newItem = this.createTodoItem(text);
        this.setState(({todoData}) => {
            let addItem = [...todoData,newItem];
            return {
                todoData:addItem
            }
        })
    }
    onSearchChange = (e) => {
        const check = /^\s+/gm;
        if(e.target.value.match(check)) {
            this.setState({
                search:e.target.value.trim()
            })
        } else {
            this.setState({
                search:e.target.value
            })
        }
    }
    searchItems(items,search) {
        if(search.length === '') {
            return items
        }
    return items.filter(item => {
            return item.label.toLowerCase().indexOf(search.toLowerCase()) !== -1;
        })
    }
    onFilterChange = (filter) => {
        this.setState({filter})
    }
    filterItems(items,filter) {
        switch(filter) {
            case 'all': 
               return items;
            case 'active': 
               return items.filter(item => !item.done);
            case 'done':
               return items.filter(item => item.done);
            default:
               return items   
        }
    }

    render() {
        const { todoData,search,filter} = this.state;
        const visibleItems = this.filterItems(this.searchItems(todoData,search),filter)
        const doneCount = todoData.filter(item => item.done === true).length;
        const todoCount = todoData.length - doneCount;
        return(
            <div className="app-container d-flex justify-content-center">
                <Particles className="particles"
                    params={parcticleOptions}
                />
                <main className="todo-app">
                    <AppHeader toDo={todoCount} done={doneCount}/>
                    <div className="top-panel d-flex">
                    <SearchPanel onSearchChange={this.onSearchChange} state={search} />
                    <ItemStatusFilter onFilterChange={this.onFilterChange} state={filter}/>
                    </div>
                    <TodoList 
                        onMarkImportant={this.onMarkImportant}
                        onDone={this.onDone} 
                        onDeleted={this.onDeleted}
                        todos={visibleItems}
                    />
                    <ItemAddForm 
                        onLabelChange={this.onLabelChange} 
                        onAdded={this.onAdded}
                    />
                </main>
            </div>
        )
    }
}

export default App;