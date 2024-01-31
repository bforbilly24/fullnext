import React, { useState } from "react";
import { authPage } from "../../../middlewares/authorizationPage";
import Router from "next/router";

export async function getServerSideProps(ctx) {
	const { token } = await authPage(ctx);

    return {
        props: {
            token
        }
    }
}

export default function PostCreate(props) {
    const [ fields, setFields ] = useState({
        title: '',
        content: ''
    });

    const [ status, setStatus ] = useState('normal');

    async function updateHandler(e) {
        e.preventDefault();

        setStatus('loading');

        const { token } = props;

        const update = await fetch('/api/posts/update', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify(fields)
        });

        if(!update.ok) return setStatus('error');

        const res = await update.json();

        setStatus('success');

        Router.push('/posts');
    }

    function fieldHandler(e) {
        const name =  e.target.getAttribute('name');
        
        setFields({
            ...fields,
            [name]: e.target.value
        });
    }
    
    return(
        <div>
            <h1>Edit a Post</h1>

            <form onSubmit={updateHandler.bind(this)}>
                <input 
                    onChange={fieldHandler.bind(this)}
                    type="text" 
                    placeholder="Title" 
                    name="title" 
                />
                <br />
                <textarea 
                    onChange={fieldHandler.bind(this)}
                    type="text" 
                    placeholder="Content" 
                    name="content" 
                ></textarea>
                <br />

                <button type="submit">
                    Create Post
                </button>

                <div>
                    status: {status}
                </div>
            </form>
        </div>
    )
}