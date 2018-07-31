import React from 'react';
import {Table} from 'reactstrap';

const styles = {
Table : {
       backgroundColor:"beige",
       padding:"20px",
       marginTop:"10px",
       fontFamily: 'Roboto',
     }
}

const sideBarTable = props => {
  if(props.tableItem.length === 0)
  {
    return (
      <div> </div>
    )
  }

  return (
    <Table style={styles.Table}>
      <thead>
               <tr>
                 <th>Table Type </th>
                 <th>Count</th>
               </tr>
       </thead>
       <tbody>
      {props.tableItem.map((value,key) => {
         return( <tr key={`Table-${key}`}>
             <td> {value.tabletype} </td>
             <th scope="row"> {value.tablecount} </th>
          </tr>
        )
      })}
       </tbody>
    </Table>
  )
}

export default sideBarTable ;
