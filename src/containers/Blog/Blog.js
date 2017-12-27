import React, { Component } from 'react';
import axios from 'axios';
import { Route, NavLink, Switch, Redirect } from 'react-router-dom';

import './Blog.css';
import Posts from '../Posts/Posts';
import NewPost from '../NewPost/NewPost';
import FullPost from '../FullPost/FullPost';

class Blog extends Component {

    render () {
        return (
            <div className="Blog">
                <header>
                    <nav>
                        <ul>
                            <li><NavLink to="/posts" exact>Home</NavLink></li>
                            {/* or use NavLink as js object notation. you can also build a relative path like so, <NavLink to={props.match.url + '/new'}>  will lead to example.com/posts/new*/}
                            <li><NavLink to={{
                                    pathname: '/new-post',
                                    hash: '#submit',
                                    search: '?quick-submit=true'
                                }}>New Post</NavLink></li>
                        </ul>
                    </nav>
                </header>
                {/* use exact for exact matched route and component routing. use Switch to match first route instead of loading all 3 routes below, switch will do the router work for you*/}
                <Switch>
                    <Route path="/posts" exact component={Posts} />
                    <Route path="/new-post" component={NewPost} />
                    <Route path="/:id" exact component={FullPost} />
                    {/*404 error catchall redirect. use render or component to show 404 page/component */}
                    <Route render={()=> <h1>Not Found</h1>} />
                    {/*<Redirect from="/" to="/posts" />*/}
                </Switch>


                {/*<Posts />*/}
            </div>
        );
    }
}

export default Blog;
