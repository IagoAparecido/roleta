import Input from "../../components/Input";
import "./styles.css";

function Login() {
  return (
    <div className="container_login">
      <img src="../../../public/logo.png" alt="" />
      <div className="border_img"></div>
      <form action="">
        <h1>Login</h1>
        <Input
          //   value={formatCPF(cpf)}
          //   setValue={setCpf}
          type="email"
          title="Email"
        />
        <Input
          //   value={formatCPF(cpf)}
          //   setValue={setCpf}
          type="password"
          title="Senha"
        />

        <button>Entrar</button>
      </form>
    </div>
  );
}

export default Login;
