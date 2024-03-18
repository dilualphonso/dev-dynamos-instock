import "./PageNotFound.scss"
import urlNotFoundImage from "../../assets/images/404-image.jpg"

function PageNotFound() {
  return (
    <section className="pageNotFound">
      <div className="pageNotFound__text-container" >
        <h1 className="pageNotFound__heading">AWWW...Don't cry </h1>
        <p className="pageNotFound__message"> It's just a 404 error</p>
        <p className="pageNotFound__reason">The requested URL was not found on this server</p>
      </div>
      <div className="pageNotFound__image-conatiner">
        <img className="pageNotFound__img" src={urlNotFoundImage} alt="404 Notfound" />
      </div>
    </section>
  );
}
export default PageNotFound;
