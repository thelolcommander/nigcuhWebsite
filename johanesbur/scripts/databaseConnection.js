<script type="module">
    import { createClient } from 'import { createClient } from '@supabase/supabase-js';

    const SUPABASE_URL = 'https://yjxahfxllwkhlicyveeh.supabase.co';
    const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlqeGFoZnhsbHdraGxpY3l2ZWVoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzIwOTQyNzksImV4cCI6MjA0NzY3MDI3OX0.C-x72uLtUiwd8ZYJi_1azVSHsm0stfEVgbgcWMSKmxk';
    const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

    async function testConnection() {
      const { data, error } = await supabase.from('users').select('*').limit(1);

      if (error) {
        console.error('Error connecting to database:', error.message);
        alert('Failed to connect to the database. Check your credentials.');
      } else {
        console.log('Connection successful. Data:', data);
        alert('Connected to database successfully!');
      }
    }

    testConnection();

    document.getElementById('switch-to-register').addEventListener('click', () => {
      document.getElementById('auth-header').textContent = 'Register';
      document.getElementById('auth-button').textContent = 'Register';
      document.getElementById('switch-to-register').textContent = 'Already have an account? Login';
      document.getElementById('auth-button').removeEventListener('click', loginHandler);
      document.getElementById('auth-button').addEventListener('click', registerHandler);
    });

    // Handle Login
    async function loginHandler() {
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;
      const errorMessage = document.getElementById('error-message');

      if (!email || !password) {
        errorMessage.textContent = 'Please enter both email and password.';
        return;
      }

      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('email', email)
        .eq('password', password);

      if (error) {
        errorMessage.textContent = 'Database error: ' + error.message;
        alert('Database error: ' + error.message);
      } else if (data.length === 0) {
        errorMessage.textContent = 'Invalid email or password.';
        alert('Invalid email or password.');
      } else {
        errorMessage.textContent = '';
        alert('Login successful! Welcome, ' + data[0].email + '!');
      }
    }

    // Handle Register
    async function registerHandler() {
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;
      const errorMessage = document.getElementById('error-message');

      if (!email || !password) {
        errorMessage.textContent = 'Please enter both email and password.';
        return;
      }

      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('email', email);

      if (data.length > 0) {
        errorMessage.textContent = 'Email already registered.';
        alert('Email already registered.');
        return;
      }

      const { error: insertError } = await supabase
        .from('users')
        .insert([{ email, password }]);

      if (insertError) {
        errorMessage.textContent = 'Database error: ' + insertError.message;
        alert('Database error: ' + insertError.message);
      } else {
        errorMessage.textContent = '';
        alert('Registration successful! You can now login.');

        document.getElementById('auth-header').textContent = 'Login';
        document.getElementById('auth-button').textContent = 'Login';
        document.getElementById('switch-to-register').textContent = 'Don\'t have an account? Register';
        document.getElementById('auth-button').removeEventListener('click', registerHandler);
        document.getElementById('auth-button').addEventListener('click', loginHandler);
      }
    }

    document.getElementById('auth-button').addEventListener('click', loginHandler);
  </script>