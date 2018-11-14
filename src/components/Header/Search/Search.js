import React, { Component } from 'react';

import './Search.css';

import SearchIcon from 'react-icons/lib/md/search';

//////////////////////////////////////////////////////// THIS COMPONENT IS BEING RENDERED IN THE *HEADER* COMPONENT

export default class Search extends Component {

  constructor() {
    super()
    this.state = {
      value: ""
    }
  }

  handleChange = (value) => {
    this.setState({
      value: value
    })
  }

  filter = () => {
    this.props.filterPostFn(encodeURI(this.state.value));
    this.setState({
      value: ""
    })
  }
  

  render() {
  
    return (
      <section className="Search__parent">

        <div className="Search__content">
          <input placeholder="Search Your Feed" onChange={ (e) => this.handleChange(e.target.value) } value={ this.state.value }/>

          <SearchIcon onClick={ () => this.filter() } id="Search__icon" />
        </div>
        
      </section>
    )
  }
}