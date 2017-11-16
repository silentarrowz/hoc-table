import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import * as Table from 'reactabular-table';
import * as edit from 'react-edit';
import { connect } from 'react-redux';
import actions from './actions';
import Hello from './Hello';

const Form = (props) =>{
  const propState = props.state;
  return (  <form>
 { props.columns.map((item,idx)=>(
   <div key={idx} >
  {item.property}   <input 
      type='text'
      name={item.property}
      value={propState[item.property]}
      onChange={props.handleAllChange}
       /><br/>
       </div>
  ))}
  <button
              type="submit"
             onClick={props.submitData}
            >Submit</button>
  </form>)
};

export default Form;