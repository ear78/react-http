import React, { Component } from 'react';
import axios from 'axios';

import './Blog.css';

class Blog extends Component {
    constructor(props){
        super(props);
        this.state = {
            posts: [],
            selectedPostId: null,
            error: false
        }
    }
    //using component didmount method for fetching
    componentDidMount(){
        axios.get('/posts').then((response) => {
            const posts = response.data.slice(0,4);
            const updatedPosts = posts.map(post=> {
                return {
                    ...post,
                    author: 'Elliot'
                }
            })
            this.setState({
                posts: updatedPosts
            })
            // console.log(response.data)
        }).catch(error => {
            // console.log(error);
            this.setState({error: true})
        })
    }

    postSelectedHandler = (id) => {
        this.setState({
            selectedPostId: id
        })
    }

    render () {
        let posts = <p style={{textAlign: 'center'}}>Something Went Wrong!</p>
        //condition if error occurs or not
        if(!this.state.error){
            //iterating over posts to repeat
            posts = this.state.posts.map(post => {
                return <Post
                        key={post.id}
                        author={post.author}
                        title={post.title}
                        clicked={() => this.postSelectedHandler(post.id)}/>
            })
        }

        return (
            <div className="Blog">
                <header>
                    <nav>
                        <ul>
                            <li><a href="/">Home</a></li>
                            <li><a href="/new-post">New Post</a></li>
                        </ul>
                    </nav>
                </header>
                <section className="Posts">
                    {posts}
                </section>
            
            </div>
        );
    }
}

export default Blog;
