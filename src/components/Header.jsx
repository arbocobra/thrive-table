const Header = ({title, caption, updateSelectView}) => {

  return (
    <div className='header'>
      <div className='title-row'>
         <h3>{title}</h3>
         <div onClick={() => updateSelectView(0)} className='return-button'>
            <span>&#129104; Back</span>
         </div>
      </div>
      <div className='caption'>{caption}</div>
    </div>
  )
}

export default Header;