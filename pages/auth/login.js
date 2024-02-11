import React, { useState } from 'react';
import Cookie from 'js-cookie';
import Router from 'next/router';
import { unauthPage } from '../../middlewares/authorizationPage';
import Link from 'next/link';

export async function getServerSideProps(ctx) {
	await unauthPage(ctx);

	return { props: {} };
}

export default function Login() {
	const [fields, setFields] = useState({
		email: '',
		password: '',
	});

	const [status, setStatus] = useState('normal');
	const [passwordVisible, setPasswordVisible] = useState(false);

	async function loginHandler(e) {
		e.preventDefault();

		setStatus('loading');

		const loginReq = await fetch('/api/auth/login', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(fields),
		});

		if (!loginReq.ok) return setStatus('error ' + loginReq.status);

		const loginRes = await loginReq.json();

		setStatus('success');

		Cookie.set('token', loginRes.token);

		Router.push('/posts');
	}

	function fieldHandler(e) {
		const name = e.target.getAttribute('name');

		setFields({
			...fields,
			[name]: e.target.value,
		});
	}

	return (
		<>
			<section>
				<div className="color"></div>
				<div className="color"></div>
				<div className="color"></div>
				<div className="box-post">
					<div className="square"></div>
					<div className="square"></div>
					<div className="square"></div>
					<div className="square"></div>
					<div className="square"></div>
					<div className="container">
						<div className="form">
							<h2>LogIn Form</h2>
							<form onSubmit={loginHandler.bind(this)}>
								<div className="input-box">
									<span className="icon">
										<ion-icon name="mail"></ion-icon>
									</span>
									<input onChange={fieldHandler.bind(this)} type="text" name="email" autoComplete="off" required />
									<label>
										<i className="input-icon uil uil-at">Email</i>
									</label>
								</div>

								<div className="input-box">
									<span className="icon">
										<img
											src={passwordVisible ? "/login/show.svg" : "/login/hide.svg"}
											className="btn-password"
											onClick={() => setPasswordVisible(!passwordVisible)}
											width={30}
											height={30}
											xmlns="http://www.w3.org/2000/svg"
											alt={passwordVisible ? "hide" : "show"}
										/>
									</span>

									<input onChange={fieldHandler.bind(this)} id="password-input" type={passwordVisible ? 'text' : 'password'} name="password" autoComplete="off" required />
									<label>
										<i className="fas fa-key input-icon">Password</i>
									</label>
								</div>

								<button className="btn-login" type="submit">
									LogIn
								</button>

								<div className="login-link">
									<p>
										Don't have an account? &nbsp;
										<Link href="/auth/register">
											<a>Register</a>
										</Link>
									</p>
									{/* <div>Status: {status}</div>   */}
								</div>
							</form>
						</div>
					</div>
				</div>
			</section>
		</>
	);
}
