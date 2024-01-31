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

	return {
		props: {
			posts: posts.data,
		},
	};
}

export default function PostIndex(props) {
	function deleteHandler(e) {
        e.preventDefault();

        const ask = confirm('Apakah data ini akan dihapus?');

        if(ask) return console.log('Delete');
    }
    
    return (
		<div>
			<h1>Posts</h1>

			{ props.posts.map((post) => (
				<div key={post.id}>
					<h3>{ post.title }</h3>
                    <p>{ post.content }</p>

                    <div>
                        <button>Edit</button>
                        <button onClick={deleteHandler.bind(this)}>Delete</button>
                    </div>

                    <hr/>
				</div>
			))}
		</div>
	);
}
