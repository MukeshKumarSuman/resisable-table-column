import React, {useEffect, useState, useRef} from 'react'
import $ from 'jquery';
import Table from './component/Table/Table'
import data from './data/data-provider';
import './sass/App.scss';

const App = () => {
  const [tableData, setTableData] = useState({columns: [], data: []});
  useEffect( () => {
      setTimeout( () => {
          setTableData( state => {
              return data;
          });
      });
  }, []);
  const h1Ref = useRef(null);
  useEffect( () => {
    const $drageDiv = $(h1Ref.current);
    $drageDiv.draggable();
  }, []);

  return (
      <div className="app">
          <h1 className="draggable" ref={h1Ref}>Table</h1>
          <Table {...tableData}/>
      </div>
  )
}

export default App

