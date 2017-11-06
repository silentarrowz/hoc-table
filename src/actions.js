import uuid from 'uuid';

const actions = {
  
  editRow: (id, name, dad, mom, rows) => ({
    type: 'EDIT_ROW',
    row: { id, name, dad, mom, rows },
  }),
  confirmEdit: (property, value, id) => ({
    type: 'CONFIRM_EDIT',
    row: { property, value, id },
  }),
};


export default actions;
