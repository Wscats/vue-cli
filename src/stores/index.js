export default {
    state: {
        searchValue: ""
    },
    // 设置搜索框的值
    setSearchValue(value) {
        this.state.searchValue = value
    },
    // 获取搜索框的值
    getSearchValue() {
        return this.state.searchValue
    }
}