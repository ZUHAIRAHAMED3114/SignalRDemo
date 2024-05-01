import { useState } from "react";
import { Form, Row, Col, Button } from "react-bootstrap";
function WaitingRoom({ joinChatRoom }) {
        const [username, setUsername] = useState();
        const [chatroom, setChatRoom] = useState();

  return (
      <Form onSubmit={e => {
          e.preventDefault();
          joinChatRoom(username, chatroom);
      }}>
          <Row className="px-5 py-5">
              <Col sm={12}>
                  <Form.Group>
                      <Form.Control
                          type="text"
                          placeholder="Username"
                          value={username}
                          onChange={e => setUsername(e.target.value)}
                      />
                  </Form.Group>
              </Col>
              <Col sm={12}>
                  <Form.Group>
                      <Form.Control
                          type="text"
                          placeholder="Chatroom"
                          value={chatroom}
                          onChange={e => setChatRoom(e.target.value)}
                      />
                  </Form.Group>
              </Col>
              <Col sm={12}>
                  <Button type="submit" >Join Chat Room</Button>
              </Col>
          </Row>
      </Form>

  );
}


export default WaitingRoom;