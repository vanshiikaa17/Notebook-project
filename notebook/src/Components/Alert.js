import React from 'react'

export const Alert = (props) => {
  return (
     <div style={{height:"3rem"}}>
    {props.alert && <div className={`alert alert-${props.alert.type} alert-dismissible fade show`} role="alert">
      <strong>{props.alert.msg}</strong>  
    
    </div>}
    </div>
  )
}
