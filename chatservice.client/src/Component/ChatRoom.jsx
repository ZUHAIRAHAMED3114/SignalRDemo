import { Col, Row } from "react-bootstrap";
import MessageContainer from "./MessageContainer"; // Import the MessageContainer component
import SendMessageForm from "./SendMessagForm";

const ChatRoom = ({ messages,sendMessage }) => {
    return (
        <div>
            <Row className="px-5 py-5">
                <Col sm={10}>
                    <h2>ChatRoom</h2>
                </Col>
                <Col>
                    {/* Add any additional components or actions here */}
                </Col>
            </Row>
            <Row className="px-5 py-5">
                <Col sm={12}>
                    {/* Render the MessageContainer component passing messages */}
                    <MessageContainer messages={messages} />
                </Col>
                <Col sm={12}>
                  
                  <SendMessageForm sendMessage={sendMessage}></SendMessageForm>
                </Col>
            </Row>
        </div>
    );
};

export default ChatRoom;
