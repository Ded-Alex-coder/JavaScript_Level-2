let textBefore = document.querySelector('.text-before');
let textB = textBefore.innerText;
textB = (textB.replace(/'/g, '"'));
let textBa = (textB.replace(/\b"/g, "'"));

let textAfter = document.querySelector('.text-after');
textAfter.innerText = (textB);

let textAfterBetter = document.querySelector('.text-after-better');
textAfterBetter.innerText = (textBa);

let submit = document.querySelector('.button');
submit.addEventListener('click', () => {
   let nameValid = document.querySelector('.name').value;
   let regexpName = new RegExp(/[a-zА-ЯёЁ]/i);
   let validName = (regexpName.test(nameValid));
   if (validName) {
      document.querySelector('.name').classList.remove('error')
   } else {
      document.querySelector('.name').classList.add('error')
   }

   let numberValid = document.querySelector('.number').value;
   let regexpNumber = new RegExp(/[\s \d]{5,9}/);
   let validNumber = (regexpNumber.test(numberValid));
   if (validNumber) {
      document.querySelector('.number').classList.remove('error')
   } else {
      document.querySelector('.number').classList.add('error')
   }

   let emailValid = document.querySelector('.e-mail').value;
   let regexpEmail = new RegExp(/^[a-z0-9._-]+@[a-z0-9._-]+\.[a-zа-я]{2,3}$/iu);
   let validEmail = (regexpEmail.test(emailValid));
   if (validEmail) {
      document.querySelector('.e-mail').classList.remove('error')
   } else {
      document.querySelector('.e-mail').classList.add('error')
   }
})