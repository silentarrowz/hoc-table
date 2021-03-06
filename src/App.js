import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import * as Table from 'reactabular-table';
import * as edit from 'react-edit';
import { connect } from 'react-redux';
//import actions from './actions';
import {editRow,addRows} from './actions';
import Hello from './Hello';
import {AddRowData} from './actions';
import { bindActionCreators } from 'redux';



class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      columns: this.getColumns(this.props.columns), // initial columns
      //whichTable:'friends',              //this.getTableKey(this.props.rows),
      showForm:false
      
    };

  
    this.submitData = this.submitData.bind(this);
    this.handleAllChange = this.handleAllChange.bind(this);
  }

  componentWillMount(){
    console.log('component about to mount');
    this.props.addRowsFunc(this.props.id);
    this.setState({
      rowdata:this.props.rows,
      whichTable:this.props.id
    });
  }


  getTableKey(rowdata){
   const tableKey= (Object.keys(rowdata))[0];
   //const tableName = this.props.rowdata[tableKey];
   
     return tableKey
   
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
    this.props.editFunc(stateItems, this.props.id);
  }

  render(){
   let rowz='';
   let whichTable = this.props.id;
   if(this.props.rows){
    rowz = this.props.rows;
    
   }
  /*  if(this.props.rows && this.props.rows[whichTable]){
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
      
    } */
    return(   <div className="App">
    {
      rowz? <Hello  
      handleMyOwnChange ={this.props.handleMyOwnChange}
      externalForm = {this.props.externalForm}
      columns={this.state.columns}
      rows={rowz} 
      state={this.state}
      handleAllChange={this.handleAllChange}
      submitData={this.submitData}
       /> : 'no data in rows'
    }
   
     
    
  </div>);
  }
 };
  
 

 const mapStateToProps = (state,whichTable) => ({
  rows: state[whichTable.id]
});

const mapDispatchToProps = (dispatch) => ({

  /*
  createRow:dispatch({
    type: 'CREATE_ROW',
    row: { name: 'John Doe', id: uuid.v4() }
  }),
  */
  addRowsFunc:bindActionCreators(AddRowData,dispatch),
  
  editFunc: (stateItems, rows) => dispatch(editRow(stateItems, rows)),
  confirmEdit: (property, value, id) => dispatch({
    type: 'CONFIRM_EDIT',
    row: { property, value, id },
  }),
});

const AppConnect = connect(mapStateToProps, mapDispatchToProps
)(App);

export default AppConnect;
