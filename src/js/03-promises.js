import { Notify } from "notiflix";

const formRef = document.querySelector('.form');
const btnSubmit = document.querySelector('[type="submit"]');

formRef.addEventListener('submit', onSubmit)

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({position, delay});
      } else {
        reject({position, delay})
      }
    }, delay);
  })
}

function onSubmit(e) {
  e.preventDefault();

  let delay = Number(e.currentTarget.elements.delay.value);
  const step = Number(e.currentTarget.elements.step.value);
  const amount = Number(e.currentTarget.elements.amount.value);

  btnSubmit.disabled = true;

  setTimeout(() => {
    btnSubmit.disabled = false;
  }, step * amount + delay);

  for (let i = 1; i <= amount; i += 1) {
    createPromise(i, delay)
      .then(({position, delay}) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`)
      })
      .catch(({position, delay}) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`)
      }
      )
      delay += step; 
  }
  e.currentTarget.reset()
}