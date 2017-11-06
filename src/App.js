import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import * as Table from 'reactabular-table';
import * as edit from 'react-edit';
import { connect } from 'react-redux';
import actions from './actions';


const Hello =(props)=>(<div>
hello, {props.myName} 
<Table.Provider
  className="pure-table pure-table-striped"
  columns={props.columns}
>
  <Table.Header />

  <Table.Body rows={props.rows} rowKey="id" />
</Table.Provider>
{props.showForm
          ? (<form>
        Name : <input
              type="text"
          name="name"
          value={props.name}
          onChange={props.handleName}
        /><br/>
       Dad : <input
              type="text"
         name="dad"
        value={props.dad}
        onChange={props.handleDadName}
       /><br/>
       Mom : <input
              type="text"
         name="mom"
         value={props.mom}
         onChange={props.handleMomName}
       /><br/>
            <button
              type="submit"
             onClick={props.submitData}
            >Submit</button>
          </form>) : ''}
</div>);

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      columns: this.getColumns(), // initial columns
      name: '',
      id: '',
      dad: '',
      mom: '',
      showForm:false
     // showForm: false,
    };

    this.handleName = this.handleName.bind(this);
    this.handleDadName = this.handleDadName.bind(this);
    this.handleMomName = this.handleMomName.bind(this);
    this.submitData = this.submitData.bind(this);
  }

  
  getColumns() {
    const editable = edit.edit({
      isEditing: ({ columnIndex, rowData }) => columnIndex === rowData.editing,
      onActivate: ({ columnIndex, rowData }) => {
        // this.props.editRow(columnIndex, rowData.id);

        this.setState({
          id: rowData.id,
          name: rowData.name,
          dad: rowData.dad,
          mom: rowData.mom,
          showForm: true,
        }, console.log(this.state));
        console.log('columnIndex on activate : ', columnIndex);
        console.log('rowData on activate : ', rowData);
      },
      onValue: ({ value, rowData, property }) => {
        this.props.confirmEdit(property, value, rowData.id);
        console.log('property :', property);
        console.log('value : ', value);
      }
    });
    const columns = [
      {
        property: 'name',
        header: {
          label: 'Name'
        },
        cell: {
          transforms: [editable(edit.input())],
        }
      },
      {
        property: 'dad',
        header: {
          label: 'Dad'
        },
        cell: {
          transforms: [editable(edit.input())],
        }
      },
      {
        property: 'mom',
        header: {
          label: 'Mom'
        },
        cell: {
          transforms: [editable(edit.input())],
        }
      }
    ];

    return columns;
  }

  handleName(e) {
    console.log(e.target.value);
    this.setState({
      name: e.target.value,
    });
  }

  handleDadName(e) {
    console.log(e.target.value);
    this.setState({
      dad: e.target.value,
    });
  }

  handleMomName(e) {
    this.setState({
      mom: e.target.value,
    });
  }

  submitData(e) {
    e.preventDefault();
    this.setState({
      showForm: false,
    });
    this.props.editFunc(this.state.id, this.state.name, this.state.dad, this.state.mom, this.props.rows);
  }

  render(){
    const nameF='Faraz';
    const { rows } = this.props;
    
    /*
    const rows = [
      {
        id: 100,
        name: 'Adam',
        dad: 'John',
        mom:'Trisha'
        
      },
      {
        id: 101,
        name: 'Brian',
        dad: 'George',
        mom:'Benny'
        
      },
    ];
    */
    return(   <div className="App">
    
   
      <Hello  
      myName={nameF}
      columns={this.state.columns}
      rows={rows} 
      name={this.state.name}
      mom={this.state.mom}
      dad={this.state.dad}
      showForm={this.state.showForm}
      handleName={this.handleName}
      handleDadName={this.handleDadName}
      handleMomName={this.handleMomName}
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
  editFunc: (id, name, address, abbrev, rows) => dispatch(actions.editRow(id, name, address, abbrev, rows)),
  confirmEdit: (property, value, id) => dispatch({
    type: 'CONFIRM_EDIT',
    row: { property, value, id },
  }),
});

const AppConnect = connect(mapStateToProps, mapDispatchToProps
)(App);

export default AppConnect;
