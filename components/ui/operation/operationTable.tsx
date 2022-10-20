import React from 'react';

import styles from "@/components/ui/operation/operation.module.scss"
interface OperationProps {
    children: JSX.Element[] | JSX.Element

}
const OperationTable = ({children}:OperationProps) => {
    return (
        <>

            <table className={styles.operation_table}>
                <thead>
                    <tr>
                        <th>Comptes</th>
                        <th>Amount</th>
                        <th>mode de paiment</th>
                        <th>catégorie</th>
                        <th>type</th>
                    </tr>
                </thead>
                <tbody>
                {children}
                </tbody>
            </table>

        </>
    );
};

export default OperationTable
