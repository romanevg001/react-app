import React, {Component, Fragment} from 'react';
import {Formik} from 'formik';
import * as yup from 'yup';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { PostPageComponentModel, PostPageComponentState } from './post-page-component.model';
import { postsQuery } from '../MainPage/state/main.query';
import { postsStore } from '../MainPage/state/main.store';
import { PostModel } from '../../models/posts.model';
import {mainService} from '../MainPage/main.service';
import styles from './PostPage.module.scss';


export default class PostPage extends Component<PostPageComponentModel> {
  state: PostPageComponentState = {
    post: new PostModel(),
    isEdit: false
  }
  
  schema = yup.object().shape({
    title: yup.string().required(),
    body: yup.string().required()
  });

  componentDidMount() {
    const postId = this.props!.match!.params.id;
    if(postId) {
      postsStore.setActive(postId);
    }
    this.setState({post: postsQuery.getActive()})
  }

  setEditability(): void {
    this.setState({isEdit: !this.state.isEdit})
  }

  handleSubmit (event: any):void {
    const post = new PostModel({...this.state.post, ...event});
    
    mainService.updatePost(post).subscribe(_ =>  this.setState({post}));
    this.setEditability();
  };

  render() {
    return (

        <div className={styles.postPage}>
          {
            (this.state.isEdit) ? (
              <Formik
                  validationSchema={this.schema}
                  onSubmit={this.handleSubmit.bind(this)}
                  initialValues={{
                    title: this.state.post.title,
                    body: this.state.post.body,
                  
                  }}
                >
                  {({
                    handleSubmit,
                    handleChange,
                    handleBlur,
                    values,
                    touched,
                    isValid,
                    errors,
                  }) => (
                      <Form noValidate onSubmit={handleSubmit}>
                        <Form.Group controlId="postedit.title">
                          <Form.Label>Post title</Form.Label>
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
                        <Button variant="primary" type="submit" className="mr-3">Save</Button>
                        <Button variant="secondary" type="button" onClick={this.setEditability.bind(this)}>Cancel</Button>
                      </Form>
                  )}
              </Formik>
            ) : (
              <Fragment>
                <Button variant="outline-danger" size="sm" className="float-right" onClick={this.setEditability.bind(this)}>Edit</Button>
                <h2>{this.state.post.title}</h2>
                <p>{this.state.post.body}</p>
              </Fragment>
            )
          }
          
          
        </div>

    );
  }
}
