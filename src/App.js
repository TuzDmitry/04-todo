import React from 'react';
import './App.css';
import TodoListHeader from "./TodoListHeader";
import TodoListTasks from "./TodoListTasks";
import TodoListFooter from "./TodoListFooter";

class App extends React.Component {

    constructor(props) {
        super(props);
    }

    state = {
        tasks: [
            {title: "JS", isDone: true, priority: "medium"},
            {title: "HTML", isDone: true, priority: "low"},
            {title: "CSS", isDone: true, priority: "low"},
            {title: "ReactJS", isDone: false, priority: "high"}
        ],
        filterValue: "All"
    };

    addTask = (newText) => {

        let newTask = {
            title: newText,
            isDone: false,
            priority: "low"
        };
        let newTasks = [...this.state.tasks, newTask];
        this.setState({
            tasks: newTasks
        });
    }
///////////
    changeFilter = (newFilterValue) => {
        this.setState({filterValue: newFilterValue})
    }


    changeStatus=(task, isDone)=>{
        let newTasks= this.state.tasks.map(taska=>{
            if(taska!==task){return taska}
            else {return {...taska, isDone: isDone}}
        });
        this.setState({tasks: newTasks});
    }

    render = () => {

        return (
            <div className="App">
                <div className="todoList">
                    <TodoListHeader addTask={this.addTask} />
                    <TodoListTasks
                        changeStatus={this.changeStatus}
                        tasks={this.state.tasks.filter(taska => {
                            if (this.state.filterValue === "All") {
                                return true;
                            }
                            if (this.state.filterValue === "Completed") {
                                return taska.isDone === true
                            }

                            if (this.state.filterValue === "Active") {
                                return taska.isDone === false
                            }
                        }
                    )}/>
                    <TodoListFooter
                        filterValue={this.state.filterValue}
                        changeFilter={this.changeFilter}
                    />
                </div>
            </div>
        );
    }
}

export default App;

