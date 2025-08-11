import { useState } from 'react';

const TableHead = ({columns, handleSort}) => {
   const [sortField, setSortField] = useState('Id')
   const [sortOrder, setSortOrder] = useState('asc')

   const handleSortClick = (acc) => {
      if (acc == sortField) {
         let order = sortOrder == 'asc' ? 'desc' : 'asc'
         handleSort(sortField,order)
         setSortOrder(order)
      } else {
         handleSort(acc,'asc')
         setSortField(acc)
         if (sortOrder == 'desc') setSortOrder('asc')
      }
   }

   return (
      <thead>
         <tr>
            {columns.map(({accessor, label}, i) => {
               let content = (<><div>{label}</div><div className='arrow-space'></div></>)
               let isSelected = accessor == sortField
               if (isSelected && sortOrder == 'asc') content = (<><div>{label}</div><div className='arrow-space'>{`\u23F6`}</div></>)
               if (isSelected && sortOrder == 'desc') content = (<><div>{label}</div><div className='arrow-space'>{`\u23F7`}</div></>)
               return (
                  <th key={`col-${i}`} className={isSelected ? 'select' : 'no-select'} onClick={() => handleSortClick(accessor)}>
                     { content }
                  </th>
               )
            })}
         </tr>
      </thead>
   )
}
export default TableHead;