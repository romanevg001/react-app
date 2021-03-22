import React from 'react';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const RadioInput = ({ handler,  touched, hasError, meta }: any) => {
  return <Form.Group>
      <Form.Label>{meta.label}</Form.Label>
      <Row>
      { (meta.list ?
        Object.entries(meta.list).map(([key, val]: any) =>(
          <Form.Group as={Col} controlId={meta.name + '_' + key} key={key}>
            <Form.Check  {...handler("radio", val)} name={meta.name} label={val}/>
          </Form.Group>
        ))
        : '')
      }
      </Row>
  </Form.Group>
};

export default RadioInput;