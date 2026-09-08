const root = document.documentElement;
const languageButton = document.querySelector('#language');
const menuButton = document.querySelector('#menu');
const navigation = document.querySelector('#navigation');
let language = 'ar';
function closeMenu() {
  navigation.classList.remove('open');
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.textContent = '☰';
}
function setLanguage(next) {
  language = next;
  root.lang = next;
  root.dir = next === 'ar' ? 'rtl' : 'ltr';
  document.querySelectorAll('[data-ar]').forEach(el => { el.textContent = el.dataset[next]; });
  document.querySelectorAll('[data-alt-ar]').forEach(el => { el.alt = el.getAttribute(`data-alt-${next}`); });
  languageButton.innerHTML = next === 'ar' ? 'EN <span aria-hidden="true">◎</span>' : 'العربية <span aria-hidden="true">◎</span>';
  languageButton.setAttribute('aria-label', next === 'ar' ? 'Switch to English' : 'التبديل إلى العربية');
  document.title = next === 'ar' ? 'الواحة للصناعات الغذائية | حلاوة نعتز بها' : 'Al Waha Food Industries | A Sweeter Story';
  document.querySelector('meta[name="description"]').content = next === 'ar' ? 'الواحة للصناعات الغذائية. سكر أبيض ناعم، وهوية سورية نفخر بها، ورؤية لصناعة غذائية أكثر تطوراً.' : 'Al Waha Food Industries. Fine white cane sugar, proud Syrian roots, and a vision for the future of food production.';
  try { localStorage.setItem('alwaha-language', next); } catch {}
  closeMenu();
}
try { if (localStorage.getItem('alwaha-language') === 'en') setLanguage('en'); } catch {}
languageButton.addEventListener('click', () => setLanguage(language === 'ar' ? 'en' : 'ar'));
menuButton.addEventListener('click', () => {
  const open = navigation.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.textContent = open ? '×' : '☰';
});
navigation.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeMenu(); });
document.addEventListener('click', e => { if (!e.target.closest('.header')) closeMenu(); });
if ('IntersectionObserver' in window && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
  root.classList.add('js-motion');
  const observer = new IntersectionObserver(entries => entries.forEach(entry => {
    if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); }
  }), { threshold: 0.08 });
  document.querySelectorAll('.reveal').forEach(section => observer.observe(section));
}
document.querySelector('#year').textContent = new Date().getFullYear();
const dialog = document.querySelector('#enquiry-dialog');
let enquiryText = '';
document.querySelector('#enquiry').addEventListener('submit', e => {
  e.preventDefault();
  const data = new FormData(e.currentTarget);
  enquiryText = language === 'ar'
    ? `طلب شراكة — الواحة للصناعات الغذائية\n\nالاسم: ${data.get('name')}\nالشركة: ${data.get('company') || '—'}\nالبريد الإلكتروني: ${data.get('email')}\n\n${data.get('message')}`
    : `Partnership enquiry — Al Waha Food Industries\n\nName: ${data.get('name')}\nCompany: ${data.get('company') || '—'}\nEmail: ${data.get('email')}\n\n${data.get('message')}`;
  document.querySelector('#enquiry-preview').textContent = enquiryText;
  dialog.showModal();
});
document.querySelector('#close-dialog').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', e => { if (e.target === dialog) { const r = dialog.getBoundingClientRect(); if (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom) dialog.close(); } });
document.querySelector('#download-enquiry').addEventListener('click', () => {
  const url = URL.createObjectURL(new Blob(['\ufeff' + enquiryText], { type: 'text/plain;charset=utf-8' }));
  const a = document.createElement('a'); a.href = url; a.download = 'alwaha-partnership-enquiry.txt'; a.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
});
