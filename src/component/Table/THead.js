import React from 'react'
import '../../sass/Table/THead.scss';

const THead = (props) => {
    const ths = props.columns.map( (col, index) => <th key={index} className="truncated">{col.title}</th>);
    return (
        <thead>
            <tr>{ths}</tr>
        </thead>
    )
}

export default THead
