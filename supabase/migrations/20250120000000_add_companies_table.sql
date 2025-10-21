-- Companies table for proper authentication
-- This replaces the localStorage approach

CREATE TABLE companies (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

  -- Basic Info
  company_name TEXT NOT NULL,
  org_number TEXT UNIQUE, -- Swedish org.nr (optional)
  email TEXT UNIQUE NOT NULL,
  email_verified BOOLEAN DEFAULT FALSE,

  -- Contact Details
  contact_person TEXT NOT NULL,
  phone_number TEXT,
  website TEXT,

  -- Location
  city TEXT,
  address TEXT,

  -- Industry & Goals
  industry TEXT, -- e.g., "Tech", "Retail", "Manufacturing"
  employee_count TEXT, -- e.g., "1-10", "11-50", "51-200", "201-500", "500+"

  -- Goals Assessment (from questionnaire)
  sponsorship_goals TEXT[], -- ["CSRD compliance", "Brand awareness", "Employee engagement", etc.]
  current_csr_maturity TEXT, -- "beginner", "intermediate", "advanced"
  assessment_completed BOOLEAN DEFAULT FALSE,
  assessment_completed_at TIMESTAMP WITH TIME ZONE,
  recommended_services TEXT[], -- ["CSRD consultation", "Marketing strategy", "Both"]

  -- GDPR Consent
  gdpr_consent BOOLEAN DEFAULT FALSE,
  consent_date TIMESTAMP WITH TIME ZONE,

  -- Auth link (Supabase Auth user ID)
  auth_user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE
);

-- Create indexes
CREATE INDEX idx_companies_email ON companies(email);
CREATE INDEX idx_companies_auth_user_id ON companies(auth_user_id);

-- Trigger for updated_at
CREATE TRIGGER update_companies_updated_at BEFORE UPDATE ON companies
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Row Level Security
ALTER TABLE companies ENABLE ROW LEVEL SECURITY;

-- Companies can view and update their own data
CREATE POLICY "Users can view own company"
  ON companies FOR SELECT
  USING (auth.uid() = auth_user_id);

CREATE POLICY "Users can update own company"
  ON companies FOR UPDATE
  USING (auth.uid() = auth_user_id);

-- Anyone can insert (for registration)
CREATE POLICY "Anyone can register company"
  ON companies FOR INSERT
  WITH CHECK (true);

-- Update contact_messages to optionally link to companies table
ALTER TABLE contact_messages
  ADD COLUMN company_id UUID REFERENCES companies(id);

CREATE INDEX idx_contact_messages_company_id ON contact_messages(company_id);

-- Comments
COMMENT ON TABLE companies IS 'Companies registered on the platform (sponsors/supporters)';
COMMENT ON COLUMN companies.sponsorship_goals IS 'Array of sponsorship goals from assessment form';
COMMENT ON COLUMN companies.current_csr_maturity IS 'Self-assessed CSR maturity level';
COMMENT ON COLUMN companies.recommended_services IS 'Expert consultation services recommended based on assessment';
