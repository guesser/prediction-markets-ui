const _getRGBColor = color => `rgb(${color})`
export const theme = {
  colors: {
    primary: _getRGBColor('var(--color-primary)'),
    primary25: _getRGBColor('var(--color-primary-depth-1)'),
  }
}

export const customStyle = {
  control: (provided, state) => ({borderRadius: 15, cursor: 'pointer', display: 'flex', '&:hover': {
    backgroundColor: _getRGBColor('var(--color-bg-depth-2)')
  }}),
  menu: provided => ({...provided, backgroundColor: _getRGBColor('var(--color-bg-depth-1)'), borderRadius: 15, overflow: 'hidden', padding: 0}),
  option: (provided, state) => ({
    ...provided,
    color: state.isSelected || state.isFocused ? 'black' : _getRGBColor('var(--color-text-default)'),
    cursor: 'pointer'
    })
}