import React, { Component } from 'react';
import axios from 'axios';
import { Card, Header, Form, Input, Icon } from "semantic-ui-react";

let endpoint = "http://localhost:9000";

class ToDoList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            task: "",
            items: [],

        };
    }
    componentDidMount() {
        this.getTasks();
    }

    onChange = (event) => {
        this.setState({ 
            [event.target.name]: event.target.value
        });
    };


    onSubmit


    getTasks = () => {
        axios.get(endpoint + "/api/task").then((res)=>{
            if(res.data){
                this.setState({
                    items: res.data.map((item)=>{
                        let color = "yellow";
                        let style = {
                            wordWrap: "break-word",
                        };

                        if(item.status){
                            color = "green";
                            style["textDecoration"] = "line-through";
                        }

                        return (
                            <Card key = {item._id} color = {color} fluid className = "rough">
                                <Card.Content>
                                    <Card.Header textAlign = "left">
                                        <div style = {style}>{item.task}</div>
                                    </Card.Header>

                                    <Card.Meta textAlign = "right">
                                        <Icon 
                                        name = "check circle"
                                        color = "blue"
                                        onClick = {()=>this.updateTask(item._id)}
                                        />
                                        <sapn style = {{paddingRight: 10}}>Undo</sapn>
                                        <Icon
                                        name = "delete"
                                        color = "red"
                                        onClick = {()=>this.deleteTask(item._id)}
                                        />
                                        <sapn style = {{paddingRight: 10}}>Delete</sapn>
                                    </Card.Meta>
                                </Card.Content>
                            </Card>
                        );
                    }),
                });
            }else{
                this.setState({
                    items: [],
                });
            }
        });
    };

    updateTask

    undoTask

    deleteTask


    render(){
        return(
            <div>
                <div className = "row">

                    <Header className = "header" as = "h2" color= "yellow">
                        WELLCOME TO THE TO-DO LIST!
                    </Header>

                    <div className = "row">
                        <form onSubmit={this.onSubmit}>
                            <Input
                                type="text"
                                name="task"
                                onChange={this.onChange}
                                value={this.state.task}
                                fluid
                                placeholder="Create your task here..."
                            />
                            {/*<Button>Create Task</Button>*/}
                        </form>
                    </div>
                    <div className = "row">
                        <Card.Group>{this.state.items}</Card.Group>
                    </div>

                </div>
            </div>
        );
    } 
}

export default ToDoList;
