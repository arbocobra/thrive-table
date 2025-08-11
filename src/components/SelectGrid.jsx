const SelectGrid = ({updateSelectView}) => {
  return (
    <div className='selection'>
      <div className='select-box' onClick={() => updateSelectView(-1)}>
        <h3>View Manual Grid</h3>
        <div>Includes row sorting and pagination.</div>
        <div>All components and functions coded from scratch.</div>
      </div>
      <div className='select-box' onClick={() => updateSelectView(1)}>
        <h3>View Grid Built Using Framework</h3>
        <div>Includes drag and drop columns, row sorting and pagination.</div>
        <div>Built with <a href='AG Grid' target='_blank'>AG Grid</a></div>
      </div>
    </div>
  )
}

export default SelectGrid;