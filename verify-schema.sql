-- Run this in Supabase SQL Editor to verify the schema
-- Copy and paste into: https://supabase.com/dashboard → SQL Editor

-- ===================================
-- 1. CHECK IF CONTACT_MESSAGES TABLE EXISTS
-- ===================================
SELECT
  'contact_messages table' as check_item,
  CASE WHEN EXISTS (
    SELECT FROM information_schema.tables
    WHERE table_schema = 'public' AND table_name = 'contact_messages'
  ) THEN '✅ EXISTS' ELSE '❌ MISSING' END as status;

-- ===================================
-- 2. CHECK IF COMPANY_ID COLUMN EXISTS
-- ===================================
SELECT
  'company_id column' as check_item,
  CASE WHEN EXISTS (
    SELECT FROM information_schema.columns
    WHERE table_schema = 'public'
    AND table_name = 'contact_messages'
    AND column_name = 'company_id'
  ) THEN '✅ EXISTS' ELSE '❌ MISSING - Need to run migration!' END as status;

-- ===================================
-- 3. CHECK ALL COLUMNS IN CONTACT_MESSAGES
-- ===================================
SELECT
  column_name,
  data_type,
  is_nullable
FROM information_schema.columns
WHERE table_schema = 'public'
  AND table_name = 'contact_messages'
ORDER BY ordinal_position;

-- ===================================
-- 4. CHECK IF COMPANIES TABLE EXISTS
-- ===================================
SELECT
  'companies table' as check_item,
  CASE WHEN EXISTS (
    SELECT FROM information_schema.tables
    WHERE table_schema = 'public' AND table_name = 'companies'
  ) THEN '✅ EXISTS' ELSE '❌ MISSING - Need to run migration!' END as status;

-- ===================================
-- EXPECTED RESULTS:
-- ===================================
-- contact_messages table: ✅ EXISTS
-- company_id column: ✅ EXISTS
-- companies table: ✅ EXISTS
--
-- If you see ❌ MISSING, you need to apply this migration:
-- supabase/migrations/20250120000000_add_companies_table.sql
