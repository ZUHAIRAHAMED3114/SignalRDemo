import { useState } from "react";
import { Form, InputGroup ,Button} from "react-bootstrap";

const SendMessageForm = ({ sendMessage }) => {
    const [msg, setMessage] = useState('');

    const formSubmit = (e) => {
        e.preventDefault();
        sendMessage(msg);
    };

    return (
        <Form onSubmit={formSubmit}>
            <InputGroup className="mb-3">
                <InputGroup.Text>Chat</InputGroup.Text>
                <Form.Control
                    type="text"
                    placeholder="Type your message..."
                    value={msg}
                    onChange={(e) => setMessage(e.target.value)}
                />
            </InputGroup>
            <Button type="submit" disabled={!msg.trim()}>
                    Send
                </Button>
        </Form>
    );
};

export default SendMessageForm;
