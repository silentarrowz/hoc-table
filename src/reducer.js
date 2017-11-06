import { cloneDeep, findIndex } from 'lodash';


const reducer = (state, action) => {
  const row = action.row;
  const index = row && findIndex(state, { id: row.id });

  switch (action.type) {
    /*
    case 'CREATE_ROW':
    	console.log([row].concat(state));

      return [row].concat(state);

    case 'DELETE_ROW': {
      if (index >= 0) {
        return state.slice(0, index).concat(state.slice(index + 1));
      }

      return state;
    }
    */
    case 'EDIT_ROW': {
      const newRows = cloneDeep(action.row.rows);

      console.log('newRows.length : ', newRows.length);
      const newName = action.row.name;
      const newDad = action.row.dad;
      const newMom = action.row.mom;

      for (let i = 0; i < newRows.length; i++) {
        if (newRows[i].id === action.row.id) {
          newRows[i].name = newName;
          newRows[i].dad = newDad;
          newRows[i].mom = newMom;
          console.log('newRows : ', newRows);

          return newRows;
        }
      }
    }


    case 'CONFIRM_EDIT': {
      if (index >= 0) {
        return editProperty(state, index, {
          [row.property]: row.value,
          // editing: false
        });
      }
    }
    default:
      return state;
  }
};


function editProperty(rows, index, values) {
  // Skip mutation, there's likely a neater way to achieve this
  const ret = cloneDeep(rows);

  console.log('ret before loop : ', ret);
  Object.keys(values).forEach((v) => {
    ret[index][v] = values[v];
  });
  console.log('ret after loop : ', ret);

  return ret;
}

export default reducer;
