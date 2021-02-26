import React, {Component, useState, } from 'react';
import {Formik, useField, useFormikContext} from 'formik';
import * as yup from 'yup';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import { PostModel } from '../../models/posts.model';
import {mainService} from '../MainPage/main.service';
import {AddPostModalModel, AddPostModalState, AddPostModalFormModel} from './add-post-modal.model';

export enum EnumJobType {
  CEILING = 'CEILING',
  OTHER = 'OTHER'
}

export enum EnumJobStationingType {
  AUTO = 'AUTO',
  MANUAL = 'MANUAL'
}




export  const MyField = (props: any) => {
  const {
    values: { jobStationingType },
    touched,
    setFieldValue,
  } = useFormikContext<AddPostModalFormModel>();
  const [field, meta] = useField(props);

  React.useEffect(() => {
    console.log(jobStationingType)
    // set the value of textC, based on textA and textB
    // if (
    //   textA.trim() !== '' &&
    //   textB.trim() !== '' &&
    //   touched.textA &&
    //   touched.textB
    // ) {
    //   setFieldValue(props.name, `textA: ${textA}, textB: ${textB}`);
    // }
  }, [jobStationingType, touched.jobStationingType, setFieldValue, props.name]);

  return (
    <>
      <input {...props} {...field} />
      {!!meta.touched && !!meta.error && <div>{meta.error}</div>}
    </>
  );
};


export default class AddPostModal extends Component<AddPostModalModel> {
  state: AddPostModalState = new AddPostModalState();

  enumJobStationingType = EnumJobStationingType;
  enumJobType = EnumJobType;
  
  schema = yup.object().shape({
    title: yup.string().required('Required').max(20, 'Too Long!')
    //body: yup.string().required()
  });

  componentDidMount() {
    console.log('AddPostModal did mount',Object.values(this.enumJobType))
    this.props.emitter.subscribe(val => {
      if(val === false) {
        this.setState(new AddPostModalState());
      }
      this.setState({
        isShow: val
      });
      console.log(this.state)

    })
  }

  handleSubmit (event: any):void {

    this.setState({ validated: true });
    const post = new PostModel({
       ...event,
       userId: 1111,
       id:  Math.round(Math.random()* 1000)
    });
    console.log(event)
    mainService.savePost(post).subscribe();
    this.props.updateList();
    //this.handleClose();
  };

  handleClose():void {
    this.props.emitter.next(false);
  }

  handleChange(e: any) {
    console.log('handleChange:', e)
  }

  render() {
    return (
      <Formik
        validationSchema={this.schema}
        onSubmit={this.handleSubmit.bind(this)}
        initialValues={this.state.initialFormValues}
        
      >
        {({
          handleSubmit,
          handleChange=this.handleChange.bind(this),
          handleBlur,
          values={...new AddPostModalFormModel() },
          touched,
          isValid,
          errors,
        }) => (
          <Modal show={this.state.isShow} onHide={this.handleClose.bind(this)}>
            <Modal.Header closeButton>
              <Modal.Title>Add post</Modal.Title>
            </Modal.Header>
            <Form  noValidate validated={this.state.validated} onSubmit={handleSubmit}>
              <Modal.Body>
                <Form.Group controlId="postedit.title">
                  <Form.Label>Post title</Form.Label>
                  <Form.Control type="text" 
                    name="title" placeholder="Post title" 
                    onChange={handleChange}
                    value={values.title}
                    isInvalid={!!( errors.title)}
                    isValid={touched.title && !errors.title}
                  />
                 / {touched.title}/
                  <Form.Control.Feedback type="invalid">{errors.title}</Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId="postedit.jobType">
                  <Form.Label>Job Type</Form.Label>
                  <Form.Group id="formGridCheckbox" as={Row}>
                  {
                    Object.keys(this.enumJobType).map(item =>(
                    <Col key={item}>
                      <Form.Check 
                        type='radio'
                        label={item}
                        value={item}
                        id={item}
                        name="jobType"
                      />
                    </Col>
                    ))
                  }
                </Form.Group>
                </Form.Group>
                <Form.Group controlId="postedit.jobStationingType">
                  <Form.Label>Job Stationing Type</Form.Label>
                  <Form.Group id="formGridCheckbox" as={Row}>
                  {
                    Object.keys(this.enumJobStationingType).map(item =>(
                      <Col key={item}>
                        <Form.Check
                          type='radio'
                          label={item}
                          value={item}
                          id={item}
                          name="jobStationingType"
                        />
                      </Col>

                    ))
                  }
                  </Form.Group>
                </Form.Group>
                <Form.Group controlId="postedit.body">
                  <Form.Label>Post body</Form.Label>
                  <Form.Control as="textarea" rows={3}
                    name="body"
                    onChange={handleChange}
                    value={values.body}
                    isValid={touched.body && !errors.body}
                    />
                </Form.Group>

                <MyField name="textC" />
                
              </Modal.Body>
              <Modal.Footer>
                <Button variant="primary" type="submit" className="mr-3">Save</Button>
                <Button variant="secondary" type="button" onClick={this.handleClose.bind(this)}>Cancel</Button>
              </Modal.Footer>
            </Form>
          </Modal>
        )}
      </Formik>
    );
  }
}


