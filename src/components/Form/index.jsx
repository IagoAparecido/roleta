import { useState } from 'react'
import './styles.css'

function Form(props) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [tel, setTel] = useState('')
  const [erro, setErro] = useState(false)

  const isFormFilled = name && email && tel

  const handleClick = () => {
    if (isFormFilled) {
      setErro(false)

      props.click()
    }
    else if (name || email || tel == '') {
      setErro(true)
    }
  }

  return (
    <div className='container_form'>
      <div className='div_text'>
        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit.</p>
      </div>
      <form>
        <div className="group">
          <input
            type="text"
            required
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
          <span className="highlight"></span>
          <span className="bar"></span>
          <label>Nome</label>
        </div>

        <div className="group">
          <input
            type="text"
            required
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <span className="highlight"></span>
          <span className="bar"></span>
          <label >E-mail</label>
        </div>

        <div className="group">
          <input
            type="number"
            required
            onChange={(e) => setTel(e.target.value)}
            value={tel}
          />
          <span className="highlight"></span>
          <span className="bar"></span>
          <label>Telefone</label>
        </div>

        {erro && <p className='message_error'>Preencha os dados corretamente</p>}

        <button type='button' className='button-4' onClick={handleClick} disabled={props.disabled}>
          SPIN
        </button>
      </form>
    </div>
  )
}

export default Form
