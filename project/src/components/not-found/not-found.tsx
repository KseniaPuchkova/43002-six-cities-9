import {Link} from 'react-router-dom';
import Header from '../header/header';
import Footer from '../footer/footer';
import {AppRoute} from '../../const';

function NotFoundPage() {
  return (
    <div className="page page--not-found">
      <Header />
      <main className="page__main page__main--index">
        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <b className="places__found">404. Page Not Found</b>
              <Link className="login__submit form__submit button" to={AppRoute.Main}>Return to main page</Link>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default NotFoundPage;
