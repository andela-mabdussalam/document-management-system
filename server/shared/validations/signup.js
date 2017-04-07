import validator from 'validator';

export default function validateSignupForm(payload) {
  const errors = {};
  let isFormValid = true;
  let message = '';
   console.log('payload is', payload);
  if (!payload || typeof payload.email !== 'string' || !validator.isEmail(payload.email)) {
    isFormValid = false;
    console.log('man');
    errors.email = 'Please provide a correct email address.';
  }

  if (!payload || typeof payload.password !== 'string' || payload.password.trim().length < 8) {
    isFormValid = false;
    console.log('woman');
    errors.password = 'Password must have at least 8 characters.';
  }

  if (!payload || typeof payload.firstName !== 'string' || payload.firstName.trim().length === 0) {
    isFormValid = false;
    console.log('mane');
    errors.firstName = 'Please provide your firstName.';
  }

  if (!payload || typeof payload.userName !== 'string' || payload.userName.trim().length === 0) {
    isFormValid = false;
    console.log('mand');
    errors.userName = 'Please provide your userName.';
  }

  if (!payload || typeof payload.lastName !== 'string' || payload.lastName.trim().length === 0) {
    isFormValid = false;
    console.log('mank');
    errors.lastName = 'Please provide your lastName.';
  }
  if(!validator.equals(payload.password, payload.passwordConfirm) ) {
    errors.passwordConfirm = 'Passwords must match';
  }
  if (!isFormValid) {
    message = 'Check the form for errors.';
  }

  return {
    isFormValid,
    // message,
    errors
  };
}
