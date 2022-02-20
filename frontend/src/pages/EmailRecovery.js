import React from "react";

function EmailRecovery() {

  return (
    <div className="EmailRecoveryOption">
      <h3> Password Recovery</h3>
      <p>Enter the email address associated with this account and we will send you a recovery
        link to reset your password
      </p>
    <div className="addCommentContainer">
          <input 
            type="text"
            placeholder="Enter Your Email Here..."
            autoComplete="off"
          />
          <button style={{height: "54px"}} >Submit Email</button>
        </div>
        </div>
   
  );
}

export default EmailRecovery;