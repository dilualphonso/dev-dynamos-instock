import  './SearchMessege.scss'

function SearchMessage({setNoResultMessege, noResultMessage}){
    return(
        <div className="search">
<p className="search__message">{noResultMessage}</p>
        </div>
    )
}
export default  SearchMessage;