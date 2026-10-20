(() => {
  const months=document.querySelector('#months');
  const money=n=>n.toLocaleString('ru-RU')+' ₽';
  function payments(){const n=Number(months.value),base=Math.floor(190000/n),last=190000-base*(n-1);document.querySelector('#months-out').textContent=n+' мес.';document.querySelector('#monthly').textContent=money(base)+(n>1?' / месяц':'');document.querySelector('#schedule').textContent=n===1?'Один платёж на оставшуюся сумму.':(n-1)+' платежей по '+money(base)+' и заключительный — '+money(last)+'.';}
  if(months){months.addEventListener('input',payments);payments();}
  const dialog=document.querySelector('#quiz'),form=document.querySelector('#quiz-form'),content=document.querySelector('#quiz-content'),back=document.querySelector('#quiz-back'),next=document.querySelector('#quiz-next');
  const questions=[
    ['Какова общая сумма задолженности?',['До 250 000 ₽','250 000–500 000 ₽','500 000–1 000 000 ₽','Более 1 000 000 ₽','Нужен расчёт по документам']],
    ['Позволяет ли текущий доход исполнять обязательства?',['Дохода хватает на платежи','После необходимых расходов на платежи не хватает','Стабильного дохода нет']],
    ['Есть ли просроченные платежи?',['Нет просрочек','Менее трёх месяцев','Три месяца или больше']],
    ['Какое имущество есть у вас?',['Единственное жильё без ипотеки','Жильё в ипотеке','Другая недвижимость или автомобиль','Недвижимости и автомобиля нет','Несколько вариантов — обсудить с юристом']],
    ['Были ли сделки с имуществом за последние три года?',['Нет','Да: продажа, дарение или раздел','Не уверен(а), нужно проверить']]
  ];
  let step=0,answers=[],opener=null;
  function render(){back.hidden=step===0;document.querySelector('#quiz-progress').value=Math.min(step+1,5);document.querySelector('#quiz-meta').textContent=step<5?'Вопрос '+(step+1)+' из 5':'Анкета заполнена — следующий шаг';content.replaceChildren();
    if(step<5){const fs=document.createElement('fieldset'),legend=document.createElement('legend');legend.textContent=questions[step][0];fs.append(legend);questions[step][1].forEach((text,i)=>{const label=document.createElement('label');label.className='quiz-option';const radio=document.createElement('input');radio.type='radio';radio.name='answer';radio.value=String(i);radio.required=true;radio.checked=answers[step]===i;label.append(radio,document.createTextNode(text));fs.append(label)});content.append(fs);next.textContent=step===4?'Завершить анкету':'Продолжить';}
    else{const p=document.createElement('p');p.textContent='Вы подготовили основную информацию для консультации. Для личного разбора ситуации позвоните в Центр по номеру +7 910 775-98-26. Ответы остаются на этой странице и не отправляются.';content.append(p);const dl=document.createElement('dl');questions.forEach((q,i)=>{const dt=document.createElement('dt'),dd=document.createElement('dd');dt.textContent=q[0];dd.textContent=q[1][answers[i]];dl.append(dt,dd)});content.append(dl);const actions=document.createElement('div');actions.className='actions';[['/contacts/#request','Оставить заявку'],['tel:+79107759826','Позвонить в Центр']].forEach(([href,text])=>{const a=document.createElement('a');a.href=href;a.textContent=text;a.className='btn';actions.append(a)});content.append(actions);next.textContent='Закрыть';}
    dialog.scrollTop=0;
  }
  document.querySelectorAll('[data-quiz]').forEach(b=>b.addEventListener('click',()=>{opener=b;render();dialog.showModal()}));
  document.querySelector('.quiz-close').addEventListener('click',()=>dialog.close());dialog.addEventListener('close',()=>opener?.focus());
  form.addEventListener('submit',e=>{e.preventDefault();if(step===5){dialog.close();return}const selected=form.querySelector('input[name=answer]:checked');if(!selected)return;answers[step]=Number(selected.value);step++;render();next.focus()});
  back.addEventListener('click',()=>{if(step>0){step--;render();next.focus()}});
  dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close()}});
  document.querySelectorAll('.navlinks a').forEach(a=>a.addEventListener('click',()=>{document.querySelector('.nav').classList.remove('open');document.querySelector('.burger').setAttribute('aria-expanded','false')}));
})();
