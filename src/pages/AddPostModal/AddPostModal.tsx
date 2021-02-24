import React, {Component} from 'react';
import {Formik, FormikHelpers} from 'formik';
import * as yup from 'yup';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { PostModel } from '../../models/posts.model';
import {mainService} from '../MainPage/main.service';
import {AddPostModalModel, AddPostModalState} from './add-post-modal.model';


export default class AddPostModal extends Component<AddPostModalModel> {
  state: AddPostModalState = new AddPostModalState();
  
  schema = yup.object().shape({
    title: yup.string().required().max(200),
    body: yup.string().required()
  });

  componentDidMount() {
    console.log('AddPostModal did mount')
    this.props.emitter.subscribe(val => {
      if(val === false) {
        this.setState(new AddPostModalState());
      }
      this.setState({isShow: val});
      console.log(this.state)

    })
  }

  handleSubmit (event: any):void {
    const post = new PostModel({
       ...event,
       userId: 1111,
       id:  Math.round(Math.random()* 1000)
    });
    mainService.savePost(post).subscribe();
    this.props.updateList();
    this.handleClose();
  };

  handleClose():void {
    console.log(this.state)
    this.props.emitter.next(false);
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
          handleChange,
          handleBlur,
          values={...new AddPostModalState().initialFormValues },
          touched,
          isValid,
          errors,
        }) => (
          <Modal show={this.state.isShow} onHide={this.handleClose.bind(this)}>
            <Modal.Header closeButton>
              <Modal.Title>Add post</Modal.Title>
            </Modal.Header>
            <Form noValidate onSubmit={handleSubmit}>
              <Modal.Body>
                <Form.Group controlId="postedit.title">
                  <Form.Label>Post title - {values.title}</Form.Label>
                  <Form.Control type="text" 
                    name="title" placeholder="Post title" 
                    onChange={handleChange}
                    value={values.title}
                    isValid={touched.title && !errors.title}
                  />
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
