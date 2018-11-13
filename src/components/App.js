import React, { Component } from 'react';
import axios from 'axios';

import './App.css';

import Header from './Header/Header';
import Compose from './Compose/Compose';
import Post from './Post/Post';

class App extends Component {
  constructor() {
    super();

    this.state = {
      posts: [],
      baseUrl: 'https://practiceapi.devmountain.com/api'
    };

    this.updatePost = this.updatePost.bind( this );
    this.deletePost = this.deletePost.bind( this );
    this.createPost = this.createPost.bind( this );
  }
  
  componentDidMount() {
    let promise = axios.get(`${this.state.baseUrl}/posts`)
    promise.then(res => {
      // console.log(res.data)
      this.setState({
        posts: res.data
      })
    })
  }

  updatePost(postId, text) {
    let promise = axios.put(`${this.state.baseUrl}/posts?id=${postId}`, {text})
    promise.then(res => {
      console.log(res.data)
      this.setState({
        posts: res.data
      })
    })
  }

  deletePost(id) {
    let promise = axios.delete(`${this.state.baseUrl}/posts?id=${id}`)
    promise.then(res => {
      console.log("delete res", res);
      this.setState({
        posts: res.data
      })
    })
  }

  createPost(text) {
    //why does text need to be in curly braces??
    let promise = axios.post(`${this.state.baseUrl}/posts`, {text})
    promise.then(res => {
      console.log("createpost", res);
      this.setState({
        posts: res.data
      })
    })
  }

  render() {
    const { posts } = this.state;
    

    return (
      <div className="App__parent">
        <Header />

        <section className="App__content">

          <Compose createPostFn={ this.createPost }/>
          {posts.map((post, i) => <Post
            id={ post.id }
            text={ post.text }
            date={ post.date } 
            key={ i } 
            updatePostFn={ this.updatePost }
            deletePostFn={ this.deletePost }
            /> )}
            
        </section>
      </div>
    );
  }
}

export default App;
