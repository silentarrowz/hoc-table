import uuid from 'uuid';
import $ from 'jquery';



  export const AddRowData = (identifier)  =>(dispatch) => {

    /*
    const newTableData = {'friends':[{
      id: 100,
      location: 'Goa',
      hobby: 'music',
      friend:'Jack',
      sport:'tennis',
      country:'india'
      
    },
    {
      id: 101,
      location: 'delhi',
      hobby: 'reading books',
      friend:'Ben',
      sport:'badminton',
      country:'london'
      
    }
    
      ]};

      const theRows = {'dad':[{
        id: 100,
        name: 'Adam',
        dad: 'John',
        mom:'Trisha',
        gender:'Male',
        color:'Red'
        },
      {
        id: 101,
        name: 'Betty',
        dad: 'George',
        mom:'Benny',
        gender:'Male',
        color:'Blue'
        }]};
        */

         function dataFromAjax (dispatch){
          var root = 'http://localhost:8080/';
          $.ajax({
            url: root + identifier,
            method: 'GET',
            success:function(data) {
              console.log('data from server : ',data);
              
                dispatch(addRows(data,identifier));
              
            }
          })
          /*
          .then(function(data) {
            console.log('data from server : ',data);
            return (dispatch) => {
              dispatch(addRows(data,identifier));
            }
          }); 
          */
        }

        dataFromAjax(dispatch);
        /*
        return (dispatch) => {
      dispatch(addRows(dataFromServer,identifier));
    }
    */
    
  }


 export function addRows(rows,identifier){
  return {
    type:'ADD_ROWS_DATA',
    row:{rows,identifier}
  }  
    //identifier tells which table to add data to
  };

  export function editRow(stateItems, id){
   return {
    type: 'EDIT_ROW',
    row: { stateItems, id }
   } 
  };

  export const confirmEdit = (property, value, id) => ({
    type: 'CONFIRM_EDIT',
    row: { property, value, id },
  });



