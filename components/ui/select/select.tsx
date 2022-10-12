import React from 'react';
import styles from '@/components/ui/select/select.module.scss'
import {Classes} from "@/utils/classes";
import {BiChevronExpand} from "@/components/ui/icons/icons";
interface SelectProps{
    label:string
    handelSelect: React.MouseEventHandler<HTMLButtonElement>
    children: JSX.Element[] | JSX.Element
    inputValue:string
    isSelect:boolean
    customClass?:string




}
const Select = ({label,handelSelect,children,isSelect,inputValue,customClass}:SelectProps) => {

    const main_option:(string|null)[] =[ styles.main_option , isSelect? styles.main_option_open:styles.main_option_close]

    return (
        <section className={styles.select}>
            <h5 className={styles.label}>{label}</h5>
            <p>
                <button onClick={handelSelect} className={styles.input}>
                    <span>{inputValue}</span>

                    <span><BiChevronExpand/></span>
                </button>
            </p>
            <nav className={customClass}>
                <ul className={Classes(main_option)}>
                    {children}
                </ul>
            </nav>

        </section>
    );
};

export default Select;
