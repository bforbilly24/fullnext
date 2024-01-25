import { authPage } from '../../middlewares/authorizationPage';

export async function getServerSideProps(ctx) {
	const { token } = await authPage(ctx);

	const postReq = await fetch('http://localhost:3000/api/posts', {
		headers: {
			Authorization: 'Bearer ' + token,
		},
	});

	const posts = await postReq.json();

	console.log(posts);

	return { props: {} };
}

export default function PostIndex() {
	return (
		<div>
			<h1>Posts</h1>
		</div>
	);
}
