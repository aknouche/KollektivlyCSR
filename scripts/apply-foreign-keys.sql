-- Apply this migration in Supabase SQL Editor
-- URL: https://supabase.com/dashboard/project/YOUR_PROJECT/sql/new

-- This adds foreign key constraints to enable nested queries
-- For example: contact_messages -> projects -> organizations

BEGIN;

-- Add foreign key for project_id (if not exists)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.table_constraints
    WHERE constraint_name = 'fk_contact_messages_project'
  ) THEN
    ALTER TABLE contact_messages
      ADD CONSTRAINT fk_contact_messages_project
      FOREIGN KEY (project_id)
      REFERENCES projects(id)
      ON DELETE CASCADE;
    RAISE NOTICE '✅ Added foreign key: fk_contact_messages_project';
  ELSE
    RAISE NOTICE '⏭️  Foreign key already exists: fk_contact_messages_project';
  END IF;
END $$;

-- Add foreign key for organization_id (if not exists)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.table_constraints
    WHERE constraint_name = 'fk_contact_messages_organization'
  ) THEN
    ALTER TABLE contact_messages
      ADD CONSTRAINT fk_contact_messages_organization
      FOREIGN KEY (organization_id)
      REFERENCES organizations(id)
      ON DELETE CASCADE;
    RAISE NOTICE '✅ Added foreign key: fk_contact_messages_organization';
  ELSE
    RAISE NOTICE '⏭️  Foreign key already exists: fk_contact_messages_organization';
  END IF;
END $$;

COMMIT;

-- Verify the constraints were added
SELECT
  constraint_name,
  '✅ EXISTS' as status
FROM information_schema.table_constraints
WHERE table_name = 'contact_messages'
  AND constraint_type = 'FOREIGN KEY'
ORDER BY constraint_name;
