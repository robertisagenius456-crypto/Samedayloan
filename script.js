const amount = document.getElementById('amount');
const amountOut = document.getElementById('amountOut');
const apr = document.getElementById('apr');
const term = document.getElementById('term');
const payment = document.getElementById('payment');
const total = document.getElementById('total');
const money = n => n.toLocaleString('en-US',{style:'currency',currency:'USD'});
function updateEstimate(){
  const principal=Number(amount.value), annual=Number(apr.value), months=Number(term.value), rate=annual/1200;
  amountOut.textContent=money(principal);
  const monthly=principal*rate/(1-Math.pow(1+rate,-months));
  payment.textContent=money(monthly);
  total.textContent=`Estimated total payments: ${money(monthly*months)}`;
}
[amount,apr,term].forEach(el=>el.addEventListener('input',updateEstimate));updateEstimate();

const menu=document.querySelector('.menu-btn'),nav=document.querySelector('.nav');
menu.addEventListener('click',()=>{const open=nav.classList.toggle('open');menu.setAttribute('aria-expanded',String(open));menu.textContent=open?'×':'☰';});
nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');menu.setAttribute('aria-expanded','false');menu.textContent='☰';}));

let toastTimer;
function notice(message){
  const toast=document.getElementById('toast');toast.textContent=message;toast.classList.add('show');
  clearTimeout(toastTimer);toastTimer=setTimeout(()=>toast.classList.remove('show'),4200);
}
document.querySelectorAll('[data-notice]').forEach(a=>a.addEventListener('click',e=>{e.preventDefault();notice(a.dataset.notice);}));

let currentStep=1;
const steps=[...document.querySelectorAll('.form-step')];
function showStep(n){
  currentStep=n;steps.forEach(s=>s.classList.toggle('active',Number(s.dataset.step)===n));
  document.getElementById('progressBar').style.width=n===1?'50%':'100%';
  document.getElementById('progressLabel').textContent=n===1?'Step 1 of 2 · Contact details':'Step 2 of 2 · Loan details';
  document.getElementById('formMessage').textContent='';
}
document.querySelector('.form-next').addEventListener('click',()=>{
  const required=[...steps[0].querySelectorAll('[required]')];
  const firstInvalid=required.find(el=>!el.checkValidity());
  if(firstInvalid){firstInvalid.reportValidity();return;}
  showStep(2);
});
document.querySelector('.btn-back').addEventListener('click',()=>showStep(1));
document.getElementById('demoForm').addEventListener('submit',e=>{
  e.preventDefault();
  const required=[...steps[1].querySelectorAll('[required]')];
  const invalid=required.find(el=>!el.checkValidity());
  if(invalid){invalid.reportValidity();return;}
  document.getElementById('formMessage').textContent='Preview complete. Nothing was sent, saved, or submitted to a lender. This is not a loan application or approval.';
  e.target.reset();showStep(1);
});
document.getElementById('year').textContent=new Date().getFullYear();
