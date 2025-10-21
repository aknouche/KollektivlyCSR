-- Payment & Escrow System for Kollektivly
-- Implements 2-milestone payment system with AI verification

-- Payment Cases (main payment container)
CREATE TABLE payment_cases (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

  -- Relationships
  project_id UUID NOT NULL REFERENCES projects(id),
  organization_id UUID NOT NULL REFERENCES organizations(id),
  company_id UUID REFERENCES companies(id), -- Null if company not registered yet
  company_email TEXT NOT NULL, -- Always store email for tracking

  -- Payment Details
  grant_amount INTEGER NOT NULL, -- Amount förening receives (e.g., 50000 SEK)
  service_fee INTEGER NOT NULL,  -- Kollektivly's fee (e.g., 3500 SEK for 7%)
  total_charged INTEGER NOT NULL, -- grant_amount + service_fee (e.g., 53500 SEK)
  service_tier TEXT NOT NULL, -- 'basic' (4%), 'standard' (7%), 'enhanced' (10%)

  -- Stripe References
  stripe_payment_intent_id TEXT UNIQUE,
  stripe_payment_status TEXT, -- 'pending', 'succeeded', 'failed', 'refunded'

  -- Status Tracking
  status TEXT NOT NULL DEFAULT 'AWAITING_PAYMENT',
  -- Status flow: AWAITING_PAYMENT → PAID → MILESTONE_1_PENDING → MILESTONE_1_COMPLETE →
  --              MILESTONE_2_PENDING → COMPLETED (or REFUNDED, DISPUTED)

  -- Timestamps
  paid_at TIMESTAMP WITH TIME ZONE,
  completed_at TIMESTAMP WITH TIME ZONE,

  -- Metadata
  company_name TEXT NOT NULL,
  company_contact_person TEXT,
  notes TEXT
);

-- Milestones (payment stages)
CREATE TABLE milestones (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

  -- Relationships
  payment_case_id UUID NOT NULL REFERENCES payment_cases(id) ON DELETE CASCADE,

  -- Milestone Info
  milestone_number INTEGER NOT NULL CHECK (milestone_number IN (1, 2)),
  amount INTEGER NOT NULL, -- Typically 50% of grant_amount for each milestone

  -- Status
  status TEXT NOT NULL DEFAULT 'PENDING',
  -- Status flow: PENDING → DOCUMENTS_UPLOADED → AI_VERIFYING →
  --              APPROVED → PAID (or REJECTED, NEEDS_REVIEW)

  -- Milestone 1: Legitimacy Check Documents
  stadgar_url TEXT, -- Bylaws PDF in Supabase Storage
  ekonomisk_redovisning_url TEXT, -- Financial statement PDF
  legitimacy_documents_uploaded_at TIMESTAMP WITH TIME ZONE,

  -- Milestone 2: Impact Report
  social_media_link TEXT, -- URL to social media/web post
  uploaded_photo_urls TEXT[], -- Array of image URLs from Storage
  impact_description TEXT, -- Text description of how money was spent
  impact_report_uploaded_at TIMESTAMP WITH TIME ZONE,

  -- AI Verification Status
  ai_verification_status TEXT, -- 'PENDING', 'PASSED', 'FAILED', 'NEEDS_REVIEW'
  ai_verified_at TIMESTAMP WITH TIME ZONE,
  ai_confidence_score REAL, -- 0-1, for audit purposes

  -- Admin Override
  admin_approved BOOLEAN DEFAULT FALSE,
  admin_override_reason TEXT,
  admin_email TEXT,
  admin_reviewed_at TIMESTAMP WITH TIME ZONE,

  -- Payment Release
  paid_at TIMESTAMP WITH TIME ZONE,
  stripe_transfer_id TEXT, -- Stripe transfer ID to förening's account

  -- Unique constraint: only 2 milestones per payment case
  CONSTRAINT unique_milestone_per_case UNIQUE (payment_case_id, milestone_number)
);

-- AI Verifications (audit trail for all AI checks)
CREATE TABLE ai_verifications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

  -- Relationships
  milestone_id UUID NOT NULL REFERENCES milestones(id) ON DELETE CASCADE,

  -- Verification Type
  verification_type TEXT NOT NULL, -- 'LEGITIMACY_CHECK' or 'IMPACT_REPORT'

  -- What was analyzed
  documents_analyzed JSONB, -- Array of file names/URLs analyzed

  -- AI Request/Response
  ai_model TEXT NOT NULL, -- 'gpt-4o', 'gpt-4-turbo', etc.
  ai_prompt TEXT NOT NULL, -- The prompt sent to AI
  ai_response JSONB NOT NULL, -- Full structured response from AI

  -- Results
  passed BOOLEAN NOT NULL,
  confidence_score REAL, -- 0-1
  flags TEXT[], -- Array of warnings/concerns
  reasoning TEXT, -- AI's explanation

  -- Verification Details (structured checks)
  checks_performed JSONB,
  -- Example for legitimacy:
  -- {
  --   "org_number_match": true,
  --   "documents_legitimate": true,
  --   "financial_health": "good",
  --   "recent_documents": true
  -- }
  -- Example for impact:
  -- {
  --   "link_valid": true,
  --   "photos_authentic": true,
  --   "description_complete": true,
  --   "spending_matches_category": true
  -- }

  -- Processing
  processing_time_ms INTEGER, -- How long AI took to respond
  tokens_used INTEGER -- For cost tracking
);

-- ESG Reports (auto-generated for companies)
CREATE TABLE esg_reports (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

  -- Relationships
  payment_case_id UUID NOT NULL REFERENCES payment_cases(id),
  company_id UUID REFERENCES companies(id),

  -- Report Details
  report_type TEXT NOT NULL, -- 'MILESTONE', 'FINAL', 'ANNUAL'
  reporting_period_start DATE,
  reporting_period_end DATE,

  -- Generated Content
  report_data JSONB NOT NULL, -- Structured ESG data
  pdf_url TEXT, -- Generated PDF in Storage
  generated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

  -- Metadata
  project_names TEXT[], -- Projects included in report
  total_impact_value INTEGER, -- Total SEK contributed
  sdg_goals_supported TEXT[] -- UN SDG goals covered
);

-- Create indexes
CREATE INDEX idx_payment_cases_project_id ON payment_cases(project_id);
CREATE INDEX idx_payment_cases_organization_id ON payment_cases(organization_id);
CREATE INDEX idx_payment_cases_company_id ON payment_cases(company_id);
CREATE INDEX idx_payment_cases_company_email ON payment_cases(company_email);
CREATE INDEX idx_payment_cases_status ON payment_cases(status);
CREATE INDEX idx_payment_cases_stripe_payment_intent_id ON payment_cases(stripe_payment_intent_id);

CREATE INDEX idx_milestones_payment_case_id ON milestones(payment_case_id);
CREATE INDEX idx_milestones_status ON milestones(status);
CREATE INDEX idx_milestones_ai_verification_status ON milestones(ai_verification_status);

CREATE INDEX idx_ai_verifications_milestone_id ON ai_verifications(milestone_id);
CREATE INDEX idx_ai_verifications_verification_type ON ai_verifications(verification_type);
CREATE INDEX idx_ai_verifications_passed ON ai_verifications(passed);

CREATE INDEX idx_esg_reports_payment_case_id ON esg_reports(payment_case_id);
CREATE INDEX idx_esg_reports_company_id ON esg_reports(company_id);

-- Triggers for updated_at
CREATE TRIGGER update_payment_cases_updated_at BEFORE UPDATE ON payment_cases
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_milestones_updated_at BEFORE UPDATE ON milestones
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Row Level Security
ALTER TABLE payment_cases ENABLE ROW LEVEL SECURITY;
ALTER TABLE milestones ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_verifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE esg_reports ENABLE ROW LEVEL SECURITY;

-- Organizations can view their own payment cases and milestones
CREATE POLICY "Organizations can view own payment cases"
  ON payment_cases FOR SELECT
  USING (organization_id IN (
    SELECT id FROM organizations WHERE auth_user_id = auth.uid()
  ));

CREATE POLICY "Organizations can view own milestones"
  ON milestones FOR SELECT
  USING (payment_case_id IN (
    SELECT id FROM payment_cases WHERE organization_id IN (
      SELECT id FROM organizations WHERE auth_user_id = auth.uid()
    )
  ));

-- Companies can view their own payment cases
CREATE POLICY "Companies can view own payment cases"
  ON payment_cases FOR SELECT
  USING (company_id IN (
    SELECT id FROM companies WHERE auth_user_id = auth.uid()
  ));

CREATE POLICY "Companies can view own ESG reports"
  ON esg_reports FOR SELECT
  USING (company_id IN (
    SELECT id FROM companies WHERE auth_user_id = auth.uid()
  ));

-- Service role can manage everything
CREATE POLICY "Service role can manage payment cases"
  ON payment_cases FOR ALL
  USING (auth.role() = 'service_role');

CREATE POLICY "Service role can manage milestones"
  ON milestones FOR ALL
  USING (auth.role() = 'service_role');

CREATE POLICY "Service role can manage AI verifications"
  ON ai_verifications FOR ALL
  USING (auth.role() = 'service_role');

CREATE POLICY "Service role can manage ESG reports"
  ON esg_reports FOR ALL
  USING (auth.role() = 'service_role');

-- Functions

-- Function to create milestones when payment is confirmed
CREATE OR REPLACE FUNCTION create_initial_milestones(payment_case_uuid UUID, total_grant INTEGER)
RETURNS VOID AS $$
BEGIN
    -- Create Milestone 1 (50%)
    INSERT INTO milestones (
        payment_case_id,
        milestone_number,
        amount,
        status
    ) VALUES (
        payment_case_uuid,
        1,
        total_grant / 2,
        'PENDING'
    );

    -- Create Milestone 2 (50%)
    INSERT INTO milestones (
        payment_case_id,
        milestone_number,
        amount,
        status
    ) VALUES (
        payment_case_uuid,
        2,
        total_grant / 2,
        'PENDING'
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to calculate service fee based on tier
CREATE OR REPLACE FUNCTION calculate_service_fee(grant_amount_int INTEGER, tier TEXT)
RETURNS INTEGER AS $$
DECLARE
    fee_percentage REAL;
BEGIN
    CASE tier
        WHEN 'basic' THEN fee_percentage := 0.04;
        WHEN 'standard' THEN fee_percentage := 0.07;
        WHEN 'enhanced' THEN fee_percentage := 0.10;
        ELSE fee_percentage := 0.07; -- Default to standard
    END CASE;

    RETURN ROUND(grant_amount_int * fee_percentage);
END;
$$ LANGUAGE plpgsql;

-- Comments
COMMENT ON TABLE payment_cases IS 'Payment cases with escrow - companies pay, Kollektivly holds, release on milestone completion';
COMMENT ON TABLE milestones IS 'Payment milestones (2 per case: legitimacy check + impact report)';
COMMENT ON TABLE ai_verifications IS 'Audit trail of all AI verifications for milestones';
COMMENT ON TABLE esg_reports IS 'Auto-generated ESG reports for companies';

COMMENT ON COLUMN milestones.stadgar_url IS 'Milestone 1: Bylaws PDF uploaded by förening';
COMMENT ON COLUMN milestones.ekonomisk_redovisning_url IS 'Milestone 1: Financial statement PDF';
COMMENT ON COLUMN milestones.social_media_link IS 'Milestone 2: Link to social media/web post showing impact';
COMMENT ON COLUMN milestones.uploaded_photo_urls IS 'Milestone 2: Photos uploaded directly to platform';
COMMENT ON COLUMN milestones.impact_description IS 'Milestone 2: Text description of money usage';

COMMENT ON COLUMN ai_verifications.verification_type IS 'LEGITIMACY_CHECK for Milestone 1, IMPACT_REPORT for Milestone 2';
COMMENT ON COLUMN ai_verifications.confidence_score IS '0-1 score indicating AI confidence in verification';
