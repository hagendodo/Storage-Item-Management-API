class PageService{
    getPageOffset(page){
        return (page>1) ? ((page-1)*20) : 0
    }
}

module.exports = PageService