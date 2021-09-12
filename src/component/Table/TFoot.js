import React from 'react'
import '../../sass/Table/TFoot.scss';
const TFoot = (props) => {
    const ths = props.columns.map( (col, index) => (
            <th key={index}>
                <input type="text" placeholder={col.title}/>
            </th>
        ));
    return (
        <tfoot>
            <tr>{ths}</tr>
        </tfoot>
    )
}

export default TFoot
