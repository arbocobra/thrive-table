import { useState, useEffect, useRef } from 'react';
import InfiniteScroll from "react-infinite-scroll-component";
import { fetchDataRange } from '../../data-functions';

const TableBody = ({ columns, toggleLoading }) => {
   const [rowData, setRowData] = useState([]);

   const firstRender = useRef(true)

   const fetchForScroll = async (page) => {
      fetchDataRange(page)
         .then(result => {
            setRowData((prev) => [...prev, ...result])
            if (firstRender.current) setTotalDisplay(1000)
         })
   }

   // Fetch data then apply DSR calculation to data before setRowData() - using cleanup to prevent multiple loads
   useEffect(() => {
      (async () => {
         if (firstRender.current) fetchForScroll(0)
      })()
      return () => firstRender.current = false;
   }, []);

   const handleLoadMore = () => {
      setDisplayPage(prev => {
         const nextPage = prev + 1
         fetchForScroll(nextPage)
         return nextPage
      })
   }

   if (data) {
      return (
         <tbody>
            <InfiniteScroll dataLength={data.length} next={handleLoadMore} hasMore={1000 > data.length}
            loader={<p>Loading...</p>} endMessage={<p>No more data to load.</p>} >
            {data.map((row, i) => {
               // if (i >= startRange && i < endRange) {
               //    return (
               //       <tr key={`row-${i}`}>
               //          {columns.map(({ accessor }) => {
               //             let val = row[accessor] ? row[accessor] : '-';
               //             if (row[accessor] == 0) val = 0;
               //             if (accessor == 'FullName') {
               //                return <td key={`${accessor}-${i}`}>{`${row['FirstName']} ${row['LastName']}`}</td>;
               //             } else {
               //                return <td key={`${accessor}-${i}`}>{val}</td>;
               //             }
               //          })}
               //       </tr>
               //    );
               // }
            })}
            </InfiniteScroll>
         </tbody>
      );
   } else {
      return null;
   }
};
export default TableBody;
