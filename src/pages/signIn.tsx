
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from "../components/firebase"; 

const SignIn: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {

    const authInstance = getAuth();
    const unsubscribe = onAuthStateChanged(authInstance, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        navigate("/home");
      } else {
        setUser(null);
      }
    });
    
    return () => unsubscribe(); 
  }, [navigate]);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const authInstance = getAuth(); 
      await signInWithEmailAndPassword(authInstance, email, password); 
      navigate("/home");
    } catch (error) {
      setError("Error signing in");
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider); 
      const user = result.user;
      console.log("Google User: ", user);
      navigate("/home");
    } catch (error) {
      setError("Google sign-in failed");
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth); 
      setUser(null);
      navigate("/signin"); 
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  return (
    <div className="signin-page" style={styles.signinPage}>
      <div className="signin-container" style={styles.signinContainer}>
        <h1>Sign In</h1>
        {!user ? (
          <>
            <form onSubmit={handleSignIn} className="signin-form" style={styles.form}>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                required
                style={styles.input}
              />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
                style={styles.input}
              />
              <button type="submit" style={styles.button}>Sign In</button>
              {error && <p className="error" style={styles.error}>{error}</p>}
            </form>
            <button onClick={handleGoogleSignIn} className="google-signin-btn" style={styles.googleSignInBtn}>
              Sign in with Google
            </button>
            <p>
              Don't have an account? <a href="/signup" style={styles.link}>Sign Up</a>
            </p>
          </>
        ) : (
          <div>
            <h2>Welcome back, {user.displayName || "User"}!</h2>
            <button onClick={handleLogout} className="btn btn-danger" style={styles.logoutBtn}>Logout</button>
          </div>
        )}
      </div>
    </div>
  );
};

// Inline styles with TypeScript fix for `textAlign`
const styles = {
  signinPage: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "#f7f7f7",
  },
  signinContainer: {
    backgroundColor: "white",
    padding: "30px",
    borderRadius: "8px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    width: "100%",
    maxWidth: "400px",
    textAlign: "center" as "center", 
    display: "flex",
    flexDirection: "column" as "column",  
    gap: "20px",
  },
  form: {
    display: "flex",
    flexDirection: "column" as "column",  
    gap: "15px",
  },
  input: {
    padding: "10px",
    fontSize: "16px",
    border: "1px solid #ccc",
    borderRadius: "4px",
  },
  button: {
    padding: "12px",
    fontSize: "16px",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  googleSignInBtn: {
    padding: "12px",
    fontSize: "16px",
    backgroundColor: "#4285f4",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    marginTop: "20px",
  },
  error: {
    color: "red",
    fontSize: "14px",
    marginTop: "10px",
  },
  link: {
    color: "#007bff",
    textDecoration: "none",
  },
  logoutBtn: {
    padding: "10px",
    backgroundColor: "#dc3545",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    marginTop: "20px",
  },
};

export default SignIn;
