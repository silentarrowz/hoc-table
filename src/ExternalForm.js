import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import * as Table from 'reactabular-table';
import * as edit from 'react-edit';
import { connect } from 'react-redux';
import actions from './actions';
import Hello from './Hello';

const ExternalForm = (props) =>{
  const propState = props.state;
  
  return (  <form>
      <h2>This is External Form</h2>
        {
             props.columns.map((item,idx)=>(
   <div key={idx} >
   {item.property}  {
           item.property === 'gender'?( <select name="gender" value={propState[item.property]} onChange={props.handleAllChange}>
            <option  value="Male">Male</option>
            <option value="Female">Female</option>
            </select>):  (  <input 
      type='text'
      name={item.property}
      value={propState[item.property]}
      onChange={props.handleAllChange}
       />) }
            <br/>
       </div>
  ))}
 
  <button
              type="submit"
             onClick={props.submitData}
            >Submit Karo</button>
  </form>)
};

export default ExternalForm;