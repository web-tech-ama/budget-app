import React from 'react';

import styles from "@/components/ui/operation/operation.module.scss"
import {useStore} from "@/context/StroeContext";
interface OperationProps {
    children: JSX.Element[] | JSX.Element

}
const OperationTable = ({children}:OperationProps) => {
    const {langJson}:{langJson: any} = useStore()
    return (
        <>

            <table className={styles.operation_table}>
                <thead>
                    <tr>
                        <th>{langJson.dashboardLabel.operation.account}</th>
                        <th>{langJson.dashboardLabel.operation.amount}</th>
                        <th>{langJson.dashboardLabel.operation.paymentMethod}</th>
                        <th>{langJson.dashboardLabel.operation.category}</th>
                        <th>{langJson.dashboardLabel.operation.type}</th>
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
