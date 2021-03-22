import React, {Component, useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { PostModel } from '../../models/posts.model';
import {mainService} from '../MainPage/main.service';
import {AddPostModalModel, AddPostModalState, AddPostModalFormModel} from './add-post-modal.model';
import {
  Validators, FormBuilder, FieldControl,
  FieldGroup,
  AbstractControl
} from "react-reactive-form";
import TextInput from "../../components/form/TextInput";
import TextArea from "../../components/form/TextArea";
import RadioInput from "../../components/form/RadioInput";
import Values from "./Values";

export enum EnumJobType {
  CEILING = 'CEILING',
  OTHER = 'OTHER'
}

export enum EnumJobStationingType {
  AUTO = 'AUTO',
  MANUAL = 'MANUAL'
}


export default class AddPostModal extends Component<AddPostModalModel> {
  state: AddPostModalState = new AddPostModalState();

  enumJobStationingType = EnumJobStationingType;
  enumJobType = EnumJobType;
  addPostForm = FormBuilder.group({
    title: "",
    jobType: EnumJobType.CEILING,
    // jobStationingType: "male",
    body: ""
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

    // this.setState({ validated: true });
    // const post = new PostModel({
    //    ...event,
    //    userId: 1111,
    //    id:  Math.round(Math.random()* 1000)
    // });
    // console.log(event)
    // mainService.savePost(post).subscribe();
    // this.props.updateList();
    //this.handleClose();
  };

  handleClose():void {
    this.props.emitter.next(false);
  }

  handleReset= () => {
    console.log("handleReset", this.addPostForm.value);
    this.addPostForm.reset();
  }



  render() {
    return (
      <Modal show={this.state.isShow} onHide={this.handleClose.bind(this)}>
        <Modal.Header closeButton>
          <Modal.Title>Add post</Modal.Title>
        </Modal.Header>
          <Modal.Body>
            <FieldGroup
              control={this.addPostForm}
              render={({ pristine, value }: AbstractControl) => (
                <form onSubmit={() => this.handleSubmit}>
                  <FieldControl name="title" render={TextInput} meta={{ label: "Post title"}} />
                  <FieldControl name="body"  meta={{ label: "Body"}} render={TextArea}/>
                  <FieldControl name="jobType"  meta={{ label: "Job Type", list: EnumJobType}} render={RadioInput}/>

{/* 
                  <FieldControl name="gender" render={GenderRadio} />

                  <FieldControl name="nationality" render={SelectBox} />

                  <FieldControl name="notes" render={TextArea} />

                  <FieldControl name="terms" render={Checkbox} /> */}

                  <div>
                    <button
                      disabled={pristine}
                      onClick={e => this.handleSubmit(e)}
                    >
                      Submit
                    </button>
                    <button
                      type="button"
                      onClick={() => this.handleReset()}
                    >
                      Reset
                    </button>
                  </div>
                  <Values value={value} />
                </form>
              )}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" type="submit" className="mr-3">Save</Button>
            <Button variant="secondary" type="button" onClick={this.handleClose.bind(this)}>Cancel</Button>
          </Modal.Footer>
      </Modal>
    );
  }
}

