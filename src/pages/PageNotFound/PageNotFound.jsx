import "./PageNotFound.scss"
import urlNotFoundImage from "../../assets/images/404-image.webp"

function PageNotFound() {
  return (

  <section>
return (
        <section className="pageNotFound">
            <img className="pageNotFound__img" src={urlNotFoundImage} alt="404 Notfound" />
            <h1 className="pageNotFound__heading">The requested URL was not found on this server.</h1>
        </section>

    );
  </section>);
}
export default PageNotFound;
