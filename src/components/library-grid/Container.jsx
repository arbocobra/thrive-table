import Header from '../Header';
import InfiniteTable from './InfiniteTable';
import PaginationTable from './PaginationTable';
import { useState } from 'react';

const Container = ({ updateSelectView }) => {
   const [rowType, setRowType] = useState('infinite')
   const title = 'Table 1 - Built With AG Grid library';
   const caption = 'Table includes drag and drop columns and toggle for infinite scrolling or pagination with sortable columns';

   const toggleRowType = (e) => {
      e.preventDefault()
      if (rowType == 'infinite') setRowType('pagination')
      else if (rowType == 'pagination') setRowType('infinite') 
   }

   const check = rowType == 'pagination' ? '\u2713' : '';

   return (
      <div className='table-container'>
         <div className='checkbox-container'>
            <div onClick={toggleRowType} className='checkbox'>{check}</div>
            <span>Toggle Row Style</span>
         </div>
         <Header title={title} caption={caption} updateSelectView={updateSelectView} />

         { rowType == 'infinite' && <InfiniteTable /> }
         { rowType == 'pagination' && <PaginationTable /> }
      </div>
   );
};
export default Container;