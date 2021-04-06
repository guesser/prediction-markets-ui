const Filters = ({ filters, handler, currentFilters }) => {

  // handlers
  const handleClick = (filter) => {
    handler(filter)
  }

  const filterClass = (filter, index) => {
    return `${!currentFilters.includes(filter) || 'text-primary'} py-2 px-3 border-depth-2 hover:bg-depth-2 ${index ? 'border-l' : ''}`
  }

  // renders
  const renderFilters = () => {
    return filters.map((filter, index) => <div key={filter} className={filterClass(filter, index)} onClick={(e) => handleClick(filter)}>{filter}</div>)
  }
  return (
    <div className="flex justify-center cursor-pointer bg-depth-1 rounded overflow-hidden">
      { renderFilters() }
    </div>
  )
}

export default Filters