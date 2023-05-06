import { Badge } from "react-bootstrap";

function Email(props) {
  const { order, subject, user } = props;

  return (
    <>
      <h1>Hello {user.name}</h1>
      <h4>{subject} - BK Garments Embroidery Works</h4>
      <br />
      <p>
        <b>Order Details</b>
      </p>
      <p>Requested Service: {order.serviceTitle}</p>
      <p>
        Status:
        {item.status === 0 && <Badge bg="warning">Placed</Badge>}
        {item.status === 1 && <Badge bg="primary">Accepted</Badge>}
        {item.status === 2 && <Badge bg="success">Completed</Badge>}
        {item.status === -1 && <Badge bg="danger">Rejected</Badge>}
      </p>
      <p>Order Placed at {order.timestamp}</p>
      {order.acceptedTimestamp && <p>Order Acceted : {order.acceptedTimestamp}</p>}
      {order.rejectedTimestamp && <p>Order Acceted : {order.rejectedTimestamp}</p>}
      {order.completedTimestamp && <p>Order Acceted : {order.completedTimestamp}</p>}
    </>
  );
}

export default Email;
