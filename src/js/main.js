import * as bootstrap from 'bootstrap';

// Added bootstraps login modal
$('#login-modal').on('shown.bs.modal', function () {
  $('#myInput').trigger('focus');
});

// ACCOUNTS DATA

const account1 = {
  owner: Henrietta,
  username: 'hh',
  password: 1111,
};

const account2 = {
  owner: Daniel,
  username: 'dd',
  password: 2222,
};

const account3 = {
  owner: 'Leia',
  username: 'll',
  password: 3333,
};
const accounts = [account1, account2, account3];

// COMMENTS DATA
const post = {
  title: 'Best space movie or documentary?',
  content:
    'In terms of fiction that i think tries to have decent science I really enjoyed The Martian and Interstellar',
};

const comments = [
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
    ],
  },
];
