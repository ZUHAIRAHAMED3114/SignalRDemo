import './App.css';
import { Col, Container, Row } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import WaitingRoom from './Component/WaitingRoom';
import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import { useState, useEffect } from "react";

function App() {
    const [connection, setConnection] = useState(null);

    // After each time refresh then we are creating signalR Connection..?
    let joinFunction = async (UserName,ChatRoom) => {
        // Create a new SignalR Hub connection
        const newConnection = new HubConnectionBuilder()
            .withUrl("https://localhost:7120/Chat")
            .withAutomaticReconnect()
            .build();
        
       newConnection.on("RecieveMessage", (user, message) => {
            console.log(`${user}: ${message}`);
        
        });

        try {
            await newConnection.start();
            await newConnection.invoke("JoinSpecificChatRoom", { UserName, ChatRoom });
            console.log("Connection established and JoinSpecificChatRoom method invoked successfully.");
        } catch (error) {
            console.error("Error occurred:", error);
        }
        
        setConnection(newConnection);
    };


    return (
        <div>
            <main>
                <Container>
                    <Row className='px-5 my-5'>
                        <Col sm='12'>
                            <h1 className='font-weight-light'>
                                Welcome to the F1 Chat App
                            </h1>
                        </Col>
                    </Row>
                    <WaitingRoom joinChatRoom={joinFunction} ></WaitingRoom>
                </Container>
            </main>
        </div>
    );
}

export default App;
