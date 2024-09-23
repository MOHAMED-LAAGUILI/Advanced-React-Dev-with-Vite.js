import { useState, useEffect } from 'react';
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import "animate.css/animate.min.css";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const schema = yup.object().shape({
  // Name field
  name: yup.string()
    .required('Name is required') // Error message for required field
    .min(5, 'Name must be at least 5 characters') // Minimum length
    .max(25, 'Name must not exceed 25 characters'), // Maximum length

  // Email field
  email: yup.string()
    .required('Email is required') // Error message for required field
    .email('Invalid email address'), // Built-in email validation

  // Age field
  age: yup.number()
    .required('Age is required') // Error message for required field
    .integer('Age must be an integer') // Ensure age is an integer
    .min(18, 'Age must be at least 18') // Minimum age
    .max(100, 'Age must not exceed 100'), // Maximum age

  // Password field
  password: yup.string()
    .required('Password is required') // Error message for required field
    .min(8, 'Password must be at least 8 characters'), // Minimum length

  // Confirm Password field
  confirmPassword: yup.string()
    .required('Confirm password is required') // Error message for required field
    .oneOf([yup.ref('password'), null], 'Passwords must match'), // Match with password field

  // Country field
  country: yup.string()
    .required('Country is required') // Error message for required field
});

export default function Form() {
  const { register, handleSubmit, formState: { errors, isSubmitSuccessful, isValid, isSubmitting } } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(schema),
    defaultValues: async () => {
      const response = await fetch('https://jsonplaceholder.typicode.com/users');
      const data = await response.json();
      return data[0]; // Return the first user as default values
    }
  });

  const onSubmit = async (data) => {
    Swal.fire({
      title: "Form submitted successfully!",
      icon: "success",
      timer: 2000,
    });
    console.log(data);
  };

  const [animate, setAnimate] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isBlocked, setIsBlocked] = useState(false);
  const [submitCount, setSubmitCount] = useState(0);

  useEffect(() => {
    setAnimate(true);
  }, []);

  const countries = [
    { value: 'AF', label: 'Afghanistan' },
    { value: 'AX', label: 'Åland Islands' },
    { value: 'AL', label: 'Albania' },
    { value: 'US', label: 'United States' },
    // Add more countries to the list...
  ];

  return (
    <div className="container-fluid">
      <div className="row justify-content-center">
        <div className="col-md-10 col-lg-8 col-xl-6"> {/* Adjusted width for different screen sizes */}
          <div className="card shadow-lg p-3 mb-5 bg-body rounded" style={{ borderRadius: "10px" }}>
            <div className="card-header bg-primary text-white">
              <h5 className="card-title text-center">
                <i className="fas fa-user me-2"></i> User Form
              </h5>
              <div className={`animate__animated ${animate ? 'animate__fadeInDown' : ''}`} style={{ animationDuration: "1s" }}>
                <i className="fas fa-angle-double-down"></i>
              </div>
            </div>
            <div className={`card-body animate__animated ${animate ? 'animate__fadeIn' : ''}`}>
              <form onSubmit={handleSubmit((data) => {
                onSubmit(data);
                if (isValid) {
                  setSubmitCount(submitCount + 1);
                }
              })}>
                {(submitCount > 4 && Object.keys(errors).length === 0) ? (
                  <div>
                    <div className='alert alert-danger' role="alert">
                      <strong>You are Blocked due to submitting form more than 4 times with no errors. Contact Administrator !!</strong>
                    </div>
                    {setIsBlocked(true)}
                  </div>
                ) : (
                  <>
                    {isSubmitting && <div>Loading...</div>}
                    {isSubmitSuccessful && (
                      <div className='alert alert-primary'>
                        <strong>Success</strong> Form Submitted
                      </div>
                    )}
                    <div className="row">
                      <div className="col-md-6"> {/* Split form into two columns */}
                        <div className="form-group">
                          <label className="form-label" htmlFor="name">
                            <i className="fas fa-user me-2"></i> Name
                          </label>
                          <input
                            className="form-control"
                            id="name"
                            {...register('name')}
                            disabled={isBlocked}
                          />
                          <p className="text text-danger" role="text">
                            {errors.name && <span>{errors.name.message}</span>}
                          </p>
                        </div>

                        <div className="form-group">
                          <label className="form-label" htmlFor="age">
                            <i className="fas fa-birthday-cake me-2"></i> Age
                          </label>
                          <input
                            className="form-control"
                            id="age"
                            type="number"
                            {...register('age')}
                            disabled={isBlocked}
                          />
                          <p className="text text-danger" role="text">
                            {errors.age && <span>{errors.age.message}</span>}
                          </p>
                        </div>

                        <div className="form-group">
                          <label className="form-label" htmlFor="email">
                            <i className="fas fa-envelope me-2"></i> Email
                          </label>
                          <input
                            className="form-control"
                            id="email"
                            type="email"
                            {...register('email')}
                            disabled={isBlocked}
                          />
                          <p className="text text-danger" role="text">
                            {errors.email && <span>{errors.email.message}</span>}
                          </p>
                        </div>
                      </div>

                      <div className="col-md-6"> {/* Second column */}
                        <div className="form-group">
                          <label className="form-label" htmlFor="country">
                            <i className="fas fa-globe me-2"></i> Country
                          </label>
                          <select
                            className="form-control"
                            id="country"
                            {...register('country')}
                            disabled={isBlocked}
                          >
                            <option value="" disabled selected>
                              Select a country
                            </option>
                            {countries.map((country) => (
                              <option key={country.value} value={country.value}>
                                {country.label}
                              </option>
                            ))}
                          </select>
                          <p className="text text -danger" role="text">
                            {errors.country && <span>{errors.country.message}</span>}
                          </p>
                        </div >

                        <div className="form-group">
                          <label className="form-label" htmlFor="password">
                            <i className="fas fa-lock me-2"></i> Password
                          </label>
                          <div className="input-group">
                            <input
                              className="form-control"
                              id="password"
                              type={showPassword ? 'text' : 'password'}
                              {...register('password')}
                              disabled={isBlocked}
                            />
                            <button
                              className="btn btn-outline-secondary"
                              type="button"
                              onClick={() => setShowPassword(!showPassword)}
                              disabled={isBlocked}
                            >
                              {showPassword ? (
                                <i className="fas fa-eye-slash"></i>
                              ) : (
                                <i className="fas fa-eye"></i>
                              )}
                            </button>
                          </div>
                          <p className="text text-danger" role="text">
                            {errors.password && <span>{errors.password.message}</span>}
                          </p>
                        </div>

                        <div className="form-group">
                          <label className="form-label" htmlFor="confirmPassword">
                            <i className="fas fa-lock me-2"></i> Confirm Password
                          </label>
                          <div className="input-group">
                            <input
                              className="form-control"
                              id="confirmPassword"
                              type={showConfirmPassword ? 'text' : 'password'}
                              {...register('confirmPassword')}
                              disabled={isBlocked}
                            />
                            <button
                              className="btn btn-outline-secondary"
                              type="button"
                              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                              disabled={isBlocked}
                            >
                              {showConfirmPassword ? (
                                <i className="fas fa-eye-slash"></i>
                              ) : (
                                <i className="fas fa-eye"></i>
                              )}
                            </button>
                          </div>
                          <p className="text text-danger" role="text">
                            {errors.confirmPassword && <span>{errors.confirmPassword.message}</span>}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="row justify-content-center">
                      <button
                        className="btn btn-primary"
                        type="submit"
                        disabled={isSubmitting || isBlocked}
                      >
                        {isSubmitting ? (
                          <span>
                            <i className="fas fa-spinner fa-spin me-2"></i> Submitting...
                          </span>
                        ) : (
                          <span>
                            <i className="fas fa-paper-plane me-2"></i> Submit
                          </span>
                        )}
                      </button>
                    </div>
                  </>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

