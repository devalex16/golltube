import StyledSearch from './StyleSearch.tsx';

type SearchProps = {
  valueFilter: string;
  setValueFilter: string;
}

function Search({valueFilter, setValueFilter}: SearchProps) {

  const valueSearch = valueFilter
  const setValueSearch = setValueFilter
  
  return (
    <StyledSearch>
      <input type="text" onChange={(e) => setValueSearch(e.target.value)} value={valueSearch} />
    </StyledSearch>
  )
}

export default Search;