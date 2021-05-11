import React from "react";
import { Button, DialogActions } from "@material-ui/core";


export default function CustomDialogActions({onCancel, onSubmit, disabled, useFormSubmitEvent}) {
  const submitButtonProps = {};
  if(!useFormSubmitEvent){
    submitButtonProps.onClick = function (e) {
      e.preventDefault();
      onSubmit && onSubmit();
    }
  }
  return (
    <DialogActions>
      <Button onClick={_ => onCancel()} color="secondary">
        Hủy
      </Button>
      <Button {...submitButtonProps} color="primary" type="submit" disabled={disabled}>
        OK
      </Button>
    </DialogActions>
  )
}
