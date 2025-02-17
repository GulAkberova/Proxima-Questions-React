import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { auth, db } from "../firebaseConfig";
import { setDoc, doc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import "./auth.css";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      const isSuperAdmin = email === "kbrovagul0@gmail.com";

      await setDoc(doc(db, "users", user.uid), {
        email: user.email,
        isAdmin: isSuperAdmin,
        isSuperAdmin: isSuperAdmin,
      });

      console.log("İstifadəçi qeydiyyatdan keçdi!");
      navigate("/login");
    } catch (error) {
      console.error("Xəta baş verdi:", error);
    }

    setLoading(false);
  };
  return (
    <div className="auth_container">
      <h2 className="auth_title">Qeydiyyat</h2>
      <form onSubmit={handleRegister} className="auth_form">
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
          {loading ? "Qeydiyyat edilir..." : "Qeydiyyatdan Keç"}
        </button>
      </form>
      <p className="auth_switch">
        Artıq hesabın var?{" "}
        <span onClick={() => navigate("/login")} className="auth_link">
          Daxil ol
        </span>
      </p>
    </div>
  );
};

export default Register;
