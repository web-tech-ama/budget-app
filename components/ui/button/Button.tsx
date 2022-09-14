import React from 'react';
import style from './button.module.scss'

interface ButtonProps extends React.InputHTMLAttributes<HTMLButtonElement>{
    classes? : string 
    text: string
    color?: string 
    round?: boolean 
    fullWidth?: boolean 
    disabled? : boolean 
    children?: JSX.Element[] | JSX.Element
    rest?: any 
}

const Button = ({classes,color,disabled,text,children,...rest}:ButtonProps) => {
    const classname=({clas,styles}: { clas: string | undefined ,styles:string })=> {
       let className :string[] = [styles];
        if (clas != null) {
            className.push(clas)
        }
        return className.join('');
    }
    const backgroundColor = {
        backgroundColor : color
    }
    return (
        <button style={backgroundColor} {...rest} type='submit' className={classname({clas: classes, styles: style.btn_reset})} disabled={disabled}>
           <span>{children}</span>
            {text}
        </button>
    );
};

export default Button;
