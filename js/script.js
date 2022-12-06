const form = document.querySelector('.counter__form');
//input

const genderMale    = form.querySelector('#gender-male');
const genderFemale  = form.querySelector('#gender-female');
const age           = form.querySelector('#age');
const height        = form.querySelector('#height');
const weight        = form.querySelector('#weight');

//buttons
const activityButtons = form.querySelector('.radios-group');
const minActivityButton    = activityButtons.querySelector('#activity-minimal');
const lowActivityButton    = activityButtons.querySelector('#activity-low');
const mediumActivityButton = activityButtons.querySelector('#activity-medium');
const highActivityButton   = activityButtons.querySelector('#activity-high');
const maxActivityButton    = activityButtons.querySelector('#activity-maximal');
const submitButton = form.querySelector('.form__submit-button');
const resetButton  = form.querySelector('.form__reset-button');


//resPopup
const resultPopup     =    document.querySelector('.counter__result');
const caloriesNorm    = resultPopup.querySelector('#calories-norm');
const caloriesMinimal = resultPopup.querySelector('#calories-minimal');
const caloriesMaximal = resultPopup.querySelector('#calories-maximal');

let activCoeff = 1.2;
addListeners();


function changeSubmitAndReset() {
  if (age.value !== '' && height.value !== '' && weight.value !== '') {
    submitButton.disabled = false;
  } else {
    submitButton.disabled = true;
  }

  if (age.value !== '' || height.value !== '' || weight.value !== '') {
    resetButton.disabled = false;
  } else {
    resetButton.disabled = true;
  }
}

function changeActivity(evt) {
  switch (evt.target.id) {
    case 'activity-minimal':
      activCoeff = 1.2;
      break;
    case 'activity-low':
      activCoeff = 1.375;
      break;
    case 'activity-medium':
      activCoeff= 1.55;
      break;
    case 'activity-high':
      activCoeff = 1.725;
      break;
    case 'activity-maximal':
      activCoeff = 1.9;
      break;
  }
}

function resetForm() {
  activCoeff = 1.2;
  genderMale.checked = true;
  genderFemale.checked = false;
  age.value = '';
  height.value = '';
  weight.value = '';
  submitButton.disabled = true;
  resetButton.disabled = true;
  minActivityButton.checked = true;
  lowActivityButton.checked = false;
  mediumActivityButton.checked = false;
  highActivityButton.checked = false;
  maxActivityButton.checked = false;
  resultPopup.classList.add('counter__result--hidden');
}

function viewResultWindow(evt) {
  evt.preventDefault();
  resultPopup.classList.remove('counter__result--hidden');

  const res = getResultCalories();
  caloriesNorm.textContent = res;
  caloriesMinimal.textContent = Math.ceil(res * 0.85);
  caloriesMaximal.textContent = Math.ceil(res * 1.15);
}


function addListeners() {
  age.addEventListener('input', changeSubmitAndReset);
  height.addEventListener('input', changeSubmitAndReset);
  weight.addEventListener('input', changeSubmitAndReset);

  activityButtons.addEventListener('change', changeActivity);


  resetButton.addEventListener('click', resetForm);
  submitButton.addEventListener('click', viewResultWindow);
}


function getResultCalories() {
  const finalTerm = genderMale.checked ? 5 : -161;
  return Math.ceil(activCoeff * (10 * weight.value + 6.25 * height.value - 5 * age.value + finalTerm));
}
