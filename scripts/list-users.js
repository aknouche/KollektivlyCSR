// List all users in Supabase
const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

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
  env.SUPABASE_SERVICE_ROLE_KEY
);

async function listUsers() {
  try {
    const { data: { users }, error } = await supabase.auth.admin.listUsers();

    if (error) {
      console.error('Error:', error);
      return;
    }

    console.log(`Found ${users.length} users:\n`);
    users.forEach(user => {
      console.log(`Email: ${user.email}`);
      console.log(`ID: ${user.id}`);
      console.log(`Confirmed: ${user.email_confirmed_at ? 'Yes ✅' : 'No ❌'}`);
      console.log(`Created: ${user.created_at}`);
      console.log('---');
    });

  } catch (error) {
    console.error('Unexpected error:', error);
  }
}

listUsers();
