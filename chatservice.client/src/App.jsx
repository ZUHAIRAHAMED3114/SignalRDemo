import './App.css';
import { Col, Container, Row } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import WaitingRoom from './Component/WaitingRoom';
import ChatRoom from './Component/ChatRoom';
import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import { useState, useEffect } from "react";

function App() {
    const [connection, setConnection] = useState(null);
    const [messages,setMessages]=useState([]);
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
        newConnection.on("RecieveSpecificMessage", (user,message)   => {
             console.log("Message recieved From Recieve Specific Message");
             setMessages(oldMessage=>[...oldMessage,{user,message}]);
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

// Assuming 'connection' is your SignalR connection object
const sendMessage = async (message) => {
    try {
        // Invoke the SendMessage method on the server
        await connection.invoke("SendMessage", message);
        console.log("Message sent successfully.");
    } catch (error) {
        console.error("Error occurred while sending message:", error);
    }
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
                    {connection ? (
                        <ChatRoom messages={messages} sendMessage={sendMessage} />
                    ) : (
                        <WaitingRoom joinChatRoom={joinFunction} />
                    )}
                </Container>
            </main>
        </div>
    );
}

export default App;
