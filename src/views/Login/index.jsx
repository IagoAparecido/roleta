import { useState } from "react";
import Input from "../../components/Input";
import "./styles.css";

function Login() {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    setError(false);
    event.preventDefault();

    try {
      const response = await fetch("https://roleta-back.vercel.app/user/auth", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      const responseData = await response.json();

      if (response.status === 200) {
        localStorage.setItem("token", responseData.token);
        localStorage.setItem("name", responseData.name);
        localStorage.setItem("email", responseData.email);
        localStorage.setItem("status", responseData.status);

        window.location.href = "/dashboard";
      }

      if (response.status === 422) {
        setError(true);
        setLoading(false);
      } else {
        setError(false);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
      alert("Erro ao realizar o login, tente novamente mais tarde.");
    }
  };

  return (
    <div className="container_login">
      <img src="../../../logo.png" alt="" />
      <div className="border_img"></div>
      <form onSubmit={handleSubmit}>
        <h1>Login</h1>
        <Input value={email} setValue={setEmail} type="email" title="Email" />
        <Input
          value={password}
          setValue={setPassword}
          type="password"
          title="Senha"
        />

        {error && <p>E-mail ou senha incorretos</p>}

        <button type="submit">
          {loading ? (
            <div className="lds-ellipsis">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
          ) : (
            "Entrar"
          )}
        </button>
      </form>
    </div>
  );
}

export default Login;
