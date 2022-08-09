import * as bootstrap from 'bootstrap';
import moment from 'moment';

// ACCOUNTS DATA

const account1 = {
  owner: 'Henrietta',
  username: 'hh',
  password: 1111,
};

const account2 = {
  owner: 'Daniel',
  username: 'dd',
  password: 2222,
};

const account3 = {
  owner: 'Leia',
  username: 'll',
  password: 3333,
};

const accounts = [account1, account2, account3];

// ELEMENTS
const messageWelcome = document.querySelector('.nav-welcome-message');
const loginForm = document.querySelector('.login-form');
const inputUsername = document.querySelector('.input-username');
const inputPassword = document.querySelector('.input-password');
// LOGIN FUNCTION
let currentAccount = 0;
let loggedIn = false;

const displayMessage = function () {
  messageWelcome.textContent = `Hello, ${currentAccount.owner}!`;
  messageWelcome.classList.add('visible');
};

const loginFunction = function (e) {
  e.preventDefault();
  currentAccount = accounts.find((acc) => acc.username === inputUsername.value);

  console.log(currentAccount);
  if (currentAccount.password === +inputPassword.value) {
    displayMessage();
    loggedIn = true;
    new postView();
    new CommentsView();
  } else {
    alert('Wrong password or username. Try again!');
  }
};

loginForm.addEventListener('submit', loginFunction);

class View {
  _post = {
    title: 'Best space movie or documentary?',
    content:
      'In terms of fiction that i think tries to have decent science I really enjoyed The Martian and Interstellar',
    likes: 45,
    author: account3.owner,
    likedByCurrentAccount: false,
  };

  _comments = [
    {
      author: account1.owner,
      submitted: moment('2022-07-30'),
      content: `If you're interested in real life based movies I'd recommend The Right Stuff or Apollo 13. In terms of fiction there's Interstellar of course and I also liked the show Lost in Space.`,
      replies: [],
      likes: 2,
    },
    {
      author: account2.owner,
      submitted: moment('2022-07-29'),
      content: `Sunshine just eeks out my #1 spot over Interstellar. Two films that reward a good sound system and a large screen more than almost anything else.
  
      For a documentary, the recent Apollo 11 doc was similarly awe-inspiring. I was fortunate to see it in the theater and it was quite an experience immersing into all of that high def 1960s footage.`,
      likes: 32,
      replies: [
        {
          author: account1.owner,
          submitted: moment('2022-07-30'),
          content: `Sunshine could have been so good, I just cannot understand why they had to bring that alienish aspect in to it, it would have been better without.
  
        If nothing else, just make the survivor a human instead of whatever supernatural it was supposed to be..`,
          likes: 23,
        },
        {
          author: account3.owner,
          submitted: moment('2022-07-30'),
          content: `Aw man, no! Sunshine was the spiritual sequel to Event Horizon. If you've not seen Event Horizon, 1. you're living wrong and 2. Sunshine becomes a lot more enjoyable if you know the pedigree.`,
          likes: 8,
        },
      ],
    },
  ];
  constructor() {}
  clear(parentEl) {
    parentEl.innerHTML = '';
  }

  render(parentEl, markup) {
    parentEl.insertAdjacentHTML('beforeend', markup);
  }
}

class postView extends View {
  _parentEl = document.querySelector('.post');
  constructor() {
    super();
    this.clear(this._parentEl);
    this._generateMarkup();
    document
      .querySelector('.post-like-btn')
      .addEventListener('click', this._like.bind(this));
  }
  // DISPLAYING THE POST
  _generateMarkup() {
    const markup = `
    <h2 class="post-title mb-4">${this._post.title}</h2>
    <p class="post-content mb-4">
       ${this._post.content}
    </p>
    <p class="post-author text-muted mb-4">${this._post.author}</p>
   <div class="row align-items-center">
     <a
       class="col-auto btn-sm btn btn-light d-flex align-items-center"
       type="button"
       href="#comments"
     >
       <svg
         xmlns="http://www.w3.org/2000/svg"
         width="20"
         height="20"
         fill="currentColor"
         class="bi bi-chat-left-dots me-2"
         viewBox="0 0 16 16"
       >
         <path
           d="M14 1a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H4.414A2 2 0 0 0 3 11.586l-2 2V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12.793a.5.5 0 0 0 .854.353l2.853-2.853A1 1 0 0 1 4.414 12H14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"
        />
        <path
          d="M5 6a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm4 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm4 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"
        />
      </svg>
      <p class="comments-number m-0">${this._comments.length} comments</p>
    </a>
    <a
      class="col-auto btn btn-sm btn-light d-flex align-items-center post-like-btn"
       type="button"
       href="#"
    >
       <svg
         xmlns="http://www.w3.org/2000/svg"          width="20"
         height="20"
         fill="currentColor"
         class="bi bi-heart me-2 like-svg"
         viewBox="0 0 16 16"
       >          <path            d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"
         />
       </svg>
      <p class="likes align-self-center m-0 post-likes">${this._post.likes} likes</p>
     </a>
    `;
    this.render(this._parentEl, markup);
  }
  // LIKE FUNCTION
  _like(e) {
    if (loggedIn === false) {
      alert('Log in first!');
      return;
    }
    const heart = document.querySelector('.like-svg');
    const likes = document.querySelector('.post-likes');

    if (this._post.likedByCurrentAccount === false) {
      this._post.likes++;
      this._post.likedByCurrentAccount = true;
      likes.textContent = `${this._post.likes} likes`;
      heart.classList.add('liked');
    } else {
      this._post.likes--;
      this._post.likedByCurrentAccount = false;
      likes.textContent = `${this._post.likes} likes`;
      heart.classList.remove('liked');
    }
  }
}

class CommentsView extends View {
  _parentEl = document.querySelector('.comment-section');
  _commentFormEl = document.querySelector('.btn-submit');
  constructor() {
    super();
    // Clearing the parent element
    this.clear(this._parentEl);
    // Displaying comments
    this._displayComments();
    // Add handlers
    this._addHandlers();
  }
  _addHandlers() {
    if (loggedIn === false) return;
    this._commentFormEl.addEventListener(
      'click',
      this._submitComment.bind(this)
    );
  }
  _displayComments() {
    this._comments.forEach((comment) => {
      const repliesArr = [];
      comment.replies.forEach((reply) => {
        repliesArr.push(this._generateMarkupReply(reply));
      });
      const replies = repliesArr.join('');
      this._generateMarkupComment(comment, replies);
    });
  }
  _generateMarkupReply(reply) {
    const markup = `
    <div class="reply mb-4 col-1 d-flex flex-column align-items-center border-start border-3">
                <button class="btn btn-light btn-sm">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-plus"
                    viewBox="0 0 16 16"
                  >
                    <path
                      d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"
                    />
                  </svg>
                </button>
                <p class="comment-likes m-0 text-center">${reply.likes}</p>
                <button class="btn btn-light btn-sm">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-dash"
                    viewBox="0 0 16 16"
                  >
                    <path
                      d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z"
                    />
                  </svg>
                </button>
              </div>
  
              <div class="col-11">
                <div class="d-flex justify-content-between">
                  <div class="d-flex">
                    <p class="comment-author me-2">${reply.author}</p>
                    <p class="comment-date fw-light">${reply.submitted.fromNow()}</p>
                  </div>
                  <div class="button-container d-flex align-items-center">
                  ${
                    reply.author === currentAccount.owner
                      ? `<button class="btn btn-sm btn-outline-danger d-flex align-items-center me-2">
                  <svg
                    class="me-1"
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-reply"
                    viewBox="0 0 16 16"
                  >
                  <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z"/>
                  </svg>
                  <p class="m-0">Delete</p>
                </button>`
                      : ``
                  }
                    
                    <button class="btn btn-sm btn-light d-flex align-items-center">
                      <svg
                        class="me-1"
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        class="bi bi-reply"
                        viewBox="0 0 16 16"
                      >
                        <path
                          d="M6.598 5.013a.144.144 0 0 1 .202.134V6.3a.5.5 0 0 0 .5.5c.667 0 2.013.005 3.3.822.984.624 1.99 1.76 2.595 3.876-1.02-.983-2.185-1.516-3.205-1.799a8.74 8.74 0 0 0-1.921-.306 7.404 7.404 0 0 0-.798.008h-.013l-.005.001h-.001L7.3 9.9l-.05-.498a.5.5 0 0 0-.45.498v1.153c0 .108-.11.176-.202.134L2.614 8.254a.503.503 0 0 0-.042-.028.147.147 0 0 1 0-.252.499.499 0 0 0 .042-.028l3.984-2.933zM7.8 10.386c.068 0 .143.003.223.006.434.02 1.034.086 1.7.271 1.326.368 2.896 1.202 3.94 3.08a.5.5 0 0 0 .933-.305c-.464-3.71-1.886-5.662-3.46-6.66-1.245-.79-2.527-.942-3.336-.971v-.66a1.144 1.144 0 0 0-1.767-.96l-3.994 2.94a1.147 1.147 0 0 0 0 1.946l3.994 2.94a1.144 1.144 0 0 0 1.767-.96v-.667z"
                        />
                      </svg>
                      <p class="m-0">Reply</p>
                    </button>
                    
                  </div>
                  
                </div>
                <div class="comment-text">
                  ${reply.content}
                </div>
              </div>
    `;
    return markup;
  }
  _generateMarkupComment(comment, replies) {
    const markup = `
<div class="comment-cont mb-4">     
  <div class=" row">
    <div class="comment col-auto me-2 d-flex flex-column align-items-center">
      <button class="btn btn-light btn-sm">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          class="bi bi-plus"
          viewBox="0 0 16 16"
        >
          <path
            d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"
          />
        </svg>
      </button>
      <p class="comment-likes m-0 text-center">${comment.likes}</p>
      <button class="btn btn-light btn-sm">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          class="bi bi-dash"
          viewBox="0 0 16 16"
        >
          <path
            d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z"
          />
        </svg>
      </button>
    </div>

    <div class="col-11">
      <div class="d-flex justify-content-between">
        <div class="d-flex">
          <p class="comment-author me-2">${comment.author}</p>
          <p class="comment-date fw-light">${comment.submitted.fromNow()}</p>
        </div>
        <div class="button-container d-flex align-items-center">
        ${
          currentAccount.owner === comment.author
            ? `<button class="btn btn-sm btn-outline-danger d-flex align-items-center me-2">
        <svg
           class="me-1"
           xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          class="bi bi-reply"
          viewBox="0 0 16 16"
        >
        <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z"/>
        </svg>
        <p class="m-0">Delete</p>
      </button>`
            : ``
        }
          
           <button class="btn btn-sm btn-light d-flex align-items-center">
             <svg
               class="me-1"
               xmlns="http://www.w3.org/2000/svg"
               width="16"
               height="16"
               fill="currentColor"
               class="bi bi-reply"
               viewBox="0 0 16 16"
             >
               <path
                 d="M6.598 5.013a.144.144 0 0 1 .202.134V6.3a.5.5 0 0 0 .5.5c.667 0 2.013.005 3.3.822.984.624 1.99 1.76 2.595 3.876-1.02-.983-2.185-1.516-3.205-1.799a8.74 8.74 0 0 0-1.921-.306 7.404 7.404 0 0 0-.798.008h-.013l-.005.001h-.001L7.3 9.9l-.05-.498a.5.5 0 0 0-.45.498v1.153c0 .108-.11.176-.202.134L2.614 8.254a.503.503 0 0 0-.042-.028.147.147 0 0 1 0-.252.499.499 0 0 0 .042-.028l3.984-2.933zM7.8 10.386c.068 0 .143.003.223.006.434.02 1.034.086 1.7.271 1.326.368 2.896 1.202 3.94 3.08a.5.5 0 0 0 .933-.305c-.464-3.71-1.886-5.662-3.46-6.66-1.245-.79-2.527-.942-3.336-.971v-.66a1.144 1.144 0 0 0-1.767-.96l-3.994 2.94a1.147 1.147 0 0 0 0 1.946l3.994 2.94a1.144 1.144 0 0 0 1.767-.96v-.667z"
               />
                    </svg>
            <p class="m-0">Reply</p>
           </button>
                  
         </div>
       </div>
      <div class="comment-text">
      ${comment.content}
      </div>
    </div>
    ${
      comment.replies.length > 0
        ? `<div class="comment-replies ps-5">
        <div class="mt-3 ms-5 py-2 row ">
    ${replies}
    
    </div>
    </div>`
        : ``
    }
    
    `;
    this.render(this._parentEl, markup);
  }
  _generateCommentObject(comment) {
    return {
      author: currentAccount.owner,
      submitted: moment(),
      content: comment,
      replies: [],
      likes: 0,
    };
  }
  _submitComment(e) {
    e.preventDefault();

    if (loggedIn === false) {
      alert('You must log in first');
      return;
    }
    const commentValue = document.querySelector('.comment-value').value;
    console.log(commentValue);
    const commentObject = this._generateCommentObject(commentValue);
    this._generateMarkupComment(commentObject);
  }
}
new postView();
new CommentsView();
