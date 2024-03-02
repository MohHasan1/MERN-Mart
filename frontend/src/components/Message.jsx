import { Alert } from "react-bootstrap";


const Message = ({variant, children}) => {
  return (
    <section>
      <Alert variant={variant}>{children}</Alert>
    </section>
  );
};

Message.defaultProps = { variant: 'info' };

export default Message;
