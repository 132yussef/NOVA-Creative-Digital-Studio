const progress = document.querySelector('.progress span');
const cursor = document.querySelector('.cursor');
const sections = [...document.querySelectorAll('.section')];

function revealSections(){
  const trigger = innerHeight * .82;
  sections.forEach(section=>{
    if(section.getBoundingClientRect().top < trigger){
      section.querySelectorAll('.micro,h1,h2,h3,.quote,.project-device,.laptop').forEach(el=>el.classList.add('reveal'));
    }
  });
}
function updateProgress(){
  const max = document.documentElement.scrollHeight - innerHeight;
  progress.style.width = `${max ? (scrollY/max)*100 : 0}%`;
  revealSections();
}
addEventListener('scroll',updateProgress,{passive:true});
addEventListener('load',updateProgress);

addEventListener('mousemove',e=>{
  if(!cursor) return;
  cursor.style.left=e.clientX+'px';
  cursor.style.top=e.clientY+'px';
});
document.querySelectorAll('a,.pill,.quote,.arrows button,.service-copy').forEach(el=>{
  el.addEventListener('mouseenter',()=>{cursor.style.width='34px';cursor.style.height='34px'});
  el.addEventListener('mouseleave',()=>{cursor.style.width='15px';cursor.style.height='15px'});
});

document.querySelectorAll('.arrows button').forEach((button,i)=>{
  button.addEventListener('click',()=>{
    const grid=document.querySelector('.test-grid');
    grid.scrollBy({left:(i===0?-1:1)*grid.clientWidth*.82,behavior:'smooth'});
  });
});

document.querySelectorAll('.service-copy,.main-project,.about-copy,.contact-content').forEach(el=>{
  el.addEventListener('mousemove',e=>{
    if(innerWidth<=800)return;
    const r=el.getBoundingClientRect();
    const x=(e.clientX-r.left)/r.width-.5;
    const y=(e.clientY-r.top)/r.height-.5;
    el.style.transform=`translate(${x*8}px,${y*8}px)`;
  });
  el.addEventListener('mouseleave',()=>el.style.transform='');
});
