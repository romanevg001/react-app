import React, {Component, useState, useEffect } from 'react';
import {Formik, useField, useFormikContext, withFormik} from 'formik';
import * as yup from 'yup';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';

export enum EnumJobType {
  CEILING = 'CEILING',
  OTHER = 'OTHER'
}

export enum EnumJobStationingType {
  AUTO = 'AUTO',
  MANUAL = 'MANUAL'
}


export default MyField = (props) => {
  const {
    values: { textA, textB },
    setFieldValue,
  } = useFormikContext();
  const [field, meta] = useField(props);

  React.useEffect(() => {

    return () => {

    };
  }, [textB, textA, setFieldValue, props.name]);

  return (
    <>
      <input {...props} {...field} />
      {!!meta.touched && !!meta.error && <div>{meta.error}</div>}
    </>
  );
};

// export default class JobTypeComponent extends Component<any> {

//   enumJobStationingType = EnumJobStationingType;
//   enumJobType = EnumJobType;
  
//   componentDidMount() {
  
//   }

//   handleSubmit() {

//   }

//   render() {
//     return (
//       // <Formik
//       //   onSubmit={this.handleSubmit.bind(this)}
//       //   initialValues={{ jobType: 'CEILING'}}
//       // >
//       {({
//         handleSubmit,
//         handleChange,
//         handleBlur,
//         values,
//         touched,
//         isValid,
//         errors,
//       }) => (

//             // <Form  noValidate validated={this.state.validated} onSubmit={handleSubmit} onChange={this.handleChange.bind(this, values)}>
          
//                 <Form.Group controlId="postedit.jobType">
//                   <Form.Label>Job Type</Form.Label>
//                   <Form.Group id="formGridCheckbox" as={Row} onChange={handleChange}>
//                   {
//                     Object.keys(this.enumJobType).map(item =>(
//                     <Col key={item}>
//                       <Form.Check 
//                         type='radio'
//                         label={item}
//                         value={item}
//                         id={item}
//                         name="jobType"
//                       />
//                     </Col>
//                     ))
//                   }
//                   </Form.Group>
//                 </Form.Group>
               
//             // </Form>
        
//         )}
//      // </Formik>
//     );
//   }

// }


