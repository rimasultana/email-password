import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
} from "firebase/auth";
import auth from "../../firebase.init";
import { useState } from "react";
import { FaEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";

const Signup = () => {
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState();
  const [showPassword, setShowPassowrd] = useState(false);

  const handleRegister = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    const terms = e.target.terms.checked;
    const photo = e.target.photo.value;
    const name = e.target.name.value;
    console.log(email, password, terms, name, photo);

    setErrorMessage("");
    if (!terms) {
      setErrorMessage("please accept our condition!");
      return;
    }
    if (password.length < 6) {
      setErrorMessage("Password should be 6 characters or longer.");
      return;
    }

    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;

    if (!passwordRegex.test(password)) {
      setErrorMessage(
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character."
      );
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        console.log(result.user);
        setSuccess(true);
        sendEmailVerification(auth.currentUser).then(() => {
          console.log("verification Email done!");
        });
        const profile = {
            displayName:name,
            photoURl:photo
        }
        updateProfile(auth.currentUser , profile)
        .then(()=>{
            console.log("user profile update")
        }).catch((error)=>{
            console.log("User profile update error", error);
        })
      })
      .catch((error) => {
        console.log("error", error);
        setErrorMessage(error.message);
        setSuccess(false);
      });
  };

  return (
    <div>
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <h1 className="text-3xl font-bold text-center">Sign Up Now</h1>
          <form onSubmit={handleRegister} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                type="text"
                name="name"
                placeholder="name"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">PhotoUrl</span>
              </label>
              <input
                type="text"
                name="
                photo"
                placeholder="photo url"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                name="email"
                placeholder="email"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control relative">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="password"
                className="input input-bordered"
                required
              />
              <button
                onClick={() => {
                  setShowPassowrd(!showPassword);
                }}
                className="btn btn-xs absolute right-4 top-12"
              >
                {showPassword ? <FaEye /> : <FaRegEyeSlash />}
              </button>
              <label className="label">
                <a href="#" className="label-text-alt link link-hover">
                  Forgot password?
                </a>
              </label>
              <div className="form-control">
                <label className="label cursor-pointer justify-start gap-3">
                  <input type="checkbox" name="terms" />
                  <span className="label-text">
                    Accept our terms and Condition
                  </span>
                </label>
              </div>
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-primary">Sign Up</button>
            </div>
          </form>
          {errorMessage && <p className="text-red-500">{errorMessage}</p>}
          {success && <p className="text-green-700">Successfully signed up!</p>}
          <p className="text-center my-2">
            Already have an account <Link to={"/login"}>Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
