export default {
    state: {
        searchValue: ""
    },
    // Set search value
    setSearchValue(value) {
        this.state.searchValue = value
    },
    // Get search value
    getSearchValue() {
        return this.state.searchValue
    }
}