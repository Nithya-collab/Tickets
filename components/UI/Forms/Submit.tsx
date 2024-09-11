import { ButtonHTMLAttributes } from 'react';

interface SubmitProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode
}
 
const Submit: React.FC<SubmitProps> = ({children, ...buttonAttrs}) => {
    // const [disabled, setDisabled] = useState(false);
    return ( 
        <button type="submit" {...buttonAttrs}>{children}</button>
     );
}
 
export default Submit;