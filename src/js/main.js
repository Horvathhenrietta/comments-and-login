import * as bootstrap from 'bootstrap';

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
  } else {
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
      owner: account1,
      submitted: new Date('2022-07-30'),
      content: `If you're interrested in real life based movies I'd recommend The Right Stuff or Apollo 13. In terms of fiction there's Interstellar of course and I also liked the show Lost in Space.`,
      replies: 0,
    },
    {
      owner: account2,
      submitted: new Date('2022-08-30'),
      content: `Sunshine just eeks out my #1 spot over Interstellar. Two films that reward a good sound system and a large screen more than almost anything else.
  
      For a documentary, the recent Apollo 11 doc was similarly awe-inspiring. I was fortunate to see it in the theater and it was quite an experience immersing into all of that high def 1960s footage.`,
      replies: [
        {
          owner: account1,
          submitted: new Date('2022-08-30'),
          content: `Sunshine could have been so good, I just cannot understand why they had to bring that alienish aspect in to it, it would have been better without.
  
        If nothing else, just make the survivor a human instead of whatever supernatural it was supposed to be..`,
        },
        {
          owner: account3,
          submitted: new Date('2022-08-30'),
          content: `Aw man, no! Sunshine was the spiritual sequel to Event Horizon. If you've not seen Event Horizon, 1. you're living wrong and 2. Sunshine becomes a lot more enjoyable if you know the pedigree.`,
        },
      ],
    },
  ];
  constructor() {}
  clear(parentEl) {
    parentEl.innerHTML = '';
  }

  render(parentEl, markup) {
    parentEl.insertAdjacentHTML('afterbegin', markup);
  }
}

class postView extends View {
  _parentEl = document.querySelector('.post');
  markup = this._generateMarkup();
  constructor() {
    super();
    this.clear(this._parentEl);
    this.render(this._parentEl, this.markup);
    document
      .querySelector('.post-like-btn')
      .addEventListener('click', this._like.bind(this));
  }
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
    return markup;
  }
  _like(e) {
    const heart = document.querySelector('.like-svg');
    const likes = document.querySelector('.post-likes');
    heart.classList.toggle('liked');

    if (this._post.likedByCurrentAccount === false) {
      this._post.likes++;
      this._post.likedByCurrentAccount = true;
      likes.textContent = `${this._post.likes} likes`;
    } else {
      this._post.likes--;
      this._post.likedByCurrentAccount = false;
      likes.textContent = `${this._post.likes} likes`;
    }
  }
}

new postView();
