import { ComponentProps, Context, createContext, useState } from "react";
import FormItem from "./form-item";

interface FormProps extends ComponentProps<'form'>{
  context?: string,
}

function Form({ children, ...props }: FormProps){
  return (
    <form {...props}>
      {children}
    </form>
  )
}

Form.Item = FormItem

export default Form