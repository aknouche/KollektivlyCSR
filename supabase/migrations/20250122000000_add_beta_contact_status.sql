-- Migration: Add BETA_INTEREST status for simplified beta testing contact flow
-- Date: 2025-01-22
-- Purpose: Enable companies to show interest in projects without full communication

-- Add BETA_INTEREST to message_status enum
ALTER TYPE message_status ADD VALUE IF NOT EXISTS 'BETA_INTEREST';

-- Add index for filtering beta interest messages
CREATE INDEX IF NOT EXISTS idx_contact_messages_status ON contact_messages(status);

-- Update RLS policy to hide beta interest messages from organizations during beta phase
-- Organizations should not see BETA_INTEREST messages in their dashboard
DROP POLICY IF EXISTS organizations_view_own_contact_messages ON contact_messages;

CREATE POLICY organizations_view_own_contact_messages
  ON contact_messages
  FOR SELECT
  USING (
    organization_id = auth.uid()
    AND status != 'BETA_INTEREST'  -- Hide beta interest messages from organizations
  );

-- Companies can view their own sent messages (including beta interest)
DROP POLICY IF EXISTS companies_view_own_sent_messages ON contact_messages;

CREATE POLICY companies_view_own_sent_messages
  ON contact_messages
  FOR SELECT
  USING (
    company_id IN (
      SELECT id FROM companies WHERE auth_user_id = auth.uid()
    )
  );

-- Comment
COMMENT ON POLICY companies_view_own_sent_messages ON contact_messages IS
  'Companies can view all their sent messages including beta interest expressions';
