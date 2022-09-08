import React from 'react';
import style from './button.module.scss'

interface ButtonProps {
    classes? : string
    text: string
    color?: string
    round?: boolean
    fullWidth?: boolean
    disabled? : boolean
    children?: JSX.Element[] | JSX.Element
}

const Button = ({classes,color,disabled,text,children}:ButtonProps) => {
    const classname=({clas,styles}: { clas: string ,styles:string })=> {
       let className :string[] = [styles];
        className.push(clas)
        return className.join('');
    }

    return (
        <button type='submit' className={classname({clas: classes, styles: style.btn_reset})} disabled={disabled}>
           <span>{children}</span>
            {text}
        </button>
    );
};

export default Button;
