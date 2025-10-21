-- Check if all required tables exist
SELECT table_name
FROM information_schema.tables
WHERE table_schema = 'public'
  AND table_name IN ('companies', 'payment_cases', 'milestones', 'ai_verifications')
ORDER BY table_name;

-- Check if storage buckets exist
SELECT name, public
FROM storage.buckets
WHERE name IN ('documents', 'photos');

-- Check companies table structure (if exists)
SELECT column_name, data_type
FROM information_schema.columns
WHERE table_name = 'companies'
ORDER BY ordinal_position;

-- Check payment_cases table structure (if exists)
SELECT column_name, data_type
FROM information_schema.columns
WHERE table_name = 'payment_cases'
ORDER BY ordinal_position;
