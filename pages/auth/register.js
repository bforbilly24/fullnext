import React, { useState } from 'react';
import { unauthPage } from '../../middlewares/authorizationPage';
import Link from 'next/link';

export async function getServerSideProps(ctx) {
	await unauthPage(ctx);

	return { props: {} };
}
export default function Register() {
	const [fields, setFields] = useState({
		email: '',
		password: '',
	});

	const [status, setStatus] = useState('normal');

	async function registerHandler(e) {
		e.preventDefault();

		setStatus('loading');

		const registerReq = await fetch('/api/auth/register', {
			method: 'POST',
			body: JSON.stringify(fields),
			headers: {
				'Content-Type': 'application/json',
			},
		});

		if (!registerReq.ok) return setStatus('error ' + registerReq.status);

		const registerRes = await registerReq.json();

		setStatus('success');
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
							<h2>Register Form</h2>

							<form onSubmit={registerHandler.bind(this)}>
								<div class="input-box">
									<span class="icon">
										<ion-icon name="mail"></ion-icon>
									</span>
									<input name="email" onChange={fieldHandler.bind(this)} type="text" autocomplete="off" required />
									<label>
										<i class="input-icon uil uil-at">Email</i>
									</label>
								</div>

								<div className="input-box">
									<span className="icon">
										<ion-icon name="lock-closed"></ion-icon>
									</span>
									<input name="password" onChange={fieldHandler.bind(this)} type="password" autocomplete="off" required />
									<label>
										<i class="input-icon uil uil-lock-alt">Password</i>
									</label>
								</div>

								<button className="btn-register" type="submit">Register</button>

								<div class="register-link">
									<p>
										Already have an account? &nbsp;
										<Link href="/auth/login">
											<a>LogIn</a>
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
