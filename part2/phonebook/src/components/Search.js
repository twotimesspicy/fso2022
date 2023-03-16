const Search = ({searchField, handleSearchField}) => {
    return (
        <div>
            filter names with <input value={searchField} onChange={handleSearchField}/>
        </div>
    )
}

export default Search
