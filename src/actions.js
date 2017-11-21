import uuid from 'uuid';




  export function AddRowData(identifier){
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
    
    return (dispatch) => {
      dispatch(addRows(newTableData,identifier));
    }
    
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



