import React  from 'react';
import Signin from './InputForm.js';

import './loginform.css';

const styles = {
   alignForm:{
    margin:"0px auto",
    paddingTop:"20vh",
  },
    headingBottomBorder:{
      padding:20,
      borderBottom:"solid 1px #DCDCDC"
    },
    formContainer:{
      padding:50,
      WebkitBoxShadow: "0px 1px 34px 5px rgba(0,0,0,1)",
      MozBoxShadow: "0px 1px 34px 5px rgba(0,0,0,1)",
      boxShadow: "0px 1px 34px 5px rgba(0,0,0,1)",
    }
}


const LoginPage = (props) => {
  //   console.log(props);
     return(
        <div className="container-fluid test">
        <div className="row">
          <div className="col-md-4 col-sm-6 col-xs-12"></div>
          <div className="col-sm-6 col-xs-12 col-md-4"  style={styles.alignForm} >
            <div  style={styles.formContainer} >
            <p className="block text-center h3" style={styles.headingBottomBorder}> Sign Up </p>
            <Signin />
            </div>
          </div>
          <div className="col-md-4 col-sm-4 col-xs-12">

          </div>
        </div>
        </div>
    )
}

export default LoginPage;
