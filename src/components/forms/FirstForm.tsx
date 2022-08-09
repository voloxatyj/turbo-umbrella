import React, { useState, useContext } from 'react';
import { Context } from '../../context/useContext';
import { useCookie } from '../../hooks/useCookie';
import { Set_TabForm, Add_Member } from '../../context/reducer';
import { Notifications } from '../Notifications';
import { FormInput } from '../FormInput';
import InputMask from 'react-input-mask';
import { validationFormHandler } from '../../helpers/validationFormHandler';
import { checkDate } from '../../helpers/checkDate';
import { AddMember } from '../../services/api.service';
import DatePicker from 'react-datepicker';
import dayjs from 'dayjs';
import { IUser, IError, IMember } from '../../types/interfaces';
import 'react-datepicker/dist/react-datepicker.css';

export const FirstForm: React.FC = (): JSX.Element => {
  const [user, setUser] = useState<IUser>({
    firstname: '',
    lastname: '',
    birthdate: dayjs(new Date()).format('YYYY-MM-DD'),
    report_subject: '',
    phone: '',
    email: '',
    country_id: null,
  });
  const [errors, setErrors] = useState<IError>({
    firstname: false,
    lastname: false,
    birthdate: false,
    report_subject: false,
    country_id: false,
    phone: false,
    email: false,
    request: '',
  });
  const {
    state: { members, countries },
    dispatch,
  } = useContext(Context);
  const [, setCookie] = useCookie();
  const [todayDate, setTodayDate] = useState(true);

  const onChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    setUser({ ...user, [event.target.id]: event.target.value });
    setErrors(validationFormHandler(event, members, errors));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!user.country_id) return setErrors({ ...errors, country_id: true });
    const get_errors = await checkDate(user.birthdate, errors);
    setErrors(get_errors);
    Reflect.deleteProperty(get_errors, 'request');
    const checkErrors = Object.values(get_errors).every((error) => !error);
    if (!checkErrors) return;
    const { error, member } = await AddMember(user);
    if (member) {
      dispatch(Add_Member(member as IMember));
      dispatch(Set_TabForm('second'));
      setCookie('second', 1);
      return;
    }
    if (error) {
      setErrors({ ...errors, request: error });
    }
  };

  return (
    <>
      <form className='firstForm mt-5' onSubmit={handleSubmit}>
        <div className='firstForm-row'>
          <FormInput
            onChangeHandler={onChangeHandler}
            classNameDiv='col-xs-4 col-sm-8 col-md-10 col-lg-12 mb-3'
            error={errors.firstname}
            error_value='At least three characters'
            value={user.firstname}
            field_id='firstname'
            field_value='First Name'
          />
          <FormInput
            onChangeHandler={onChangeHandler}
            classNameDiv='col-xs-4 col-sm-8 col-md-10 col-lg-12 mb-3'
            error={errors.lastname}
            error_value='At least three characters'
            value={user.lastname}
            field_id='lastname'
            field_value='Last Name'
          />
          <FormInput
            onChangeHandler={onChangeHandler}
            classNameDiv='col-xs-4 col-sm-8 col-md-10 col-lg-12 mb-3'
            error={errors.report_subject}
            error_value='At least five characters'
            value={user.report_subject}
            field_id='report_subject'
            field_value='Report subject'
          />
          <div className='col-sm-8 col-md-10 col-lg-12 mb-3'>
            <label htmlFor='country'>List of countries</label>
            <select
              className={`form-control ${
                !user.country_id
                  ? ''
                  : errors.country_id
                  ? 'htmlForm-control is-invalid'
                  : 'htmlForm-control is-valid'
              }`}
              id='country'
              onChange={(e) => {
                setUser({ ...user, country_id: +e.target.value });
                setErrors({ ...errors, country_id: false });
              }}
            >
              <option value='default'>Choose a country</option>
              {countries.map((el) => (
                <option key={el.id} value={el.id}>
                  {el.name}
                </option>
              ))}
              ;
            </select>
            <Notifications
              positive='Looks good!'
              negative='Please choose a country.'
              error={errors.country_id}
            />
          </div>
          <div className='col-xs-4 col-sm-8 col-md-10 col-lg-12 mb-3'>
            <label htmlFor='phone'>Your phone</label>
            <InputMask
              id='phone'
              mask='(+1) 999 999 9999'
              value={user.phone}
              onChange={onChangeHandler}
              className={
                !user.phone
                  ? 'form-control'
                  : errors.phone
                  ? 'form-control is-invalid'
                  : 'form-control is-valid'
              }
            ></InputMask>
            <Notifications
              positive='Looks good!'
              negative='Please, type phone in correct format.'
              error={errors.phone}
            />
          </div>
          <div className='col-xs-4 col-sm-8 col-md-10 col-lg-12 mb-3'>
            <label htmlFor='birthdate'>Your birthdate</label>
            <DatePicker
              id='birthdate'
              className={
                todayDate
                  ? 'form-control'
                  : errors.birthdate
                  ? 'form-control is-invalid'
                  : 'form-control is-valid'
              }
              selected={dayjs(user.birthdate).toDate()}
              value={dayjs(user.birthdate).format('YYYY-MM-DD')}
              onChange={async (date: Date) => {
                const birthdate = dayjs(date).format('YYYY-MM-DD');
                setUser({ ...user, birthdate });
                const response = await checkDate(birthdate, errors);
                setErrors(response);
                setTodayDate(false);
              }}
            />
            <div
              className='valid-feedback'
              style={{
                display: todayDate
                  ? 'none'
                  : errors.birthdate
                  ? 'none'
                  : 'block',
              }}
            >
              Looks good!
            </div>
            <div
              className='invalid-feedback'
              style={{ display: errors.birthdate ? 'block' : 'none' }}
            >
              Please choose correct date.
            </div>
          </div>
          <FormInput
            onChangeHandler={onChangeHandler}
            classNameDiv='col-xs-4 col-sm-8 col-md-10 col-lg-12 mb-3'
            error={errors.email || !!errors.request}
            error_value={errors.request || 'Email is not valid'}
            value={user.email}
            field_id='email'
            field_value='Your email'
          />
          <div className='btn-container col-sm-8 col-md-10 col-lg-12 mb-3'>
            <button className='btn btn-primary mb-5' type='submit'>
              Next
            </button>
          </div>
        </div>
      </form>
    </>
  );
};
