import React , { Component } from 'react' ;

import CheckBoxes from './CheckBox';
import SideBarTable from './sideBarTable';

class SideBar extends Component
{
  onCheckEvent = (table) => this.props.onChecked(table);
  
  render( )
  {
    //console.log('sidebar props' , this.props);
    return (
         <div>
          <CheckBoxes onCheckEvent={this.onCheckEvent} {...this.props} />
          <SideBarTable  {...this.props} />
         </div>
    )
  }
}

export default SideBar;
