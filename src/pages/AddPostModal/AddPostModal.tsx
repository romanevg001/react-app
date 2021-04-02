import React, {Component, useState, useEffect } from 'react';
import {distinctUntilChanged, map } from 'rxjs/operators';
import {Observable, of, combineLatest} from 'rxjs';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
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
    jobStationing: EnumJobStationingType.AUTO,
    body: ""
  });

  constructor(props: any) {
    super(props);

    this.addPostForm.valueChanges.subscribe((value: any) => {
      console.log(value)
      // const val = { ...value };
      // if (val.jobStationing) {
      //   this.job.refSetup.type = val.jobStationing;
      //   delete val.jobStationing;
      // }
      // delete val.fileCSV;
      // this.job = { ...this.job, ...val };
    });

    this.addPostForm.valueChanges
    // .pipe(
    //   tap(v => console.log(v)),
    //   distinctUntilChanged((prev: any, curr: any) => {
    //     return prev.type === curr.type && prev.jobStationing === curr.jobStationing;
    //   })
    // )
    .subscribe((value: any) => {
      console.log(value)
      // if (this.csvFile) {
      //  // this.validateAndUploadCsv(value);
      // }
    });

    const jobStationing = this.addPostForm.get('jobStationing');
    const type = this.addPostForm.get('jobType');

    type.valueChanges.subscribe((value: EnumJobType) => {
      if (EnumJobType[value] === EnumJobType.OTHER) {
        jobStationing.patchValue(EnumJobStationingType.AUTO);
        jobStationing.disable();
      } else{
        jobStationing.enable();
      }
    });

  }

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
                  <FieldControl name="jobStationing"  meta={{ label: "Job Stationing", list: EnumJobStationingType}} render={RadioInput}/>


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

