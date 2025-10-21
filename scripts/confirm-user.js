// Quick script to manually confirm a user
// Run with: node scripts/confirm-user.js <email>

const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

const email = process.argv[2];

if (!email) {
  console.error('Usage: node scripts/confirm-user.js <email>');
  process.exit(1);
}

// Read .env.local file
const envPath = path.join(__dirname, '..', '.env.local');
const envContent = fs.readFileSync(envPath, 'utf8');
const env = {};

envContent.split('\n').forEach(line => {
  const match = line.match(/^([^=]+)=(.*)$/);
  if (match) {
    const key = match[1].trim();
    const value = match[2].trim().replace(/^["']|["']$/g, '');
    env[key] = value;
  }
});

const supabase = createClient(
  env.NEXT_PUBLIC_SUPABASE_URL,
  env.SUPABASE_SERVICE_ROLE_KEY // Use service role key for admin access
);

async function confirmUser() {
  try {
    // Get user by email
    const { data: { users }, error: listError } = await supabase.auth.admin.listUsers();

    if (listError) {
      console.error('Error listing users:', listError);
      return;
    }

    const user = users.find(u => u.email === email);

    if (!user) {
      console.error(`User not found: ${email}`);
      return;
    }

    console.log(`Found user: ${user.email} (${user.id})`);
    console.log(`Current confirmation status: ${user.email_confirmed_at ? 'Confirmed' : 'Not confirmed'}`);

    if (user.email_confirmed_at) {
      console.log('User is already confirmed!');
      return;
    }

    // Update user to confirm email
    const { data, error } = await supabase.auth.admin.updateUserById(
      user.id,
      {
        email_confirm: true,
        app_metadata: { ...user.app_metadata },
        user_metadata: { ...user.user_metadata }
      }
    );

    if (error) {
      console.error('Error confirming user:', error);
      return;
    }

    console.log('✅ User email confirmed successfully!');
    console.log('User can now log in with their password.');

  } catch (error) {
    console.error('Unexpected error:', error);
  }
}

confirmUser();
