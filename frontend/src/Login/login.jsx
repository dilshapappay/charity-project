import { useState } from "react";
import {
  login as loginServiceMethod,
  register,
} from "../services/loginService";
import { useNavigate ,useLocation} from "react-router-dom";
import styles from "./login.module.css";
import { useAuth } from "../Auth/AuthContext";

export default function Login() {
  const [isLoginPage, setIsLoginPage] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, login, logout } = useAuth();
  // localStorage.removeItem("token")
  // logout();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      if (isLoginPage) {
        if (!isAuthenticated) {
          const data = await loginServiceMethod(email, password);
          localStorage.setItem("token", data.token);
          localStorage.setItem("role", data.role);
          login();
        }
        const redirectUrl = new URLSearchParams(location.search).get('redirect') || '/main';
        navigate(redirectUrl);
        return;
      }

      await register(firstName, lastName, email, password, confirmPassword);
      setIsLoginPage(true);
      navigate("/login");

    } catch (err) {
      if (isLoginPage) {
        setError('Email is not registered or password is incorrect');
      } else {
        setError(err.message);
      }
    }
  };

  return (
    <div className={styles.loginPageContainer}>
      <div className={styles.loginPage}>
        <h1>{isLoginPage ? "Let's Get You Inside" : "Create an Account"}</h1>
        <form onSubmit={handleSubmit}>
          {!isLoginPage && (
            <div className={styles.formGroup}>
              <i className="fas fa-user"></i>
              <input
                type="text"
                id="firstName"
                placeholder="Your First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </div>
          )}
          {!isLoginPage && (
            <div className={styles.formGroup}>
              <i className="fas fa-user"></i>
              <input
                type="text"
                id="lastName"
                placeholder="Your Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </div>
          )}
          <div className={styles.formGroup}>
         
            <input
              type="email"
              id="email"
              placeholder="me@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className={styles.formGroup}>
       
            <input
              type="password"
              id="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {isLoginPage && (
              <a href="#" className={styles.forgotPassword}>
                Forgot password?
              </a>
            )}
          </div>
          {!isLoginPage && (
            <div className={styles.formGroup}>
              <i className="fas fa-lock"></i>
              <input
                type="password"
                id="confirmPassword"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
          )}
          <button type="submit" className={styles.loginButton}>
            {isLoginPage ? "Login" : "Signup"}
          </button>
          {error && <div className={styles.error}>{error}</div>}
        </form>
        <p className={styles.toggleForm}>
          {isLoginPage ? (
            <>
              Don't have an account?{" "}
              <a href="#" onClick={() => setIsLoginPage(false)}>
                Sign up
              </a>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <a href="#" onClick={() => setIsLoginPage(true)}>
                Login
              </a>
            </>
          )}
        </p>
      </div>
    </div>
  );
}
