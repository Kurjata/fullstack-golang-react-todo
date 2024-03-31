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


    onSubmit = () => {
        let { task } = this.state;
        // console.log("pRINTING task", this.state.task);
        if (task) {
          axios
            .post(
              endpoint + "/api/task",
              {
                task,
              },
              {
                headers: {
                  "Content-Type": "application/x-www-form-urlencoded",
                },
              }
            )
            .then((res) => {
              this.getTask();
              this.setState({
                task: "",
              });
              console.log(res);
            });
        }
      };
    


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

    updateTask = (id) => {
        axios.put(endpoint + "/api/task" + id, {
            headers:{
                "Content-Type": "application/x-www-form-urlencoded",
            },
        }).then((res)=>{
            console.log(res);
            this.getTasks();
        });
    };

    undoTask = (id) => {
        axios.put(endpoint + "/api/task" + id, {
            headers:{
                "Content-Type": "application/x-www-form-urlencoded",
            },
        }).then((res)=>{
            console.log(res);
            this.getTasks();
        });
    };


    deleteTask = (id) => {
        axios.delete(endpoint + "/api/task" + id,{
            header:{
                "Content-Type": "application/x-www-form-urlencoded",
            },
        }).then((res)=>{
            console.log(res);
            this.getTasks();
        });
    };

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
