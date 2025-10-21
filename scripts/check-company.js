// Check if company record exists
const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

const email = process.argv[2] || 'lammemomme@gmail.com';

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

async function checkCompany() {
  try {
    const { data, error } = await supabase
      .from('companies')
      .select('*')
      .eq('email', email)
      .single();

    if (error) {
      console.error('Error:', error.message);
      return;
    }

    if (data) {
      console.log('✅ Company record found:\n');
      console.log(`Company Name: ${data.company_name}`);
      console.log(`Email: ${data.email}`);
      console.log(`Contact Person: ${data.contact_person}`);
      console.log(`Email Verified: ${data.email_verified ? 'Yes' : 'No'}`);
      console.log(`Created: ${data.created_at}`);
      console.log(`Auth User ID: ${data.auth_user_id}`);
    } else {
      console.log('❌ No company record found for:', email);
    }

  } catch (error) {
    console.error('Unexpected error:', error);
  }
}

checkCompany();
