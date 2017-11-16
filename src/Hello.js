import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import * as Table from 'reactabular-table';
import * as edit from 'react-edit';
import { connect } from 'react-redux';
import actions from './actions';
import Form from './Form';

export default class Hello extends React.Component{
    
    render(){
      const {columns,rows,state} =this.props;
      const BodyWrapper = props => <tbody {...props} />;
      BodyWrapper.shouldComponentUpdate = true;
      const RowWrapper = props => <tr {...props} />;
      RowWrapper.shouldComponentUpdate = true;
      let whichForm = (<Form columns={columns} rows={rows} state={state} 
        submitData={this.props.submitData}
        handleAllChange={this.props.handleAllChange}
         />);
      if(this.props.externalForm){
       const formprops = {columns:columns,
            rows:rows,
            state:state,
            submitData:this.props.submitData,
            handleAllChange:this.props.handleAllChange
        };
        whichForm = this.props.externalForm(formprops);
      }
      return(
        <div>
        <Table.Provider
          className="pure-table pure-table-striped"
          columns={columns}
          components={{
      body: {
        wrapper: BodyWrapper,
        row: RowWrapper
      }
    }}
  
        >
          <Table.Header />
        
          <Table.Body rows={rows} rowKey="id"/>
        </Table.Provider >
        {this.props.state.showForm
                  ? whichForm :'' }
        </div>
      );
    }
  }