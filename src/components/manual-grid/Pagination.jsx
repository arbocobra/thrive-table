const Pagination = ({displayPage, count, setDisplayPage, rows, setRowCount}) => {

   const handlePageChange = (e) => {
      const val = parseInt(e.target.innerText)
      setDisplayPage(val - 1)
   }

   const handleRowChange = (e) => {
      let val = parseInt(e.target.value)
      // let options = e.target.children
      // let val
      // options.forEach(el => {
      //    if (el.selected) {
      //       val = parseInt(el.value)
      //    }
      // })
      setRowCount(val)
   }

   return (
      <div className='pagination-container'>
         <Rows handleRowChange={handleRowChange} rows={rows} />
         <Pages handlePageChange={handlePageChange} displayPage={displayPage} count={count} />
      </div>
   )
}
export default Pagination

const Rows = ({handleRowChange, rows}) => {

   return (
      <div className='rows'>
         <label htmlFor='rows'>Rows per page</label>
         <select onChange={handleRowChange} name='rows' id='rows' defaultValue={rows.toString()}>
            <option value={20}>20</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
         </select>
         <p></p>
      </div>
   )
}

const Pages = ({handlePageChange, displayPage, count}) => {

   let countArray, paginationDisplay;

   const countDisplay = (arr) => {
      return arr.map(el => {
         if (el == displayPage) return (<div key={`page-${el}`} className='page-number selected'>{el}</div>)
         else return (<div key={`page-${el}`} onClick={handlePageChange} className='page-number'>{el}</div>)
      })
   }

   if (count <= 7) {
      countArray = Array.from({ length: count }, (_, i) => i + 1);
      paginationDisplay = countDisplay(countArray)
   } else {
      if (displayPage < 3 || displayPage > (count - 3)) {
         countArray = [[1, 2, 3], [count - 2, count - 1, count]]
         paginationDisplay = (
            <>
               { countDisplay(countArray[0]) }
               <div className='page-number space'>&#8230;</div>
               { countDisplay(countArray[1]) }
            </>
         )
      } else {
         countArray = [displayPage - 1, displayPage, displayPage + 1]
         paginationDisplay = (
            <>
               <div onClick={handlePageChange} className='page-number'>1</div>
               <div className='page-number space'>&#8230;</div>
               { countDisplay(countArray) }
               <div className='page-number space'>&#8230;</div>
               <div onClick={handlePageChange} className='page-number'>{count}</div>
            </>
         )
      }
   }

   return (
      <div className='pagination'>
         { paginationDisplay }
      </div>
   )
}