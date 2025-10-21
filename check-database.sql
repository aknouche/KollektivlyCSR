-- Run this in Supabase SQL Editor to check your database status
-- Copy and paste into: https://supabase.com/dashboard → SQL Editor

-- ===================================
-- CHECK WHICH TABLES EXIST
-- ===================================

SELECT
  'organizations' as table_name,
  CASE WHEN EXISTS (
    SELECT FROM information_schema.tables
    WHERE table_schema = 'public' AND table_name = 'organizations'
  ) THEN '✅ EXISTS' ELSE '❌ MISSING' END as status
UNION ALL
SELECT
  'projects',
  CASE WHEN EXISTS (
    SELECT FROM information_schema.tables
    WHERE table_schema = 'public' AND table_name = 'projects'
  ) THEN '✅ EXISTS' ELSE '❌ MISSING' END
UNION ALL
SELECT
  'companies',
  CASE WHEN EXISTS (
    SELECT FROM information_schema.tables
    WHERE table_schema = 'public' AND table_name = 'companies'
  ) THEN '✅ EXISTS' ELSE '❌ MISSING' END
UNION ALL
SELECT
  'contact_messages',
  CASE WHEN EXISTS (
    SELECT FROM information_schema.tables
    WHERE table_schema = 'public' AND table_name = 'contact_messages'
  ) THEN '✅ EXISTS' ELSE '❌ MISSING' END
UNION ALL
SELECT
  'payment_cases',
  CASE WHEN EXISTS (
    SELECT FROM information_schema.tables
    WHERE table_schema = 'public' AND table_name = 'payment_cases'
  ) THEN '✅ EXISTS' ELSE '❌ MISSING (Phase 3)' END
UNION ALL
SELECT
  'milestones',
  CASE WHEN EXISTS (
    SELECT FROM information_schema.tables
    WHERE table_schema = 'public' AND table_name = 'milestones'
  ) THEN '✅ EXISTS' ELSE '❌ MISSING (Phase 3)' END
UNION ALL
SELECT
  'ai_verifications',
  CASE WHEN EXISTS (
    SELECT FROM information_schema.tables
    WHERE table_schema = 'public' AND table_name = 'ai_verifications'
  ) THEN '✅ EXISTS' ELSE '❌ MISSING (Phase 3)' END
UNION ALL
SELECT
  'esg_reports',
  CASE WHEN EXISTS (
    SELECT FROM information_schema.tables
    WHERE table_schema = 'public' AND table_name = 'esg_reports'
  ) THEN '✅ EXISTS' ELSE '❌ MISSING (Phase 3)' END;

-- ===================================
-- EXPECTED RESULTS:
-- ===================================
-- For Phase 2 (minimum required):
-- ✅ organizations
-- ✅ projects
-- ✅ contact_messages
-- ✅ companies (NEW - if you see ❌ here, run the migration!)

-- For Phase 3 (optional for now):
-- ❌ payment_cases (Phase 3)
-- ❌ milestones (Phase 3)
-- ❌ ai_verifications (Phase 3)
-- ❌ esg_reports (Phase 3)

-- ===================================
-- COUNT RECORDS IN EACH TABLE
-- ===================================

-- Uncomment these to see how many records you have:

-- SELECT 'organizations' as table_name, COUNT(*) as record_count FROM organizations
-- UNION ALL
-- SELECT 'projects', COUNT(*) FROM projects
-- UNION ALL
-- SELECT 'companies', COUNT(*) FROM companies
-- UNION ALL
-- SELECT 'contact_messages', COUNT(*) FROM contact_messages;
