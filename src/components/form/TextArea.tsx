import React from 'react';
import Form from 'react-bootstrap/Form';

export default ({ handler,  touched, hasError, meta  }: any) => (
  <Form.Group>
    <Form.Label>{meta.label}</Form.Label>
    <Form.Control as="textarea" rows={3} {...handler("textarea")} />
    <Form.Control.Feedback type="invalid">
      {
        touched
        && hasError("required")
        && `${meta.label} is required`
      }
    </Form.Control.Feedback> 
  </Form.Group>
);
