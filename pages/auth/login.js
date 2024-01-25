import React, { useState } from "react";

export default function Login() {
  const [fields, setFields] = useState({
    email: "",
    password: "",
  });

  async function loginHandler(e) {
    e.preventDefault();
  }

  function fieldHandler(e) {
    const name = e.target.getAttribute('name');

    setFields({
      ...fields,
      [name]: e.target.value,
    });
  }

  return (
    <div>
      <h1>Login</h1>

      <form onSubmit={loginHandler.bind(this)}>
        <input 
		onChange={fieldHandler.bind(this)}
		type="text" 
		name="email" 
		placeholder="Email" 
		/>

        <input 
		onChange={fieldHandler.bind(this)}
		type="password" 
		name="password" 
		placeholder="Password" 
		/>

        <button type="submit">Login</button>
      </form>
    </div>
  );
}
