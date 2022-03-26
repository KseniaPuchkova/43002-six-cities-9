import {useState, ChangeEvent, FormEvent} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {loginAction} from '../../store/api-actions';
import Header from '../header/header';
import {useAppSelector} from '../../hooks/index';
import {useAppDispatch} from '../../hooks';
import {AppRoute, AuthorizationStatus} from '../../const';

const EMAIL_REG = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
const PASSWORD_REG = /^(?=.*[a-z])(?=.*[0-9]).+$/;
const EMAIL_TEXT = 'Please enter the correct email address';
const PASSWORD_TEXT= 'The password must not consist of only spaces and must contain at least one digit and one letter';

function Login(): JSX.Element {
  const [authData, setAuthData] = useState({email: '', password: ''});
  const {email, password} = authData;

  const navigate = useNavigate();
  const {activeCity, authorizationStatus} = useAppSelector((state) => state);
  if (authorizationStatus === AuthorizationStatus.Auth) {
    navigate(AppRoute.Main);
  }

  const handleEmailChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const {name, value} = evt.target;
    setAuthData({...authData, [name]:value});

    if (!EMAIL_REG.test(evt.target.value)) {
      evt.target.setCustomValidity(EMAIL_TEXT);
    }
    else {
      evt.target.setCustomValidity('');
    }
  };

  const handlePasswordChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const {name, value} = evt.target;
    setAuthData({...authData, [name]:value});

    if ((evt.target.value).trim().length === 0 || !PASSWORD_REG.test(evt.target.value)) {
      evt.target.setCustomValidity(PASSWORD_TEXT);
    }
    else {
      evt.target.setCustomValidity('');
    }
  };

  const dispatch = useAppDispatch();
  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    if (email && password) {
      dispatch(loginAction({email, password}));
    }
  };

  return (
    <div className="page page--gray page--login">
      <Header />
      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <section className="login">
            <h1 className="login__title">Sign in</h1>
            <form
              className="login__form form"
              action="#"
              method="post"
              onSubmit={handleSubmit}
            >
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">E-mail</label>
                <input
                  className="login__input form__input"
                  type="email"
                  name="email"
                  placeholder="Email"
                  onChange={handleEmailChange}
                  required
                />
              </div>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">Password</label>
                <input
                  className="login__input form__input"
                  type="password"
                  name="password"
                  placeholder="Password"
                  onChange={handlePasswordChange}
                  required
                />
              </div>
              <button
                className="login__submit form__submit button"
                type="submit"
              >
                Sign in
              </button>
            </form>
          </section>
          <section className="locations locations--login locations--current">
            <div className="locations__item">
              <Link className="locations__item-link" to={AppRoute.Main}>
                <span>{activeCity}</span>
              </Link>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default Login;
