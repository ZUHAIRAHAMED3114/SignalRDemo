import './App.css';
import { Col, Container, Row } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import WaitingRoom from './Component/WaitingRoom';
import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import { useState, useEffect } from "react";

function App() {
    const [connection, setConnection] = useState(null);

    // After each time refresh then we are creating signalR Connection..?
    let joinFunction = () => {
        // Create a new SignalR Hub connection
        const newConnection = new HubConnectionBuilder()
            .withUrl("https://localhost:7120/Chat")
            .configureLogging(LogLevel.Information)
            .withAutomaticReconnect()
            .build();

        newConnection.on("JoinSpecificChatRoom", (username, msg) => {
            console.log("Msg", msg);
        });

        newConnection.on("ReceiveMessage", (user, message) => {
            console.log(`${user}: ${message}`);
            // Handle received messages
        });

        // Start the connection
        newConnection.start().then(() => {
            console.log("Connection established.");
            setConnection(newConnection);
           
        }).catch((error) => {
            console.error("Error establishing connection:", error);
        });
    };

    useEffect(() => {
        joinFunction();
    }, []);

   

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
                    <WaitingRoom ></WaitingRoom>
                </Container>
            </main>
        </div>
    );
}

export default App;
