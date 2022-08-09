import React from 'react';
import { INotifications } from '../types/interfaces';

export const Notifications: React.FC<INotifications> = ({
  positive,
  negative,
  error,
}: INotifications): JSX.Element => (
  <>
    <div className='valid-feedback'>{positive}</div>
    <div
      className='invalid-feedback'
      style={{ display: error ? 'block' : 'none' }}
    >
      {negative}
    </div>
  </>
);
