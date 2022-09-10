import React from 'react';
import style from './button.module.scss'

interface ButtonProps {
    classes? : string | undefined
    text: string
    color?: string | undefined
    round?: boolean | undefined
    fullWidth?: boolean | undefined
    disabled? : boolean | undefined
    children?: JSX.Element[] | JSX.Element | undefined
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
