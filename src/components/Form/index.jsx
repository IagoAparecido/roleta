import './styles.css'

function Form({ click }) {
  return (
    <div className='container_form'>
      <form>

        <div className="group">
          <input type="text" required />
          <span className="highlight"></span>
          <span className="bar"></span>
          <label>Nome</label>
        </div>

        <div className="group">
          <input type="email" required />
          <span className="highlight"></span>
          <span className="bar"></span>
          <label>E-mail</label>
        </div>

        <div className="group">
          <input type="tel" required />
          <span className="highlight"></span>
          <span className="bar"></span>
          <label>Telefone</label>
        </div>


        <button type='submit' className='button-4' onClick={click}>SPIN</button>

      </form>
    </div>

  )
}

export default Form