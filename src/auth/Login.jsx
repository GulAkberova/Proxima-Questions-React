import { useState, useEffect } from "react";
import { auth, signInWithEmailAndPassword } from "../firebaseConfig";
import { useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";
import "./auth.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [userRole, setUserRole] = useState(null); // İstifadəçi rolunu saxlamaq üçün state
  const [isSuperAdmin, setIsSuperAdmin] = useState(false); // SuperAdmin rolu
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // Firestore-dan istifadəçinin rolunu çəkmək
      const userRef = doc(db, "users", user.uid);
      const userDoc = await getDoc(userRef);

      if (userDoc.exists()) {
        const userInfo = userDoc.data();
        setUserRole(userInfo.isAdmin); // İstifadəçi admin olub-olmadığını göstər
        setIsSuperAdmin(userInfo.isSuperAdmin); // SuperAdmin olub-olmadığını göstər
        console.log("İstifadəçi rolunu əldə etdik:", userInfo.isAdmin);
        console.log("SuperAdmin statusu:", userInfo.isSuperAdmin);
      }

      console.log("İstifadəçi daxil oldu");
      navigate("/"); // Ana səhifəyə yönləndir
    } catch (err) {
      setError(err.message);
    }

    setLoading(false);
  };

  return (
    <div className="auth_container">
      <h2 className="auth_title">Giriş</h2>
      {error && <p className="auth_error">{error}</p>}
      <form onSubmit={handleLogin} className="auth_form">
        <input
          type="email"
          className="auth_input"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          className="auth_input"
          placeholder="Şifrə"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" className="auth_button" disabled={loading}>
          {loading ? "Giriş edilir..." : "Daxil ol"}
        </button>
      </form>
      <p className="auth_switch">
        Hesabın yoxdur?{" "}
        <span onClick={() => navigate("/register")} className="auth_link">
          Qeydiyyatdan keç
        </span>
      </p>
    </div>
  );
};

export default Login;
