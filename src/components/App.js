import React, { Component } from 'react';

import './App.css';

import Header from './Header/Header';
import Compose from './Compose/Compose';
import axios from 'axios';
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
      console.log("Running");
      this.setState({
        posts: res.data
      })
    })
  }

  updatePost(id, text) {
    axios.put(`${this.state.baseUrl}/posts?id=${id}`, { text } )
    .then(res => {
      this.setState({
        posts: res.data
      })
    })
  }

  deletePost(id) {
    axios.delete(`${this.state.baseUrl}/posts?id=${id}`)
    .then(res => {
      this.setState({
        posts: res.data
      })
    })
  }

  createPost(text) {
    axios.post(`${this.state.baseUrl}/posts`, { text: text } )
    .then(res => {
      this.setState({posts: res.data
      })
    })
  }

  filterPost = (text) => {
    axios.get(`${this.state.baseUrl}/posts/filter?text=${text}`)
    .then(res => {
      this.setState({
        posts: res.data
      })
    })
  }

  render() {
    const { posts } = this.state;

    return (
      <div className="App__parent">
        <Header filterPostFn={ this.filterPost } />

        <section className="App__content">

          <Compose createPostFn={ this.createPost }/>
          {posts.map(post => {
            return <Post 
              key={post.id}
              id={post.id}
              text={post.text}
              date={post.date}
              updatePostFn={ this.updatePost }
              deletePostFn={ this.deletePost }
              />
          })}
        </section>
      </div>
    );
  }
}

export default App;
