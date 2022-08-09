import React, { useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { Context } from '../context/useContext';

export const Header: React.FC = (): JSX.Element => {
  const {
    state: { tab_form },
  } = useContext(Context);
  const { pathname } = useLocation();

  return (
    <header className='header-container sticky-top bd-navbar'>
      {!tab_form.startsWith('third') && pathname === '/' && (
        <h2 className='title'>
          To participate in the conference, please fill out the form
        </h2>
      )}
      {pathname === '/members' && <h2 className='title'>List of Members</h2>}
    </header>
  );
};
