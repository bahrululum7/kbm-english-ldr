// ----------------------
// Firebase Initialization
// ----------------------
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

let currentUser = null;
let sudahMengerjakan = false;

// ----------------------
// Cek login & cek apakah sudah mengerjakan
// ----------------------
onAuthStateChanged(auth, async (user) => {
  if (!user) return (window.location.href = 'login.html');

  currentUser = user;

  // cek Firestore apakah user sudah mengerjakan
  const docRef = doc(db, 'quizStatus', user.uid);
  const snap = await getDoc(docRef);

  if (snap.exists()) {
    sudahMengerjakan = snap.data().done;

    if (sudahMengerjakan) {
      kunciSoal();
    }
  }
});

// ----------------------
// Logout
// ----------------------
function logout() {
  signOut(auth)
    .then(() => (window.location.href = 'login.html'))
    .catch((error) => alert('Logout gagal: ' + error.message));
}

// ------------------------------------------------------
// Fungsi Mengunci Soal (tidak bisa dikerjakan lagi)
// ------------------------------------------------------
function kunciSoal() {
  const area = document.getElementById('listening-questions');
  if (area) {
    area.style.opacity = '0.5';
    area.style.pointerEvents = 'none';
  }

  const btn = document.querySelector("button[onclick='checkAnswers()']");
  if (btn) {
    btn.disabled = true;
    btn.innerText = 'Sudah Dikerjakan';
    btn.classList.remove('bg-blue-500');
    btn.classList.add('bg-gray-400');
  }

  const result = document.getElementById('result');
  if (result) {
    result.innerHTML = '<b>Kamu sudah mengerjakan latihan ini. Tidak bisa ulang.</b>';
  }
}

// ----------------------
// Modules
// ----------------------
const modules = {
  week1: {
    title: 'Week 1 – Basic Survival English',
    content: `
<div class='module-box'>
  <h3>Materi</h3>
  <ul>
    <li>Pronouns (I, You, He/She...)</li>
    <li>Simple Present</li>
    <li>Past Tense</li>
    <li>Daily Vocabulary</li>
  </ul>
</div>

<div class="module-box">
  <button onclick="toggleContent('pdf1')" 
          class="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg transition-all flex justify-between items-center">
    📄 Modul Day 1 (PDF)
    <span id="icon-pdf1">▼</span>
  </button>
  <div id="pdf1" class="hidden mt-2 p-3 border rounded-lg bg-green-50 text-center">
    <a href="Pronouns.pdf" download class="text-green-700 hover:underline font-semibold inline-block">
      ⬇ Download Pronouns.pdf
    </a>
  </div>
</div>

<div class="module-box">
  <button onclick="toggleContent('soal1')" 
          class="w-full bg-purple-500 hover:bg-purple-600 text-white font-semibold py-2 px-4 rounded-lg transition-all flex justify-between items-center">
    🎧 Latihan Listening – Subject & Object Pronouns (10 Soal)
    <span id="icon-soal1">▼</span>
  </button>

  <div id="soal1" class="hidden mt-2 p-3 border rounded-lg bg-purple-50">
    <p>Pilih jawaban yang benar.</p>

    <ol id="listening-questions" class="space-y-3">

      <li>
        “This is Andi. ______ is my brother.”<br>
        A. <input type="radio" name="q1" value="He"> He<br>
        B. <input type="radio" name="q1" value="Him"> Him<br>
        C. <input type="radio" name="q1" value="She"> She<br>
        D. <input type="radio" name="q1" value="Her"> Her<br>
        E. <input type="radio" name="q1" value="They"> They
      </li>

      <li>
        “My mother helps ______ with homework.”<br>
        A. <input type="radio" name="q2" value="he"> he<br>
        B. <input type="radio" name="q2" value="they"> they<br>
        C. <input type="radio" name="q2" value="me"> me<br>
        D. <input type="radio" name="q2" value="she"> she<br>
        E. <input type="radio" name="q2" value="we"> we
      </li>

      <li>
        “This is Sinta. ______ is my classmate.”<br>
        A. <input type="radio" name="q3" value="She"> She<br>
        B. <input type="radio" name="q3" value="Her"> Her<br>
        C. <input type="radio" name="q3" value="Him"> Him<br>
        D. <input type="radio" name="q3" value="They"> They<br>
        E. <input type="radio" name="q3" value="It"> It
      </li>

      <li>
        “I call Rudi every evening. I call ______ every day.”<br>
        A. <input type="radio" name="q4" value="he"> he<br>
        B. <input type="radio" name="q4" value="him"> him<br>
        C. <input type="radio" name="q4" value="her"> her<br>
        D. <input type="radio" name="q4" value="they"> they<br>
        E. <input type="radio" name="q4" value="them"> them
      </li>

      <li>
        “The teacher gives Lala a book. The teacher gives ______ a book.”<br>
        A. <input type="radio" name="q5" value="he"> he<br>
        B. <input type="radio" name="q5" value="they"> they<br>
        C. <input type="radio" name="q5" value="her"> her<br>
        D. <input type="radio" name="q5" value="him"> him<br>
        E. <input type="radio" name="q5" value="them"> them
      </li>

      <li>
        “Alya and Sinta are here. I will meet ______ later.”<br>
        A. <input type="radio" name="q6" value="they"> they<br>
        B. <input type="radio" name="q6" value="her"> her<br>
        C. <input type="radio" name="q6" value="him"> him<br>
        D. <input type="radio" name="q6" value="them"> them<br>
        E. <input type="radio" name="q6" value="it"> it
      </li>

      <li>
        “Rudi and Andi are brothers. ______ live in Bandung.”<br>
        A. <input type="radio" name="q7" value="Them"> Them<br>
        B. <input type="radio" name="q7" value="They"> They<br>
        C. <input type="radio" name="q7" value="He"> He<br>
        D. <input type="radio" name="q7" value="It"> It<br>
        E. <input type="radio" name="q7" value="She"> She
      </li>

      <li>
        “Please give this notebook to Budi. Please give ______ this notebook.”<br>
        A. <input type="radio" name="q8" value="he"> he<br>
        B. <input type="radio" name="q8" value="she"> she<br>
        C. <input type="radio" name="q8" value="him"> him<br>
        D. <input type="radio" name="q8" value="them"> them<br>
        E. <input type="radio" name="q8" value="her"> her
      </li>

      <li>
        “This marker belongs to the school. I like ______.”<br>
        A. <input type="radio" name="q9" value="it"> it<br>
        B. <input type="radio" name="q9" value="them"> them<br>
        C. <input type="radio" name="q9" value="he"> he<br>
        D. <input type="radio" name="q9" value="she"> she<br>
        E. <input type="radio" name="q9" value="we"> we
      </li>

      <li>
        “Lina and Rani need help. Can you help ______?”<br>
        A. <input type="radio" name="q10" value="her"> her<br>
        B. <input type="radio" name="q10" value="him"> him<br>
        C. <input type="radio" name="q10" value="us"> us<br>
        D. <input type="radio" name="q10" value="them"> them<br>
        E. <input type="radio" name="q10" value="it"> it
      </li>

    </ol>

    <div class="mt-4 text-center">
      <button onclick="checkAnswers()" class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded-lg shadow-md transition">
        Cek Jawaban
      </button>
    </div>

    <p id="result" class="mt-2 text-center font-semibold"></p>
  </div>
</div>
`,
  },
};

function toggleContent(id) {
  const c = document.getElementById(id);
  const icon = document.getElementById('icon-' + id);

  c.classList.toggle('hidden');
  icon.innerText = c.classList.contains('hidden') ? '▼' : '▲';
}
window.toggleContent = toggleContent;

// ----------------------
// Load Module
// ----------------------
function loadModule(week) {
  document.getElementById('module-title').innerHTML = modules[week].title;
  document.getElementById('module-content').innerHTML = modules[week].content;

  // jika user sudah mengerjakan, kunci langsung
  if (sudahMengerjakan) {
    setTimeout(() => kunciSoal(), 300);
  }
}

// ----------------------
// Check Answers
// ----------------------
async function checkAnswers() {
  if (sudahMengerjakan) return;

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
  let wrongList = [];

  document.querySelectorAll('#listening-questions li').forEach((li) => {
    li.style.background = 'transparent';
    li.style.border = 'none';
  });

  for (let q in correct) {
    const selected = document.querySelector(`input[name="${q}"]:checked`);
    const li = document.querySelector(`input[name="${q}"]`)?.closest('li');
    const number = q.replace('q', '');

    if (selected && li) {
      if (selected.value === correct[q]) {
        score++;
        li.style.background = '#d4ffd4';
        li.style.border = '1px solid #3cb43c';
      } else {
        wrongList.push(number);
        li.style.background = '#ffd4d4';
        li.style.border = '1px solid #d43c3c';
      }
    } else if (li) {
      wrongList.push(number);
      li.style.background = '#ffd4d4';
      li.style.border = '1px solid #d43c3c';
    }
  }

  // --------------------------
  // SIMPAN KE FIRESTORE
  // --------------------------
  await setDoc(doc(db, 'quizStatus', currentUser.uid), {
    done: true,
    score: score,
    timestamp: Date.now(),
  });

  sudahMengerjakan = true;
  kunciSoal();

  const wrongText = wrongList.length ? `<br><b>Soal yang salah:</b> ${wrongList.join(', ')}` : '';
  document.getElementById('result').innerHTML = `<b>Nilai Kamu:</b> ${score} / 10 ${wrongText}`;

  // SIMPAN NILAI KE FIRESTORE
  saveScoreToFirestore(score);
}

async function saveScoreToFirestore(score) {
  const user = auth.currentUser;
  if (!user) return;

  try {
    await setDoc(doc(db, 'scores', user.uid), {
      email: user.email,
      score: score,
      timestamp: new Date(),
    });
    console.log('Nilai berhasil disimpan!');
  } catch (error) {
    console.error('Gagal menyimpan nilai:', error);
  }
}

// ----------------------
window.loadModule = loadModule;
window.checkAnswers = checkAnswers;
window.logout = logout;
window.saveScoreToFirestore = saveScoreToFirestore;
