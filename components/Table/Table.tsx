import { table } from "console";

interface TableProps {
    size?: number
    tableHead: React.ReactNode
    tableBody: React.ReactNode
    tableFoot: React.ReactNode
}
 
const Table: React.FC<TableProps> = ({ tableHead, tableBody, tableFoot}) => {
    return ( 
        <table>
            {tableHead}
            {tableBody}
            {tableFoot}
        </table>
     );
}
 
export default Table;