import AppConnect from './App.js';
import React, { Component } from 'react';
import ExternalForm from './ExternalForm';


export default class MainApp extends Component{
    
   render(){
        const columns = [
            {
              property: 'name',
              header: {
                label: 'Name'
              },
              cell: {
                transforms: '',
              }
            },
            {
              property: 'dad',
              header: {
                label: 'Dad'
              },
              cell: {
                transforms: '',
              }
            },
            {
              property: 'mom',
              header: {
                label: 'Mom'
              },
              cell: {
                transforms: '',
              }
            },
            {
              property: 'gender',
              header: {
                label: 'Gender'
              },
              cell: {
                transforms: '',
              }
            }
          ];

          const newTable = [
            {
              property: 'location',
              header: {
                label: 'Location'
              },
              cell: {
                transforms: '',
              }
            },
            {
              property: 'hobby',
              header: {
                label: 'Hobby'
              },
              cell: {
                transforms: '',
              }
            },
            {
              property: 'friend',
              header: {
                label: 'Friend'
              },
              cell: {
                transforms: '',
              }
            },
            {
              property: 'sport',
              header: {
                label: 'Sport'
              },
              cell: {
                transforms: '',
              }
            },
            {
              property: 'country',
              header: {
                label: 'Country'
              },
              cell: {
                transforms: '',
              }
            }
          ];

      const theRows = {'dad':[{
            id: 100,
            name: 'Adam',
            dad: 'John',
            mom:'Trisha',
            gender:'Male'
            },
          {
            id: 101,
            name: 'Betty',
            dad: 'George',
            mom:'Benny',
            gender:'Male'
            }]};

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

      return(
          <div>
             <AppConnect columns={columns} rowdata={theRows} externalForm={ExternalForm}/>
        <AppConnect columns={newTable} rowdata={newTableData} />
        
        </div>
      )  
    }
}

