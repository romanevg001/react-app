import React, {Component, useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import { PostModel } from '../../models/posts.model';
import {mainService} from '../MainPage/main.service';
import {AddPostModalModel, AddPostModalState, AddPostModalFormModel} from './add-post-modal.model';
import { Validators, FormGenerator} from "react-reactive-form";

export enum EnumJobType {
  CEILING = 'CEILING',
  OTHER = 'OTHER'
}

export enum EnumJobStationingType {
  AUTO = 'AUTO',
  MANUAL = 'MANUAL'
}


const TextArea = ({ handler,  touched, hasError, meta  }: any) => (
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

const TextInput = ({ handler,  touched, hasError, meta }: any) => (
  <Form.Group>
    <Form.Label>{meta.label}</Form.Label>
    <Form.Control {...handler("text")} isInvalid={!!(touched && hasError("required"))}
                    isValid={touched && !hasError("required")}
                     />
    <Form.Control.Feedback type="invalid">
      {
        touched
        && hasError("required")
        && `${meta.label} is required`
      }
    </Form.Control.Feedback> 
  </Form.Group>
);

const RadioInput = ({ handler,  touched, hasError, meta, list }: any) => (
  <Form.Group>
      <Form.Label>{meta.label}</Form.Label>
      <Form.Group id="formGridCheckbox" as={Row}>
      {
        list.map((item: any) =>(
        <Col key={item}>
          <Form.Check  {...handler("radio")} />
        </Col>
        ))
      }
      </Form.Group>
  </Form.Group>
);



export default class AddPostModal extends Component<AddPostModalModel> {
  state: AddPostModalState = new AddPostModalState();

  enumJobStationingType = EnumJobStationingType;
  enumJobType = EnumJobType;
  loginForm: any;
  

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

  handleReset= () => {
    this.loginForm.reset();
  }
  handleSubmit= (e: any) => {
      e.preventDefault();
      console.log("Form values", this.loginForm.value);
  }

  setForm = (form: any) => {
    this.loginForm = form;
    this.loginForm.meta = {
        handleReset: this.handleReset
    }
  }


  fieldConfig = {
    controls: {
        title: {
            options: {
                validators: Validators.required
            },
            render: TextInput,
            meta: { label: "Post title" }
        },
        jobType: {
          render: RadioInput,
          meta: { label: "Job Type" }
        },
        body: {
            options: {
                validators: Validators.required
            },
            render: TextArea,
            meta: { label: "Post body" }
        },
       
        $field_0: {
            isStatic: false,
            render: ({ invalid, meta: { handleReset } }: any) => (
                <div>
                    <button
                      type="button"
                      onClick={handleReset}
                    >
                      Reset
                    </button>
                    <button
                      type="submit"
                      disabled={invalid}
                    >
                      Submit
                    </button>
                </div>
            )
        }
    },
  }

  render() {
    return (
      <>
          <Modal show={this.state.isShow} onHide={this.handleClose.bind(this)}>
            <Modal.Header closeButton>
              <Modal.Title>Add post</Modal.Title>
            </Modal.Header>
            <form onSubmit={this.handleSubmit}>
              <Modal.Body>
                <FormGenerator
                    onMount={this.setForm}
                    fieldConfig={this.fieldConfig}
                />

                {/* <Form.Group controlId="postedit.title">
                  <Form.Label>Post title</Form.Label>
                  <Form.Control type="text" 
                    name="title" placeholder="Post title" 
                    onChange={handleChange}
                    value={values.title}
                    isInvalid={!!( errors.title)}
                    isValid={touched.title && !errors.title}
                  />
                  <Form.Control.Feedback type="invalid">{errors.title}</Form.Control.Feedback>
                </Form.Group> */}
{/* 
                <Form.Group controlId="postedit.jobType">
                  <Form.Label>Job Type</Form.Label>
                  <Form.Group id="formGridCheckbox" as={Row} onChange={handleChange}>
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
                </Form.Group> */}
                {/* <Form.Group controlId="postedit.body">
                  <Form.Label>Post body</Form.Label>
                  <Form.Control as="textarea" rows={3}
                    name="body"
                    onChange={handleChange}
                    value={values.body}
                    isValid={touched.body && !errors.body}
                    />
                </Form.Group> */}
            
              </Modal.Body>
              <Modal.Footer>
                <Button variant="primary" type="submit" className="mr-3">Save</Button>
                <Button variant="secondary" type="button" onClick={this.handleClose.bind(this)}>Cancel</Button>
              </Modal.Footer>
            </form>
          </Modal>
      
 
      </>
    );
  }
}


