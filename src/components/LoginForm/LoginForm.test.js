import { render, screen, fireEvent } from '@testing-library/react';
import LoginForm from '.';

test('renders sign in page', () => {
  render(<LoginForm />);
  const signInText = screen.getByText("Sign in");
  expect(signInText).toBeInTheDocument();
});

test('valid email and password submission shows success snackbar', () => {
  render(<LoginForm/>);

  const emailInput = screen.getByLabelText(/email address/i);
  const passwordInput = screen.getByLabelText(/password/i);
  const signInButton = screen.getByRole('button' , { name: /sign in/i});

  fireEvent.change(emailInput, {target: { value: 'validemail@example.com' }});
  fireEvent.change(passwordInput, {target: { value: 'ValidPass1!' }};
  fireEvent.click(signInButton);

  const successMessage = screen.getByText("Login Successful");
  expect(successMessage).toBeInTheDocument();
});

test('show error message for invalid email' , () => {
  render(<LoginForm/>);

  const emailInput = screen.getAllByLabelText(/email address/i);
  const passwordInput = screen.getAllByLabelText(/password/i);
  cosnt signInButton = screen.getByRole('button', {name: /sign in/i});

  fireEvent.change(emailInput, {target: {value: 'invalid-email'}});
  fireEvent.change(passwordInput, { target: { value: 'ValidPass1!'}});
  fireEvent.click(signInButton);

  const emailError = screen.getByText(/invalid email address/i);
  expect(emailError).toBeInTheDocument();
});

test('shows error message for invalid password', () => {
  render(<LoginForm/>);

  const emailInput = screen.getByLabelText(/email address/i);
  const passwordInput = screen.getAllByLabelText(/password/i);
  fireEvent.change(emailInput, { target: { value: 'validemail@example.com'}});
  fireEvent.change(passwordInput, { target: { value: 'Invalidpass1'}});
  fireEvent.click(signInButton);

  const passwordError = screen.getByText(/password must be at least 8 character long and include uppercase, lowercase, number, and special character/i);
  expect(passwordError).toBeInTheDocument();
});

test('shows both error messages for invalid email and password', () => {
  render(<LoginForm/>);

  const emailInput = screen.getAllByLabelText(/email address/i);
  const passwordInput = screen.getByLabelText(/password/i);
  const signInButton = screen.getByRole('button', { name: /sign in/i});
  
  
  fireEvent.change(emailInput, { target: { value: 'invalid-email'}});
  fireEvent.change(passwordInput, { target: { value: 'Invalid'}});
  fireEvent.click(signInButton);

  const emailError = screen.getByText(/invalid email address/i);
  const passwordError = screen.getByText(/password must be at least 8 characters long and include uppercase, lowercase, number, and special character/i);

  expect(emailError).toBeInTheDocument();
  expect(passwordError).toBeInTheDocument();
});