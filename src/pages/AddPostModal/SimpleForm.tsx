import React from "react";
import ReactDOM from 'react-dom';

import { FormGenerator } from "react-reactive-form";
import Values from "./Values";
import TextArea from "./components/TextArea";
import TextInput from "./components/TextInput";
// import Checkbox from "./components/Checkbox";
// import GenderRadio from "./components/GenderRadio";
// import SelectBox from "./components/SelectBox";

// Field config
const fieldConfig = {
  // Creates a FormGroup
  controls: {
    // Creates a control named first_name
    first_name: {
      render: TextInput,
      meta: {
        label: "First Name",
        placeholder: "Enter first name"
      }
    },
    // last_name: {
    //   render: TextInput,
    //   meta: {
    //     label: "Last Name",
    //     placeholder: "Enter last name"
    //   }
    // },
    // gender: {
    //   formState: "male",
    //   render: GenderRadio
    // },
    // nationality: {
    //   render: SelectBox
    // },
    notes: {
      render: TextArea
    },
    // terms: {
    //   formState: false,
    //   render: Checkbox
    // },
    // Inject a component
    $field_0: {
      // Set isStatic false to subscribe to the form ( state ) changes
      isStatic: false,
      render: ({ pristine, meta: { handleSubmit, handleReset } }: any) => (
        <div>
          <button
            disabled={pristine}
            onClick={handleSubmit}
          >
            Submit
          </button>
          <button type="button"  onClick={handleReset}>
            Reset
          </button>
        </div>
      )
    },
    $field_1: {
      isStatic: false,
      render: ({ value }: any) => <Values value={value} />
    }
  }
};

export default class SimpleForm extends React.Component {
  myForm:any;
  handleSubmit = (e: any) => {
    e.preventDefault();
    alert(`You submitted \n ${JSON.stringify(this.myForm.value, null, 2)}`);
  };
  handleReset = () => {
    this.myForm.reset();
  };
  setForm = (form: any) => {
    console.log(form)
    this.myForm = form;
    // Set the meta data
    this.myForm.meta = {
      handleSubmit: this.handleSubmit,
      handleReset: this.handleReset
    };
  };
  render() {
    return (
      <div>
        <h2>Simple Form</h2>
        <FormGenerator onMount={this.setForm} fieldConfig={fieldConfig} />
      </div>
    );
  }
}
