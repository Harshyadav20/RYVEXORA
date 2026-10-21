const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export const emptyInquiry = {
  name: '',
  email: '',
  company: '',
  website: '',
  service: '',
  budget: '',
  message: '',
  trap: '',
};

export function validateInquiry(values) {
  const errors = {};

  if (!values.name || values.name.trim().length < 2) {
    errors.name = 'Please enter your name.';
  }

  if (!values.email || !EMAIL_PATTERN.test(values.email.trim())) {
    errors.email = 'Enter a valid email address, like name@company.com.';
  }

  if (!values.service) {
    errors.service = 'Choose the service closest to what you need.';
  }

  if (!values.budget) {
    errors.budget = 'Select an approximate budget range.';
  }

  if (!values.message || values.message.trim().length < 20) {
    errors.message = 'Give us a little context — at least 20 characters.';
  }

  if (values.website && values.website.trim() && !/^(https?:\/\/)?[\w-]+(\.[\w-]+)+/.test(values.website.trim())) {
    errors.website = 'Enter a valid URL, or leave this empty.';
  }

  return errors;
}

export function buildBrief(values) {
  return [
    'New project inquiry — RYVEXORA',
    '',
    `Name: ${values.name}`,
    `Email: ${values.email}`,
    `Company: ${values.company || '—'}`,
    `Website: ${values.website || '—'}`,
    `Service: ${values.service}`,
    `Budget: ${values.budget}`,
    '',
    'Project details:',
    values.message,
  ].join('\n');
}
