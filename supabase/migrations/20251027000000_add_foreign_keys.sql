-- Add foreign key constraints to contact_messages table
-- This enables nested queries like: contact_messages -> projects -> organizations

-- Add foreign key for project_id
ALTER TABLE contact_messages
  ADD CONSTRAINT fk_contact_messages_project
  FOREIGN KEY (project_id)
  REFERENCES projects(id)
  ON DELETE CASCADE;

-- Add foreign key for organization_id
ALTER TABLE contact_messages
  ADD CONSTRAINT fk_contact_messages_organization
  FOREIGN KEY (organization_id)
  REFERENCES organizations(id)
  ON DELETE CASCADE;

-- Comment
COMMENT ON CONSTRAINT fk_contact_messages_project ON contact_messages IS
  'Foreign key to projects table - enables nested queries for project details';
