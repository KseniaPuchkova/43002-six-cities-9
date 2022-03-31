import {useState, ChangeEvent, FormEvent, memo} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {loginAction} from '../../store/api-actions';
import Header from '../header/header';
import {useAppSelector} from '../../hooks/hooks';
import {useAppDispatch} from '../../hooks/hooks';
import {AppRoute, AuthorizationStatus} from '../../const';

const Reg = {
  EMAIL: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
  PASSWORD: /^(?=.*[a-z])(?=.*[0-9]).+$/,
};

enum ValidityText {
  Email = 'Please enter the correct email address',
  PasswordOnlySpaces = 'The password must not consist of only spaces',
  PasswordDigitAndLetter = 'The password must contain at least one digit and one letter',
}

function Login(): JSX.Element {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [authData, setAuthData] = useState({email: '', password: ''});
  const {email, password} = authData;

  const activeCity = useAppSelector(({APP}) => APP.activeCity);
  const authorizationStatus = useAppSelector(({USER}) => USER.authorizationStatus);

  if (authorizationStatus === AuthorizationStatus.Auth) {
    navigate(AppRoute.Main);
  }

  const handleEmailChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const {name, value} = evt.target;
    setAuthData({...authData, [name]:value});

    if (!Reg.EMAIL.test(evt.target.value)) {
      evt.target.setCustomValidity(ValidityText.Email);
    }
    else {
      evt.target.setCustomValidity('');
    }
  };

  const handlePasswordChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const {name, value} = evt.target;
    setAuthData({...authData, [name]:value});

    if ((evt.target.value).trim().length === 0) {
      evt.target.setCustomValidity(ValidityText.PasswordOnlySpaces);
    }
    else if (!Reg.PASSWORD.test(evt.target.value))  {
      evt.target.setCustomValidity(ValidityText.PasswordDigitAndLetter);
    }
    else {
      evt.target.setCustomValidity('');
    }
  };

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

export default memo(Login);
