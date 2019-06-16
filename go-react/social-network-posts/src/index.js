import React, { Component, Fragment } from 'react';
import { render } from 'react-dom';
import Header from './Header';
import Post from './Post';
import './style.scss';

class App extends Component {
  state = {
    posts: [
      {
        id: 1,
        time: 'há 5 min',
        avatar: 'https://loremflickr.com/g/60/60/bird?lock=1',
        name: 'Ribrianne DBZ',
        content:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut tempus condimentum sodales. Fusce non justo eu sem volutpat porta nec eget est. Aliquam tempor ex lacus, eget vulputate elit condimentum id. Donec facilisis ullamcorper dictum. Sed sapien neque, suscipit eu odio nec, sagittis maximus odio. Vivamus felis risus, posuere vitae est interdum, rutrum facilisis ipsum. Donec sollicitudin velit et sem euismod, ac placerat enim pretium. Donec rutrum sollicitudin sem, eu volutpat ex scelerisque ut. Curabitur eget pellentesque eros. Aliquam sed efficitur ipsum. Etiam sit amet scelerisque sem. Phasellus vel est quam. Quisque maximus eros turpis. Sed ac sodales velit, suscipit ullamcorper purus.',
      },
      {
        id: 2,
        time: 'há 10 min',
        avatar: 'https://loremflickr.com/g/60/60/cat?lock=1',
        name: 'Vegetta DBZ',
        content: 'É mais de 8000!',
      },
      {
        id: 3,
        time: 'há 1h',
        avatar: 'https://loremflickr.com/g/60/60/dog?lock=1',
        name: 'Goku DBZ',
        content: 'To com fome :P',
      },
    ],
  };

  render() {
    const { posts } = this.state;
    return (
      <Fragment>
        <Header />
        <div className="posts">
          {posts && posts.map(post => <Post key={post.id} data={post} />)}
        </div>
      </Fragment>
    );
  }
}

render(<App />, document.getElementById('app'));
