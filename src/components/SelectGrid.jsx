const SelectGrid = ({updateSelectView}) => {
  return (
    <div className='selection'>
      <div className='select-box' onClick={() => updateSelectView(1)}>
        <h3>View Table Built Using Library</h3>
        <div>Includes drag and drop columns, row sorting and infinite scroll.</div>
        <div>Built with <a href='https://www.ag-grid.com/' target='_blank'>AG Grid</a></div>
      </div>
      <div className='select-box' onClick={() => updateSelectView(-1)}>
        <h3>View Custom Table</h3>
        <div>Includes row sorting and pagination.</div>
        <div>All components and functionality written from scratch.</div>
      </div>
    </div>
  )
}

export default SelectGrid;