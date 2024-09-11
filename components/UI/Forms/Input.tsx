import { HTMLInputTypeAttribute, InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    type: HTMLInputTypeAttribute;
    // type: ComponentProps<typeof Input>['type'];
}
 
const Input: React.FC<InputProps> = ({type, ...inputAttrs}) => {
    return ( 
        <input type={type} {...inputAttrs} />
     );
}
 
export default Input;