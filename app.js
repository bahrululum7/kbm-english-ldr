// ====================================================
//  Firebase Initialization
// ====================================================
import { initializeApp } from 'https://www.gstatic.com/firebasejs/12.6.0/firebase-app.js';
import { getAuth, signOut, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/12.6.0/firebase-auth.js';
import { getFirestore, doc, getDoc, setDoc } from 'https://www.gstatic.com/firebasejs/12.6.0/firebase-firestore.js';

const firebaseConfig = {
  apiKey: 'AIzaSyARsav9m6Xv9H-XPPKnX8DNFwhZesRxQqE',
  authDomain: 'elearning-english.firebaseapp.com',
  projectId: 'elearning-english',
  storageBucket: 'elearning-english.appspot.com',
  messagingSenderId: '307108036106',
  appId: '1:307108036106:web:5c8a2b0bbdc7a084f7e9f3',
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// ====================================================
//  GLOBAL STATE
// ====================================================
let currentUser = null;
let quizStatus = {
  meeting1: false,
  meeting2: false,
};

// ====================================================
//  AUTH CHECK (SATU KALI)
// ====================================================
onAuthStateChanged(auth, async (user) => {
  if (!user) {
    window.location.href = 'login.html';
    return;
  }

  currentUser = user;

  const emailID = user.email.toLowerCase().replace(/\./g, '_');
  const snap = await getDoc(doc(db, 'quizStatus', emailID));

  if (snap.exists()) {
    const data = snap.data();
    quizStatus.meeting1 = data.meeting1?.done || false;
    quizStatus.meeting2 = data.meeting2?.done || false;
  }

  loadModule('week1');
  startInactivityChecker();
});

// ====================================================
//  Logout
// ====================================================
function logout() {
  signOut(auth).then(() => {
    window.location.href = 'login.html';
  });
}
window.logout = logout;

// ====================================================
//  MODULE DATA
// ====================================================
const modules = {
  week1: {
    title: 'Week 1 – Basic Survival English',
    meetings: {
      meeting1: {
        title: 'Meeting 1: Pronouns & Simple Present',
        content: `
<div class="module-box">
  <h3>Materi</h3>
  <ul>
    <li>Pronouns (I, You, He, She, They)</li>
    <li>Simple Present Tense</li>
  </ul>
</div>

<div class="module-box">
  <button onclick="toggleContent('pdf1')" class="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg flex justify-between">
    📄 Modul Day 1 (PDF)
    <span id="icon-pdf1">▼</span>
  </button>

  <div id="pdf1" class="hidden mt-2 p-3 border rounded bg-green-50 text-center">
    <a href="Pronouns.pdf" download class="text-green-700 font-semibold">⬇ Download Pronouns.pdf</a>
  </div>
</div>

<div class="module-box">
  <button onclick="toggleContent('quiz1')" class="w-full bg-purple-500 hover:bg-purple-600 text-white font-semibold py-2 px-4 rounded-lg flex justify-between">
    🎧 Latihan Listening – Pronouns
    <span id="icon-quiz1">▼</span>
  </button>

  <div id="quiz1" class="hidden mt-2 p-3 border rounded bg-purple-50">
    <ol id="listening-questions" class="space-y-3">
      <li>“This is Andi. ____ is my brother.”<br>
        <input type="radio" name="q1" value="He"> He
        <input type="radio" name="q1" value="Him"> Him
      </li>

      <li>“My mother helps ____.”<br>
        <input type="radio" name="q2" value="me"> me
        <input type="radio" name="q2" value="she"> she
      </li>

      <li>“This is Sinta. ____ is my friend.”<br>
        <input type="radio" name="q3" value="She"> She
        <input type="radio" name="q3" value="Her"> Her
      </li>

      <li>“I call Rudi every day. I call ____.”<br>
        <input type="radio" name="q4" value="him"> him
        <input type="radio" name="q4" value="he"> he
      </li>

      <li>“The teacher gives Lala a book. She gives ____ a book.”<br>
        <input type="radio" name="q5" value="her"> her
        <input type="radio" name="q5" value="she"> she
      </li>

      <li>“Alya and Sinta are here. I meet ____.”<br>
        <input type="radio" name="q6" value="them"> them
        <input type="radio" name="q6" value="they"> they
      </li>

      <li>“Rudi and Andi are brothers. ____ live here.”<br>
        <input type="radio" name="q7" value="They"> They
        <input type="radio" name="q7" value="Them"> Them
      </li>

      <li>“Please give this book to Budi. Give ____ the book.”<br>
        <input type="radio" name="q8" value="him"> him
        <input type="radio" name="q8" value="he"> he
      </li>

      <li>“This pen is new. I like ____.”<br>
        <input type="radio" name="q9" value="it"> it
        <input type="radio" name="q9" value="they"> they
      </li>

      <li>“Lina and Rani need help. Help ____.”<br>
        <input type="radio" name="q10" value="them"> them
        <input type="radio" name="q10" value="her"> her
      </li>
    </ol>

    <div class="mt-4 text-center">
      <button onclick="checkAnswers()" class="bg-blue-500 text-white font-bold py-2 px-6 rounded">
        Cek Jawaban
      </button>
    </div>

    <p id="result" class="mt-3 text-center font-semibold"></p>
  </div>
</div>
        `,
      },
      meeting2: {
        title: 'Meeting 2: Simple Past Tense',
        content: `
<div class="module-box">
  <h3>Materi</h3>
  <ul>
    <li>Simple Past Tense</li>
    <li>Regular Verbs (played, studied, worked)</li>
    <li>Irregular Verbs (went, ate, saw)</li>
    <li>Time Expressions (yesterday, last night, last week)</li>
  </ul>
</div>

<!-- ================= GOOGLE MEET ================= -->
<div class="module-box">
  <a href="https://meet.google.com/dwe-hqmx-wdo" target="_blank"
     class="block text-center w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg">
    🎥 Join Google Meet – Meeting 2
  </a>
</div>

<!-- ================= PDF MODULE ================= -->
<div class="module-box">
  <button onclick="toggleContent('pdf2')" class="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg flex justify-between">
    📄 Modul Day 2 – Simple Past Tense (PDF)
    <span id="icon-pdf2">▼</span>
  </button>

  <div id="pdf2" class="hidden mt-2 p-3 border rounded bg-green-50 text-center">
    <a href="Simple-Past-Tense.pdf" download class="text-green-700 font-semibold">
      ⬇ Download Simple-Past-Tense.pdf
    </a>
  </div>
</div>

<!-- ================= QUIZ ================= -->
<div class="module-box">
  <button onclick="toggleContent('quiz2')" class="w-full bg-purple-500 hover:bg-purple-600 text-white font-semibold py-2 px-4 rounded-lg flex justify-between">
    ✍️ Latihan – Simple Past Tense
    <span id="icon-quiz2">▼</span>
  </button>

  <div id="quiz2" class="hidden mt-2 p-3 border rounded bg-purple-50">
    <ol class="space-y-4">

  <li>
    “___”<br>
    <input type="radio" name="q1" value="A"> Plays football<br>
    <input type="radio" name="q1" value="B"> Played football<br>
    <input type="radio" name="q1" value="C"> Will play football<br>
    <input type="radio" name="q1" value="D"> Is playing football
  </li>

  <li>
    “___”<br>
    <input type="radio" name="q2" value="A"> Today<br>
    <input type="radio" name="q2" value="B"> Every night<br>
    <input type="radio" name="q2" value="C"> Last night<br>
    <input type="radio" name="q2" value="D"> Tomorrow
  </li>

  <li>
    “___”<br>
    <input type="radio" name="q3" value="A"> Jakarta<br>
    <input type="radio" name="q3" value="B"> Bandung<br>
    <input type="radio" name="q3" value="C"> School<br>
    <input type="radio" name="q3" value="D"> Home
  </li>

  <li>
    “___”<br>
    <input type="radio" name="q4" value="A"> Rice<br>
    <input type="radio" name="q4" value="B"> Bread<br>
    <input type="radio" name="q4" value="C"> Noodles<br>
    <input type="radio" name="q4" value="D"> Chicken
  </li>

  <li>
    “___”<br>
    <input type="radio" name="q5" value="A"> work<br>
    <input type="radio" name="q5" value="B"> works<br>
    <input type="radio" name="q5" value="C"> worked<br>
    <input type="radio" name="q5" value="D"> working
  </li>

  <li>
    “___”<br>
    <input type="radio" name="q6" value="A"> Watched a movie<br>
    <input type="radio" name="q6" value="B"> Played a game<br>
    <input type="radio" name="q6" value="C"> Studied English<br>
    <input type="radio" name="q6" value="D"> Went to school
  </li>

  <li>
    “___”<br>
    <input type="radio" name="q7" value="A"> At school<br>
    <input type="radio" name="q7" value="B"> At home<br>
    <input type="radio" name="q7" value="C"> At the library<br>
    <input type="radio" name="q7" value="D"> At campus
  </li>

  <li>
    “___”<br>
    <input type="radio" name="q8" value="A"> market<br>
    <input type="radio" name="q8" value="B"> morning<br>
    <input type="radio" name="q8" value="C"> went<br>
    <input type="radio" name="q8" value="D"> yesterday
  </li>

  <li>
    “___”<br>
    <input type="radio" name="q9" value="A"> yesterday<br>
    <input type="radio" name="q9" value="B"> tomorrow<br>
    <input type="radio" name="q9" value="C"> last night<br>
    <input type="radio" name="q9" value="D"> every night
  </li>

  <li>
    “___”<br>
    <input type="radio" name="q10" value="A"> One<br>
    <input type="radio" name="q10" value="B"> Two<br>
    <input type="radio" name="q10" value="C"> Three<br>
    <input type="radio" name="q10" value="D"> Four
  </li>

</ol>


    <div class="mt-4 text-center">
      <button onclick="checkAnswersMeeting2()" class="bg-blue-500 text-white font-bold py-2 px-6 rounded">
        Cek Jawaban
      </button>
    </div>

    <p id="result2" class="mt-3 text-center font-semibold"></p>
  </div>
</div>
  `,
      },
      meeting3: {
        title: 'Meeting 3: Daily Vocabulary',
        content: `
          <div class="module-box">
            <h3>Materi</h3>
            <ul>
              <li>Daily Activities</li>
              <li>Common Verbs</li>
              <li>Speaking Practice</li>
            </ul>
          </div>
        `,
      },
    },
  },
};

// ====================================================
//  RENDER MODULE
// ====================================================
function loadModule(weekKey) {
  const week = modules[weekKey];
  document.getElementById('module-title').innerText = week.title;

  let html = '';
  for (const key in week.meetings) {
    const m = week.meetings[key];
    html += `
      <div class="module-box">
        <button onclick="toggleMeeting('${key}')" class="w-full bg-blue-600 text-white py-3 px-4 rounded flex justify-between">
          📘 ${m.title}
          <span id="icon-${key}">▼</span>
        </button>
        <div id="${key}" class="hidden mt-3">${m.content}</div>
      </div>
    `;
  }

  document.getElementById('module-content').innerHTML = html;
}
window.loadModule = loadModule;

// ====================================================
//  TOGGLE
// ====================================================
function toggleMeeting(id) {
  const el = document.getElementById(id);
  const icon = document.getElementById('icon-' + id);
  el.classList.toggle('hidden');
  icon.innerText = el.classList.contains('hidden') ? '▼' : '▲';
}
window.toggleMeeting = toggleMeeting;

function toggleContent(id) {
  const el = document.getElementById(id);
  const icon = document.getElementById('icon-' + id);

  el.classList.toggle('hidden');
  icon.innerText = el.classList.contains('hidden') ? '▼' : '▲';

  // 🔒 LOCK QUIZ MEETING 1
  if (id === 'quiz1' && quizStatus.meeting1) {
    setTimeout(lockMeeting1, 100);
  }

  // 🔒 LOCK QUIZ MEETING 2
  if (id === 'quiz2' && quizStatus.meeting2) {
    setTimeout(lockMeeting2, 100);
  }
}
window.toggleContent = toggleContent;

// ====================================================
//  QUIZ MEETING 1 (FIX TOTAL)
// ====================================================
async function checkAnswers() {
  if (quizStatus.meeting1) return;

  const correct = {
    q1: 'He',
    q2: 'me',
    q3: 'She',
    q4: 'him',
    q5: 'her',
    q6: 'them',
    q7: 'They',
    q8: 'him',
    q9: 'it',
    q10: 'them',
  };

  let score = 0;
  for (const q in correct) {
    const selected = document.querySelector(`input[name="${q}"]:checked`);
    if (selected && selected.value === correct[q]) score++;
  }

  const emailID = currentUser.email.toLowerCase().replace(/\./g, '_');

  await setDoc(
    doc(db, 'quizStatus', emailID),
    {
      email: currentUser.email,
      meeting1: { done: true, score },
      timestamp: Date.now(),
    },
    { merge: true }
  );

  quizStatus.meeting1 = true;
  lockMeeting1();

  document.getElementById('result').innerHTML = `<b>Nilai Kamu:</b> ${score}/10<br><span style="color:green">✔ Disimpan</span>`;
}
window.checkAnswers = checkAnswers;

// ====================================================
//  LOCK MEETING 1
// ====================================================
function lockMeeting1() {
  const area = document.getElementById('listening-questions');
  if (!area) return;

  area.style.opacity = '0.5';
  area.style.pointerEvents = 'none';
  area.querySelectorAll('input').forEach((i) => (i.disabled = true));

  document.getElementById('result').innerHTML = '<b>Latihan ini sudah dikerjakan. Tidak bisa diulang.</b>';
}

// ====================================================
//  QUIZ MEETING 2 (FIX TOTAL)
// ====================================================
async function checkAnswersMeeting2() {
  if (quizStatus.meeting2) return;

  const correct = {
    q11: 'went',
    q12: 'watched',
    q13: 'ate',
    q14: 'studied',
    q15: 'played',
  };

  let score = 0;

  for (const q in correct) {
    const options = document.querySelectorAll(`input[name="${q}"]`);
    options.forEach((opt) => {
      if (opt.value === correct[q]) opt.parentElement.style.color = 'green';
      if (opt.checked && opt.value !== correct[q]) opt.parentElement.style.color = 'red';
      opt.disabled = true;
    });

    const selected = document.querySelector(`input[name="${q}"]:checked`);
    if (selected && selected.value === correct[q]) score++;
  }

  const emailID = currentUser.email.toLowerCase().replace(/\./g, '_');

  await setDoc(
    doc(db, 'quizStatus', emailID),
    {
      email: currentUser.email,
      meeting2: { done: true, score },
      timestamp: Date.now(),
    },
    { merge: true }
  );

  quizStatus.meeting2 = true;

  document.getElementById('result2').innerHTML = `<b>Nilai Kamu:</b> ${score}/5<br><span style="color:green">✔ Disimpan & terkunci</span>`;
}
window.checkAnswersMeeting2 = checkAnswersMeeting2;

// ====================================================
//  LOCK MEETING 2
// ====================================================
function lockMeeting2() {
  const quiz = document.getElementById('quiz2');
  if (!quiz) return;

  quiz.querySelectorAll('input').forEach((i) => (i.disabled = true));
  document.getElementById('result2').innerHTML = '<b>Latihan ini sudah dikerjakan. Tidak bisa diulang.</b>';
}

// ====================================================
//  AUTO LOGOUT (5 MENIT)
// ====================================================
let inactivity = 0;
const MAX = 5 * 60 * 1000;

function startInactivityChecker() {
  const reset = () => (inactivity = 0);
  document.onclick = document.onmousemove = document.onkeydown = reset;

  setInterval(() => {
    inactivity += 1000;
    if (inactivity >= MAX) logout();
  }, 1000);
}
