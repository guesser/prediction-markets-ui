const Filters = ({ filters, handler, currentFilters } : { filters: string[], handler: Function, currentFilters: string[]}) => {

  // handlers
  const handleClick = (filter: string) => {
    handler(filter)
  }

  const filterClass = (filter: string, index: number) => {
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