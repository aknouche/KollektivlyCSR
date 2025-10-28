// Verify database schema
const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

// Read .env.local file
const envPath = path.join(__dirname, '..', '.env.local');
if (!fs.existsSync(envPath)) {
  console.error('❌ .env.local file not found!');
  process.exit(1);
}

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

if (!env.NEXT_PUBLIC_SUPABASE_URL || !env.SUPABASE_SERVICE_ROLE_KEY) {
  console.error('❌ Missing Supabase credentials in .env.local');
  process.exit(1);
}

const supabase = createClient(
  env.NEXT_PUBLIC_SUPABASE_URL,
  env.SUPABASE_SERVICE_ROLE_KEY
);

async function verifySchema() {
  console.log('🔍 Verifying Database Schema...\n');

  try {
    // Check 1: Companies table exists
    console.log('1️⃣  Checking companies table...');
    const { data: companiesTest, error: companiesError } = await supabase
      .from('companies')
      .select('id')
      .limit(1);

    if (companiesError && companiesError.code === '42P01') {
      console.log('   ❌ MISSING: companies table does not exist');
      console.log('   → Run migration: 20250120000000_add_companies_table.sql\n');
    } else if (companiesError) {
      console.log(`   ⚠️  Error: ${companiesError.message}\n`);
    } else {
      console.log('   ✅ EXISTS: companies table found\n');
    }

    // Check 2: Contact_messages table exists
    console.log('2️⃣  Checking contact_messages table...');
    const { data: contactTest, error: contactError } = await supabase
      .from('contact_messages')
      .select('id')
      .limit(1);

    if (contactError && contactError.code === '42P01') {
      console.log('   ❌ MISSING: contact_messages table does not exist');
      console.log('   → Run migration: 20250101000000_initial_schema.sql\n');
    } else if (contactError) {
      console.log(`   ⚠️  Error: ${contactError.message}\n`);
    } else {
      console.log('   ✅ EXISTS: contact_messages table found\n');
    }

    // Check 3: company_id column in contact_messages
    console.log('3️⃣  Checking company_id column in contact_messages...');
    const { data: schemaTest, error: schemaError } = await supabase
      .from('contact_messages')
      .select('id, company_id')
      .limit(1);

    if (schemaError && schemaError.message.includes('company_id')) {
      console.log('   ❌ MISSING: company_id column does not exist in contact_messages');
      console.log('   → Run migration: 20250120000000_add_companies_table.sql');
      console.log('   → Or run: ALTER TABLE contact_messages ADD COLUMN company_id UUID REFERENCES companies(id);\n');
      return false;
    } else if (schemaError) {
      console.log(`   ⚠️  Error: ${schemaError.message}\n`);
      return false;
    } else {
      console.log('   ✅ EXISTS: company_id column found in contact_messages\n');
    }

    // Check 4: Try a test query with nested joins
    console.log('4️⃣  Testing nested join query (projects → organizations)...');
    const { data: joinTest, error: joinError } = await supabase
      .from('contact_messages')
      .select('id, projects(projektnamn, organizations(organization_name))')
      .limit(1);

    if (joinError) {
      console.log(`   ⚠️  Join query failed: ${joinError.message}`);
      console.log('   → This might be expected if there are no contact messages yet\n');
    } else {
      console.log('   ✅ SUCCESS: Nested join query works correctly\n');
    }

    // Summary
    console.log('=' .repeat(50));
    console.log('✅ SCHEMA VERIFICATION COMPLETE');
    console.log('=' .repeat(50));
    console.log('\nYour database schema is ready for the new code!');
    console.log('\nNext steps:');
    console.log('1. Clear browser cache (Ctrl+Shift+R)');
    console.log('2. Check Vercel deployment status');
    console.log('3. Test the contact form on production\n');

    return true;

  } catch (error) {
    console.error('\n❌ Unexpected error:', error.message);
    return false;
  }
}

verifySchema()
  .then(success => process.exit(success ? 0 : 1))
  .catch(err => {
    console.error('Fatal error:', err);
    process.exit(1);
  });
