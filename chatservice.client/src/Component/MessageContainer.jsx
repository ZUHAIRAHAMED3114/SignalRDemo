import React from "react";
import { ListGroup } from "react-bootstrap";

const MessageContainer = ({ messages }) => {
  return (
    <ListGroup>
      {messages.map((message, index) => (
        <ListGroup.Item key={index}>
          <strong>{message.username}: </strong>
          {message.message}
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
};

export default MessageContainer;
