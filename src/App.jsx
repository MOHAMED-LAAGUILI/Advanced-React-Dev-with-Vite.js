import { useState, useEffect } from 'react';
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import "animate.css/animate.min.css";
import { DevTool } from '@hookform/devtools';

export default function App() {
  const { register, handleSubmit, control, formState: { errors }, reset, defaultValues } = useForm({
    mode: 'onBlur',
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

  useEffect(() => {
    setAnimate(true);
  }, []);

  const countries = [
    { value: 'AF', label: 'Afghanistan' },
    { value: 'AX', label: 'Åland Islands' },
    { value: 'AL', label: 'Albania' },
    { value: 'US', label: 'United State' },
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
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="row">
                  <div className="col-md-6"> {/* Split form into two columns */}
                    <div className="form-group">
                      <label className="form-label" htmlFor="name">
                        <i className="fas fa-user me-2"></i> Name
                      </label>
                      <input
                        className="form-control"
                        id="name"
                        {...register('name', { required: true, minLength: 5, maxLength: 25 })}
                      />
                      <p className="text text-danger" role="text">
                        {errors.name && errors.name.type === "required" && <span>This is required</span>}
                        {errors.name && errors.name.type === "maxLength" && <span>Max length 25 letter exceeded</span>}
                        {errors.name && errors.name.type === "minLength" && <span>Min length 5 letters</span>}
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
                        {...register('age', { required: true, min: 18, max: 100 })}
                      />
                      <p className="text text-danger" role="text">
                        {errors.age && errors.age.type === "required" && <span>Age is required</span>}
                        {errors.age && (errors.age.type === "min" || errors.age.type === "max") && <span>Age must be between 18 and 100</span>}
                      </p>
                    </div>
                  </div>

                  <div className="col-md-6"> {/* Second column */}
                    <div className="form-group">
                      <label className="form-label" htmlFor="email">
                        <i className="fas fa-envelope me-2"></i> Email
                      </label>
                      <input
                        className="form-control"
                        id="email"
                        type="email"
                        {...register('email', { required: true, pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/ })}
                      />
                      <p className="text text-danger" role="text">
                        {errors.email && errors.email.type === "required" && <span>Email is required</span>}
                        {errors.email && errors.email.type === "pattern" && <span>Invalid email address</span>}
                      </p>
                    </div>

                    <div className="form-group">
                      <label className="form-label" htmlFor="country">
                        <i className="fas fa-globe me-2"></i> Country
                      </label>
                      <select
                        className="form-control"
                        id="country"
                        {...register('country', { required: true })}
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
                      <p className="text text-danger" role="text">
                        {errors.country && errors.country.type === "required" && <span>Country is required</span>}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="d-grid gap-2">
                  <input type="submit" className="btn btn-success" value="Submit" />
                  <button
                    className="btn btn-warning"
                    type="button"
                    onClick={() => reset(defaultValues)}
                  >
                    Reset
                  </button>
                </div>
              </form>
              
                 <DevTool control={control}/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}