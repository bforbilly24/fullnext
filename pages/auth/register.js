export default function Register() {
	function registerHandler(e) {
		e.preventDefault();
	}
	
	return (
    <div>
      <h1>Register</h1>

      <form onSubmit={registerHandler.bind(this)}>
        <input type="text" placeholder="Email" />
        <input type="password" placeholder="Password" />
        <br />
        <button type="submit">
			Register
			</button>
      </form>
    </div>
  );
}
