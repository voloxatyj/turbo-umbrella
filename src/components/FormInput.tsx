import { IFormInput } from "../types/interfaces";
import { Notifications } from "./Notifications";

export const FormInput: React.FC<IFormInput> = ({
	onChangeHandler,
	classNameDiv,
	error,
  error_value,
	value,
	field_id,
	field_value,
  notification_disabled
}: IFormInput): JSX.Element => (
  <>
    <div className={classNameDiv}>
      <label htmlFor={field_id}>{field_value}</label>
      <input
        onChange={onChangeHandler}
        type="text"
        className={`form-control ${!value ? "" : error ? "is-invalid" : "is-valid"}`}
        id={field_id}
        placeholder={field_value}
        value={value}
        required
      />
      {!notification_disabled && (
        <Notifications
          positive="Looks good!"
          negative={error_value}
          error={error}
        />
      )}
    </div>
  </>
);