import React, {useEffect, useRef} from 'react'
import $ from 'jquery';
import THead from './THead';
import TBody from './TBody';
import TFoot from './TFoot';
import '../../sass/Table/Table.scss';
import ResizeColumns from '../../resizecolumns/resizecolumns';

const Table = ({columns, data}) => {
    const tableRef = useRef(null);
    useEffect( () => {
        setTimeout( () => {
          const resizeColumns = new ResizeColumns(tableRef);
          const $table = $(tableRef.current)
          $table.draggable();
          $table.resizable();
        }, 300);
      }, []);
    return (
        <table ref={tableRef}>
            <THead columns={columns}/>
            <TBody data={data}/>
            <TFoot columns={columns}/>
        </table>
    )
}

export default Table
