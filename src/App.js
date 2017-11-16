import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import * as Table from 'reactabular-table';
import * as edit from 'react-edit';
import { connect } from 'react-redux';
import actions from './actions';
import Hello from './Hello';


class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      columns: this.getColumns(this.props.columns), // initial columns
      whichTable:this.getTableKey(this.props.rowdata),
      showForm:false
    };

  
    this.submitData = this.submitData.bind(this);
    this.handleAllChange = this.handleAllChange.bind(this);
  }

  getTableKey(rowdata){
   const tableKey= (Object.keys(rowdata))[0];
   //const tableName = this.props.rowdata[tableKey];
   return tableKey;
  }
  
  getColumns(columns) {
    const editable = edit.edit({
      isEditing: ({ columnIndex, rowData }) => columnIndex === rowData.editing,
      onActivate: ({ columnIndex, rowData }) => {
        // this.props.editRow(columnIndex, rowData.id);
        this.setState({ ...rowData, showForm:true}, console.log(this.state));
        console.log('columnIndex on activate : ', columnIndex);
        console.log('rowData on activate : ', rowData);
      },
      onValue: ({ value, rowData, property }) => {
        this.props.confirmEdit(property, value, rowData.id);
        console.log('property onValue:', property);
        console.log('value onValue : ', value);
      }
    });

    columns.map((item)=>{
      item.cell.transforms = [editable(edit.input())];
    });
    
    return columns;
    
  }


  handleAllChange(e){
    console.log('event : ',e.target.value);
    const itemChanged = e.target.name;
    const newState = {[itemChanged]:e.target.value} 
    // [itemChanged] in [] above so it's seen as a variable instead of a string.
    // hence the importance of using [] above
    console.log('newstate is : ',newState);
    this.setState(newState);
  }

  submitData(e) {
    e.preventDefault();
    this.setState({
      showForm: false,
    });
    const stateItems = this.state;
    this.props.editFunc(stateItems, this.props.rowdata);
  }

  render(){
   let rowz='';
   let whichTable = this.state.whichTable;
    if(this.props.rows && this.props.rows[whichTable]){
      let tableKeys = Object.keys(this.props.rows);
      if(tableKeys.indexOf(whichTable)!= -1){
        rowz = this.props.rows[whichTable];
      }else{
         rowz = this.props.rowdata[whichTable];
       }
    }else {
      const rowdataKey = (Object.keys(this.props.rowdata))[0];
      if(rowdataKey===this.state.whichTable){
        rowz=this.props.rowdata[rowdataKey];
      }
      
    }
    return(   <div className="App">
    
   
      <Hello  
      externalForm = {this.props.externalForm}
      columns={this.state.columns}
      rows={rowz} 
      state={this.state}
      handleAllChange={this.handleAllChange}
      submitData={this.submitData}
       />
    
  </div>);
  }
 };
  

 const mapStateToProps = (state) => ({
  rows: state,
});

const mapDispatchToProps = (dispatch) => ({

  /*
  createRow:dispatch({
    type: 'CREATE_ROW',
    row: { name: 'John Doe', id: uuid.v4() }
  }),
  */
  editFunc: (stateItems, rows) => dispatch(actions.editRow(stateItems, rows)),
  confirmEdit: (property, value, id) => dispatch({
    type: 'CONFIRM_EDIT',
    row: { property, value, id },
  }),
});

const AppConnect = connect(mapStateToProps, mapDispatchToProps
)(App);

export default AppConnect;
