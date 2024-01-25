import React, { useState } from 'react';

export default function Register() {
	const [fields, setFields] = useState({ 
		email: '', 
		password: '' 
	});

	function registerHandler(e) {
		e.preventDefault();

		console.log(fields)
	}

	function fieldHandler(e) {
		const name = e.target.getAttribute('name');

		setFields({
			...fields,
			[name]: e.target.value
		});
	}

	return (
    <div>
      <h1>Register</h1>

      <form onSubmit={registerHandler.bind(this)}>
        <input 
		name='email'
		onChange={fieldHandler.bind(this)}
		type='text' 
		placeholder='Email'
		/>
        <input
		name='password'
		onChange={fieldHandler.bind(this)}
		type='password' 
		placeholder='Password' 
		/>
        <br />
        <button type='submit'>
			Register
			</button>
      </form>
    </div>
  );
}
