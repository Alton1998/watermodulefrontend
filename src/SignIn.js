import {Form, Container, Row,Col,Button, Jumbotron} from 'react-bootstrap';
import React from 'react'; 
import axios from 'axios';
import Home from './Home';
import KeyboardEventHandler from 'react-keyboard-event-handler';
export default class SignIn extends React.Component
{
    constructor(props)
    {
        super(props)
        this.state={
            Username:"",
            Password:"",
        }
        this.handleinput=this.handleinput.bind(this);
        this.handleauth=this.handleauth.bind(this);
    }
    // componentDidMount()
    // {
    //     window.sessionStorage.setItem('token',"")
    // }
    handleauth()
    {
        if(this.state.Username=="")
        {
            window.alert("Enter the Username");
        }
        else if(this.state.Password=="")
        {
            window.alert("Enter the Password");
        }
        else if(this.state.Username==""&&this.state.Password=="")
        {
            window.alert("Enter the Username and Password");
        }
        else if(this.state.Username!=""&&this.state.Username!="")
        {
            axios.post('http://192.168.2.12/watermodule/auth/login/', {
                username: this.state.Username,
                password: this.state.Password,
              })
              .then((response) => {
                window.sessionStorage.setItem("token",response.data.token)
                console.log("Token stored")
                this.setState({

                })
              })
              .catch((error)=> {
                console.log(error);
              });
        }
    }
    handleinput(event)
    {
        const name=event.target.name;
        this.setState(
            {
                [name]:event.target.value,
            }
        );
    }
    render(){
        if(window.sessionStorage.getItem("token")==null)
        {
          return (
            <Container>
              <Jumbotron style={{marginTop:200,}}>
                  <KeyboardEventHandler
            handleKeys={['a', 'b', 'c','enter']}
            onKeyEvent={this.handleauth} />
                    <Row>
                      <Col>
                            <Form.Label>Username</Form.Label>
                            <Form.Control name="Username" type="text" placeholder="Enter Username" onChange={this.handleinput} />
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                            <Form.Label>Password</Form.Label>
                            <Form.Control name="Password" type="password" placeholder=" Enter Password" onChange={this.handleinput} />
                      </Col>
                    </Row>
                    <Row>
                        <Col>
                        <Button size="lg" block variant="outline-primary" style={{marginTop:10}} onClick={this.handleauth}>Login</Button>
                        </Col>
                    </Row>
              </Jumbotron>
              </Container>
          );
        }
        else if(window.sessionStorage.getItem("token"))
        {
            return (
                <Home/>
            )
        }
    }
}
