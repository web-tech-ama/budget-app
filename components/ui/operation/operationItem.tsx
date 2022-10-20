import React, {memo} from 'react';
import {Operation} from "@/type/interface";
import {IcBaselineTrendingDown, MaterialSymbolsTrendingUp} from "@/components/ui/icons/icons";
import styles from "@/components/ui/operation/operation.module.scss"

const OperationItem = ({bank_account,amount,payment_mode,operation_type,category,increment_and_decrement}:Operation) => {

    return (
        <>
            <tr className={increment_and_decrement ? styles.operation_increment:styles.operation_decrement}>
                <td>{bank_account?.name}</td>
                <td >{increment_and_decrement ? (<span className={styles.increment_color}>+</span>):(<span className={styles.decrement_color}>-</span>)}{amount}</td>
                <td>{payment_mode}</td>

                <td>{category?.name}</td>
                <td> <div>
                    {operation_type } {increment_and_decrement?(<span className={styles.increment_color}><MaterialSymbolsTrendingUp/></span>):(<span className={styles.decrement_color}><IcBaselineTrendingDown/></span>)}
                </div>
                </td>
            </tr>

        </>

    );
};

export default memo(OperationItem)
