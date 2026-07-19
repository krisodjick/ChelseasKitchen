const header = document.querySelector('.site-header');
const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.site-nav');
const links = document.querySelectorAll('.site-nav a');

function closeMenu(){nav.classList.remove('open');toggle.setAttribute('aria-expanded','false');}
toggle.addEventListener('click',()=>{const open=toggle.getAttribute('aria-expanded')==='true';toggle.setAttribute('aria-expanded',String(!open));nav.classList.toggle('open',!open);});
links.forEach(link=>link.addEventListener('click',closeMenu));
window.addEventListener('scroll',()=>header.classList.toggle('scrolled',window.scrollY>40),{passive:true});

const observer = new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target);}}),{threshold:.12});
document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));

document.getElementById('year').textContent = new Date().getFullYear();

const form=document.getElementById('contactForm');
form.addEventListener('submit',event=>{
  event.preventDefault();
  if(!form.reportValidity()) return;
  const data=new FormData(form);
  const subject=`Chelsea's Kitchen inquiry – ${data.get('interest')}`;
  const body=[
    "CHELSEA'S KITCHEN WEBSITE INQUIRY",
    "",
    `Name: ${data.get('name')}`,
    `Email: ${data.get('email')}`,
    `Inquiry: ${data.get('interest')}`,
    "",
    data.get('message')
  ].join('\n');
  window.location.href=`mailto:kris@chelseaskitchen.ca?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
});
