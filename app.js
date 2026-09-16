const navItems = document.querySelectorAll('[data-view]');
const views = document.querySelectorAll('.view');
const pageLabel = document.getElementById('pageLabel');
const mobileMenu = document.getElementById('mobileMenu');
const sidebar = document.querySelector('.sidebar');
const themeToggle = document.getElementById('toggleTheme');
const grades = ['Grade 8', 'Grade 9', 'Grade 10', 'Grade 11', 'Grade 12'];

document.querySelector('.profile-mini span').textContent = 'Grade 8';
document.querySelector('.notice-card h3').textContent = 'All learners';
document.querySelector('.notice-card p').innerHTML = 'Check your grade group for the latest notices from teachers and the admin office.';
document.querySelector('#learner-view .lede').textContent = 'Choose your grade to see what is new and what you are being told.';
document.querySelector('#study-view .study-grid').querySelectorAll('.tag').forEach(tag => { tag.textContent = 'ALL GRADES'; });

const learnerView = document.getElementById('learner-view');
const gradePanel = document.createElement('div');
gradePanel.className = 'grade-group-panel card';
gradePanel.innerHTML = `<div><span class="tag coral">YOUR GROUP</span><h3 id="groupTitle">Grade 8 group</h3><p id="groupSummary">See what is new and what your teachers want you to know.</p></div><label class="grade-picker">My grade<select id="gradeSelect" aria-label="Select your grade">${grades.map(grade => `<option>${grade}</option>`).join('')}</select></label>`;
learnerView.insertBefore(gradePanel, learnerView.querySelector('.hub-layout'));

const gradeSelect = document.getElementById('gradeSelect');
gradeSelect.addEventListener('change', event => {
  const grade = event.target.value;
  document.getElementById('groupTitle').textContent = `${grade} group`;
  document.getElementById('groupSummary').textContent = `See what is new and what your teachers want you to know in ${grade}.`;
  document.querySelector('.profile-mini > div:nth-child(2) span').textContent = grade;
});

const timetableView = document.getElementById('timetable-view');
timetableView.innerHTML = `<div class="page-intro timetable-intro"><div><p class="eyebrow">TIMETABLE</p><h1>Set up your timetable.</h1><p class="lede">Choose your grade, then add or update your class timetable when the school shares it.</p></div><select id="timetableGrade" aria-label="Select your grade">${grades.map(grade => `<option>${grade}</option>`).join('')}</select></div><div class="timetable-empty card"><div class="empty-icon">▦</div><span class="tag green">READY TO SET UP</span><h2>Add or update your class timetable</h2><p>Your grade group is ready. A teacher or admin can add the correct daily lessons here when the timetable is confirmed.</p><button class="primary-button" id="updateTimetable">＋ Add timetable</button><button class="secondary-button" id="viewNotices">View group notices</button></div>`;
document.getElementById('updateTimetable').addEventListener('click', event => {
  event.target.textContent = 'Timetable update requested';
  event.target.classList.add('requested');
});
document.getElementById('viewNotices').addEventListener('click', () => openView('learner'));

function openView(viewName) {
  views.forEach(view => view.classList.toggle('active-view', view.id === `${viewName}-view`));
  document.querySelectorAll('.nav-item').forEach(item => item.classList.toggle('active', item.dataset.view === viewName));
  const activeItem = document.querySelector(`.nav-item[data-view="${viewName}"]`);
  pageLabel.textContent = activeItem ? activeItem.textContent.trim() : 'Home';
  sidebar.classList.remove('open');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

navItems.forEach(item => item.addEventListener('click', () => openView(item.dataset.view)));
mobileMenu.addEventListener('click', () => sidebar.classList.toggle('open'));
themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  themeToggle.innerHTML = document.body.classList.contains('dark') ? '<span>☼</span> Light appearance' : '<span>◐</span> Switch appearance';
});

document.querySelectorAll('.check').forEach(check => {
  check.addEventListener('click', () => {
    check.classList.toggle('checked');
    check.textContent = check.classList.contains('checked') ? '✓' : '';
  });
});

document.querySelector('.search-box input').addEventListener('input', event => {
  const term = event.target.value.toLowerCase();
  document.querySelectorAll('.news-card, .event-row, .study-card, .fixture-row').forEach(item => {
    item.style.display = !term || item.textContent.toLowerCase().includes(term) ? '' : 'none';
  });
});
