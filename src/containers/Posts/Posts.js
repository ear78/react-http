import React from 'react';
import axios from 'axios';

import Post from '../../components/Post/Post';
import './Posts.css';

class Posts extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            posts: []
        }
    }

    postSelectedHandler = (id) => {
        this.setState({
            selectedPostId: id
        })
    }

    //using component didmount method for fetching
    componentDidMount(){
        console.log(this.props);
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
            console.log(error);
            // this.setState({error: true})
        })
    }

    render(){
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
            <section className="Posts">
                {posts}
            </section>
        )
    }
}

export default Posts;
