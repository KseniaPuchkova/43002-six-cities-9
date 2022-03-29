import {MouseEvent, memo} from 'react';
import {useDispatch} from 'react-redux';
import {Link} from 'react-router-dom';
import {useAppSelector} from '../../hooks/hooks';
import {logoutAction} from '../../store/api-actions';
import {AppRoute, AuthorizationStatus} from '../../const';

function Header(): JSX.Element {
  const dispatch = useDispatch();

  const {authorizationStatus, userData} = useAppSelector(({USER}) => USER);

  const handleLogoutClick= (evt: MouseEvent) => {
    evt.preventDefault();
    dispatch(logoutAction());
  };

  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Link className="header__logo-link header__logo-link--active" to={AppRoute.Main}>
              <img className="header__logo"
                src="img/logo.svg"
                alt="6 cities logo"
                width="81"
                height="41"
              />
            </Link>
          </div>
          <nav className="header__nav">
            {
              authorizationStatus === AuthorizationStatus.Auth ? (
                <ul className="header__nav-list">
                  <li className="header__nav-item user">
                    <Link className="header__nav-link header__nav-link--profile" to={AppRoute.Favorites}>
                      <div className="header__avatar-wrapper user__avatar-wrapper">
                        <img
                          src={userData?.avatarUrl}
                          alt={userData?.name}
                          style={{borderRadius: '100%'}}
                        />
                      </div>
                      <span className="header__user-name user__name">{userData?.email}</span>
                    </Link>
                  </li>
                  <li className="header__nav-item">
                    <Link className="header__nav-link"
                      to={AppRoute.Main}
                      onClick={handleLogoutClick}
                    >
                      <span className="header__signout">
                        Sign out
                      </span>
                    </Link>
                  </li>
                </ul>
              )
                : (
                  <ul className="header__nav-list">
                    <li className="header__nav-item user">
                      <Link className="header__nav-link header__nav-link--profile" to={AppRoute.SignIn}>
                        <div className="header__avatar-wrapper user__avatar-wrapper">
                        </div>
                        <span className="header__login">Sign in</span>
                      </Link>
                    </li>
                  </ul>
                )
            }
          </nav>
        </div>
      </div>
    </header>
  );
}

export default memo(Header);
