import React from 'react'
import '../../sass/Table/TBody.scss';
const TBody = (props) => {
    const tbody = props.data.length > 0 ? props.data.map( tr => <tr>{tr.map( td => <td className="truncated">{td}</td>)}</tr>) : null;
    return (
        <tbody>
            {tbody}
        </tbody>
    )
}

export default TBody
