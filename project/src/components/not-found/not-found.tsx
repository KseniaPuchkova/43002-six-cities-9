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
          <div className="cities__status-wrapper container">
            <section className="tabs__content container">
              <b className="places__found">404. Page not found</b>
              <Link
                className="form__submit button"
                style={{width: '50%'}}
                to={AppRoute.Main}
              >
                Return to main page
              </Link>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default NotFoundPage;
