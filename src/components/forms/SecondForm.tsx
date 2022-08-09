import React, { useState, useContext } from 'react';
import { Context } from '../../context/useContext';
import { useCookie } from '../../hooks/useCookie';
import { updateMember } from '../../services/api.service';
import { Set_TabForm, Update_Member } from '../../context/reducer';
import { IUserInfo } from '../../types/interfaces';
import { getBase64 } from '../../helpers/getBase64';
import { FormInput } from '../FormInput';

export const SecondForm: React.FC = (): JSX.Element => {
  const [userInfo, setUserInfo] = useState<IUserInfo>({
    company: '',
    position: '',
    about: '',
    photo_url: '',
    photo_hash: '',
    photo_ext: '',
    photo: {},
  });
  const [imgError, setImgError] = useState('');
  const [, updateCookie] = useCookie();
  const {
    state: { members },
    dispatch,
  } = useContext(Context);

  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) =>
    setUserInfo({ ...userInfo, [event.target.id]: event.target.value });

  const onChangeImage = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files !== null) {
      const photo_hash = await getBase64(event.target.files[0]);
      setImgError('');
      setUserInfo({
        ...userInfo,
        photo: event.target.files[0].name,
        photo_hash,
        photo_ext: event.target.files[0].type,
        photo_url: URL.createObjectURL(event.target.files[0]),
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const id = members[members.length - 1].id;
    if (id) {
      const { error } = await updateMember(id, userInfo);
      if (error) {
        setImgError(
          'Image must have a valid type. Such like .png, .jpeg, .jpg',
        );
        return;
      }
      dispatch(Update_Member(id, userInfo));
    }
    dispatch(Set_TabForm('third'));
    updateCookie('third');
  };

  return (
    <>
      <form className='secondForm' onSubmit={handleSubmit}>
        <div className='secondForm-row'>
          <FormInput
            onChangeHandler={onChangeHandler}
            classNameDiv='col-xs-4 col-sm-8 col-md-10 col-lg-12 mb-3'
            value={userInfo.company || ''}
            field_id='company'
            field_value='Company'
            notification_disabled={true}
          />
          <FormInput
            onChangeHandler={onChangeHandler}
            classNameDiv='col-xs-4 col-sm-8 col-md-10 col-lg-12 mb-3'
            value={userInfo.position || ''}
            field_id='position'
            field_value='Position'
            notification_disabled={true}
          />
          <div className='col-xs-4 col-sm-8 col-md-10 col-lg-12 mb-3'>
            <label htmlFor='aboutMe'>About Me</label>
            <textarea
              id='aboutMe'
              className={`form-control ${!!userInfo.about ? 'is-valid' : ''}`}
              onChange={(e) =>
                setUserInfo({ ...userInfo, about: e.target.value })
              }
            ></textarea>
          </div>
          <div className='image-container'>
            <div className='input-image'>
              <label className='pl-3 mt-3' htmlFor='image'>
                Choose Image
              </label>
              <input
                className='image pl-3'
                id='photo'
                type='file'
                multiple={true}
                onChange={onChangeImage}
              />
            </div>
            <div className='render-image p-3'>
              {userInfo.photo_url && (
                <img src={userInfo.photo_url} alt={userInfo.photo_url} />
              )}
            </div>
          </div>
          <div className='btn-container col-lg-7 col-md-7 mt-5 mr-3'>
            <button className='btn btn-primary mb-5' type='submit'>
              Next
            </button>
          </div>
        </div>
      </form>
      {imgError && (
        <div className='alert alert-danger' role='alert'>
          {imgError}
        </div>
      )}
    </>
  );
};
