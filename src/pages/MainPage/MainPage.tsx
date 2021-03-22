import React, {Component} from 'react';
import {mainService} from './main.service';
import { MainPageComponentModel, MainPageComponentState } from './main.model';
import { Link } from 'react-router-dom';
import  AddPostModal  from '../AddPostModal/AddPostModal';
import { Subject} from 'rxjs';
import Button from 'react-bootstrap/Button';



export default class MainPageComponent extends Component<MainPageComponentModel> {
  state: MainPageComponentState = {
    posts: []
  }
  addPostModalEmitter = new Subject<boolean>();

  componentDidMount() {
    this.loadList();
  }

  openAddPostModal() {
    this.addPostModalEmitter.next(true);
  }

  loadList() {
    mainService.getPosts().subscribe(val => {
      this.setState({posts: val})
    })
  }

  render() {
    return (

        <div className="main-page">
          {/* <SimpleForm></SimpleForm> */}
          <AddPostModal emitter={this.addPostModalEmitter} updateList={this.loadList.bind(this)}></AddPostModal>
          <h2>mainpage</h2>
          <Button onClick={this.openAddPostModal.bind(this)}>Add post</Button>
          <ul>
          {
            [...this.state.posts].map(item => (
              <li key={item.id} ><Link to={`/posts/${item.id}`}>{item.title}</Link></li>
            ))
          }
          </ul>
        </div>

    );
  }
}
