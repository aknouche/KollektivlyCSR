-- Kollektivly Initial Database Schema for Supabase
-- SECURITY: See SECURITY_ANALYSIS.md sections referenced inline
-- Migrated from Prisma schema

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create custom types (enums)
CREATE TYPE organization_status AS ENUM (
  'PENDING',      -- Awaiting email verification
  'VERIFIED',     -- Email verified
  'APPROVED',     -- Admin approved, can publish projects
  'SUSPENDED',    -- Temporarily suspended
  'REJECTED'      -- Application rejected
);

CREATE TYPE project_status AS ENUM (
  'DRAFT',           -- Being created by organization
  'PENDING_REVIEW',  -- Submitted, awaiting admin approval
  'APPROVED',        -- Admin approved, ready to publish
  'PUBLISHED',       -- Live on platform
  'FLAGGED',         -- Flagged by moderation, needs review
  'REJECTED',        -- Rejected by admin
  'ARCHIVED'         -- No longer active
);

CREATE TYPE token_type AS ENUM (
  'EMAIL_VERIFICATION',  -- Initial email verification
  'MAGIC_LINK',         -- Passwordless login
  'PASSWORD_RESET'      -- Future use
);

CREATE TYPE message_status AS ENUM (
  'PENDING',    -- Awaiting moderation
  'SENT',       -- Delivered to organization
  'READ',       -- Organization opened message
  'REPLIED',    -- Organization responded
  'BLOCKED'     -- Blocked by moderation
);

-- Organizations table
-- SECURITY: Section 7.1 - Organization data isolation
CREATE TABLE organizations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

  -- Basic Info
  organization_name TEXT NOT NULL,
  organization_number TEXT UNIQUE, -- Swedish org.nr (optional for MVP)
  email TEXT UNIQUE NOT NULL,
  email_verified BOOLEAN DEFAULT FALSE,

  -- Contact Details
  contact_person TEXT NOT NULL,
  phone_number TEXT,
  website TEXT,

  -- Location
  city TEXT NOT NULL,
  address TEXT,

  -- Description
  description TEXT,

  -- GDPR Consent (SECURITY: Section 5.1)
  gdpr_consent BOOLEAN DEFAULT FALSE,
  consent_date TIMESTAMP WITH TIME ZONE,

  -- Status
  status organization_status DEFAULT 'PENDING',

  -- Auth link (Supabase Auth user ID)
  auth_user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE
);

-- Create indexes for organizations
CREATE INDEX idx_organizations_email ON organizations(email);
CREATE INDEX idx_organizations_status ON organizations(status);
CREATE INDEX idx_organizations_auth_user_id ON organizations(auth_user_id);

-- Projects table
-- SECURITY: Section 6.2, 6.3 - Content moderation
CREATE TABLE projects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

  -- Organization link (SECURITY: Section 7.1 - Row-level access)
  organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,

  -- Project Details (matching existing frontend types)
  projektnamn TEXT NOT NULL,
  kort_beskrivning TEXT NOT NULL,
  full_beskrivning TEXT NOT NULL,
  stad TEXT NOT NULL,
  budget TEXT NOT NULL,
  csr_kategori TEXT NOT NULL,
  fn_mal TEXT[] NOT NULL, -- Array of UN SDG goals

  -- Media
  image_url TEXT,

  -- Badges
  badges TEXT[], -- ["NY", "POPULÄR", "VERIFIERAD"]

  -- Analytics
  view_count INTEGER DEFAULT 0,
  contact_count INTEGER DEFAULT 0,

  -- Content Moderation (SECURITY: Section 6.2)
  moderation_score REAL, -- Perspective API score (0-1)
  moderation_flags TEXT[], -- Toxicity, spam, etc.

  -- Status
  status project_status DEFAULT 'DRAFT',
  published_at TIMESTAMP WITH TIME ZONE,

  -- Admin review
  reviewed_by TEXT,
  reviewed_at TIMESTAMP WITH TIME ZONE,
  review_notes TEXT
);

-- Create indexes for projects
CREATE INDEX idx_projects_organization_id ON projects(organization_id);
CREATE INDEX idx_projects_status ON projects(status);
CREATE INDEX idx_projects_published_at ON projects(published_at);
CREATE INDEX idx_projects_stad ON projects(stad);
CREATE INDEX idx_projects_csr_kategori ON projects(csr_kategori);

-- Verification tokens table
-- SECURITY: Section 4.1, 4.4 - Token-based verification
CREATE TABLE verification_tokens (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

  -- Token
  token TEXT UNIQUE NOT NULL,
  type token_type NOT NULL,
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
  used BOOLEAN DEFAULT FALSE,
  used_at TIMESTAMP WITH TIME ZONE,

  -- Organization link
  organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,

  -- Metadata
  ip_address TEXT,
  user_agent TEXT
);

-- Create indexes for verification tokens
CREATE INDEX idx_verification_tokens_token ON verification_tokens(token);
CREATE INDEX idx_verification_tokens_organization_id ON verification_tokens(organization_id);
CREATE INDEX idx_verification_tokens_expires_at ON verification_tokens(expires_at);

-- Contact messages table
-- SECURITY: Section 6.1 - Message sanitization, Section 3.4 - Rate limiting
CREATE TABLE contact_messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

  -- Project reference
  project_id UUID NOT NULL,
  organization_id UUID NOT NULL,

  -- Company details
  company_name TEXT NOT NULL,
  company_email TEXT NOT NULL,
  contact_person TEXT NOT NULL,
  phone_number TEXT,

  -- Message (SECURITY: Section 6.1 - Sanitized before storage)
  message TEXT NOT NULL,

  -- Moderation
  moderation_score REAL,
  moderation_passed BOOLEAN DEFAULT TRUE,

  -- Status
  status message_status DEFAULT 'PENDING',
  sent_at TIMESTAMP WITH TIME ZONE,
  read_at TIMESTAMP WITH TIME ZONE,

  -- Rate limiting tracking (SECURITY: Section 3.4)
  sender_ip TEXT
);

-- Create indexes for contact messages
CREATE INDEX idx_contact_messages_project_id ON contact_messages(project_id);
CREATE INDEX idx_contact_messages_organization_id ON contact_messages(organization_id);
CREATE INDEX idx_contact_messages_company_email ON contact_messages(company_email);
CREATE INDEX idx_contact_messages_created_at ON contact_messages(created_at);

-- Audit log table
-- SECURITY: Section 7.2 - Audit logging
CREATE TABLE audit_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

  -- Action details
  action TEXT NOT NULL,
  entity_type TEXT NOT NULL, -- "Organization", "Project", "ContactMessage"
  entity_id UUID NOT NULL,

  -- Admin details
  admin_email TEXT NOT NULL,
  admin_ip TEXT,

  -- Changes
  old_value TEXT,
  new_value TEXT,
  notes TEXT
);

-- Create indexes for audit logs
CREATE INDEX idx_audit_logs_entity ON audit_logs(entity_type, entity_id);
CREATE INDEX idx_audit_logs_admin_email ON audit_logs(admin_email);
CREATE INDEX idx_audit_logs_created_at ON audit_logs(created_at);

-- Row Level Security (RLS) Policies
-- SECURITY: Section 2.3 - Row-level security

-- Enable RLS on all tables
ALTER TABLE organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE verification_tokens ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;

-- Organizations: Users can only read/update their own organization
CREATE POLICY "Users can view own organization"
  ON organizations FOR SELECT
  USING (auth.uid() = auth_user_id);

CREATE POLICY "Users can update own organization"
  ON organizations FOR UPDATE
  USING (auth.uid() = auth_user_id);

-- Projects: Public can read PUBLISHED projects, organizations can manage their own
CREATE POLICY "Anyone can view published projects"
  ON projects FOR SELECT
  USING (status = 'PUBLISHED');

CREATE POLICY "Organizations can view own projects"
  ON projects FOR SELECT
  USING (organization_id IN (
    SELECT id FROM organizations WHERE auth_user_id = auth.uid()
  ));

CREATE POLICY "Organizations can create projects"
  ON projects FOR INSERT
  WITH CHECK (organization_id IN (
    SELECT id FROM organizations WHERE auth_user_id = auth.uid() AND status = 'APPROVED'
  ));

CREATE POLICY "Organizations can update own projects"
  ON projects FOR UPDATE
  USING (organization_id IN (
    SELECT id FROM organizations WHERE auth_user_id = auth.uid()
  ));

-- Verification tokens: Only system can manage
CREATE POLICY "Service role can manage tokens"
  ON verification_tokens FOR ALL
  USING (auth.role() = 'service_role');

-- Contact messages: Organizations can read their own messages
CREATE POLICY "Organizations can view own messages"
  ON contact_messages FOR SELECT
  USING (organization_id IN (
    SELECT id FROM organizations WHERE auth_user_id = auth.uid()
  ));

-- Audit logs: Only admins can read
CREATE POLICY "Service role can view audit logs"
  ON audit_logs FOR SELECT
  USING (auth.role() = 'service_role');

-- Functions

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers for updated_at
CREATE TRIGGER update_organizations_updated_at BEFORE UPDATE ON organizations
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_projects_updated_at BEFORE UPDATE ON projects
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Function to auto-increment view count
CREATE OR REPLACE FUNCTION increment_project_view_count(project_uuid UUID)
RETURNS VOID AS $$
BEGIN
    UPDATE projects
    SET view_count = view_count + 1
    WHERE id = project_uuid;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Comments for documentation
COMMENT ON TABLE organizations IS 'Non-profit organizations registered on the platform';
COMMENT ON TABLE projects IS 'CSR projects submitted by organizations';
COMMENT ON TABLE verification_tokens IS 'Email verification and magic link tokens';
COMMENT ON TABLE contact_messages IS 'Messages from companies to organizations';
COMMENT ON TABLE audit_logs IS 'Audit trail of admin actions';
