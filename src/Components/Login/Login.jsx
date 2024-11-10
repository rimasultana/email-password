import { sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth";
import auth from "../../firebase.init";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {
  const [success, setSuccess] = useState(false);
  const [loginError, setLoginError] = useState();
  const emailRef = useRef();
  
  const handleLogin = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    setSuccess(false);
    setLoginError("");

    // Login user
    signInWithEmailAndPassword(auth, email, password)
      .then((result) => {
        if (!result.user.emailVerified) {
          setLoginError("Please verify your email!");
        } else {
          setSuccess(true);
        }
      })
      .catch((error) => {
        setLoginError(error.message);
      });
  };

  const handleForgotPassword = () => {
    const email = emailRef.current.value;
    if (!email) {
      alert("Please provide an email address!");
    } else {
      sendPasswordResetEmail(auth, email)
        .then(() => {
          alert("Password reset email sent. Please check your email.");
        })
        .catch((error) => {
          setLoginError(error.message);
        });
    }
  };

  return (
    <div>
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <h1 className="text-4xl text-center">Login</h1>
          <form onSubmit={handleLogin} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                name="email"
                ref={emailRef}
                placeholder="email"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                name="password"
                type="password"
                placeholder="password"
                className="input input-bordered"
                required
              />
              <label onClick={handleForgotPassword} className="label">
                <span className="label-text-alt link link-hover">
                  Forgot password?
                </span>
              </label>
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-primary">Login</button>
            </div>
          </form>
          {success && <p className="text-green-600">User logged in successfully!</p>}
          {loginError && <p className="text-red-600">{loginError}</p>}
          <p className="text-center">
            New to this website?{" "}
            <Link to={"/signup"}>
              <span className="text-red-700">Sign Up</span>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
