const q=s=>document.querySelector(s),qa=s=>[...document.querySelectorAll(s)];
const nav=q('.nav'),burger=q('.burger');
function menu(open){nav?.classList.toggle('open',open);burger?.setAttribute('aria-expanded',String(open));burger?.setAttribute('aria-label',open?'Закрыть меню':'Открыть меню')}
burger?.addEventListener('click',()=>menu(!nav.classList.contains('open')));
qa('.navlinks a').forEach(a=>a.addEventListener('click',()=>menu(false)));
document.addEventListener('keydown',e=>{if(e.key==='Escape'){menu(false);if(q('.bot.open')){openBot(false);q('.bot-btn')?.focus()}}});
const bot=q('.bot'),body=q('.bot-body');
function openBot(open){bot?.classList.toggle('open',open);q('.bot-btn')?.setAttribute('aria-expanded',String(open))}
q('.bot-btn')?.addEventListener('click',()=>{openBot(!bot.classList.contains('open'));if(bot.classList.contains('open'))q('.bot-close')?.focus()});
q('.bot-close')?.addEventListener('click',()=>{openBot(false);q('.bot-btn')?.focus()});
const answers={
qualify:['Начните с правового анализа документов, доходов, имущества и обязательств. Анкета помогает подготовиться, но не определяет автоматически право на процедуру. Можно предварительно обратиться к кредитору и в МФЦ.','/services/','Услуги Центра'],
property:['Для единственного пригодного для проживания жилья предусмотрена защита с исключениями, в том числе для ипотеки. Имущество и сделки нужно изучить индивидуально; отсутствие рисков нельзя обещать заранее.','/services/#standards','Правовые стандарты'],
cost:['Полное сопровождение — 215 000 ₽, включая указанные судебные расходы. Предоплата — 25 000 ₽, остаток 190 000 ₽ — в беспроцентную внутреннюю рассрочку до 17 месяцев. График фиксируется в договоре.','/pricing/','Стоимость сопровождения'],
installment:['Выберите от 1 до 17 месяцев в калькуляторе. Он распределит оставшиеся 190 000 ₽ без процентов. Точные даты и суммы фиксируются в договоре.','/pricing/#calculator','Открыть калькулятор'],
documents:['Подготовьте список кредиторов, приблизительную сумму долгов и ежемесячных платежей. Полный перечень документов определяется после знакомства с ситуацией. Не отправляйте здесь паспортные данные или банковские документы.','/process/','Этапы работы'],
contact:['Для записи позвоните по номеру +7 910 775-98-26. Адрес: г. Александров, ул. Свердлова, д. 2, кабинет 1а. Время приёма уточняйте по телефону. Также можно написать на irinabankrotstvo@yandex.ru или позвонить по дополнительному номеру +7 920 622-67-30.','tel:+79107759826','Позвонить в Центр']
};
qa('.quick button').forEach(b=>b.addEventListener('click',()=>{const a=answers[b.dataset.a];if(!a||!body)return;const user=document.createElement('div');user.className='bubble user';user.textContent=b.textContent;const reply=document.createElement('div');reply.className='bubble';reply.append(document.createTextNode(a[0]),document.createElement('br'));const link=document.createElement('a');link.href=a[1];link.textContent=a[2];reply.append(link);body.append(user,reply);body.scrollTop=body.scrollHeight}));
