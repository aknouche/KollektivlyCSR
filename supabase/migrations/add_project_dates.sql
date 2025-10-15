-- Add start_date and end_date columns to projects table
-- Migration: Add project dates
-- Date: 2025-10-15

ALTER TABLE projects
ADD COLUMN IF NOT EXISTS start_date DATE,
ADD COLUMN IF NOT EXISTS end_date DATE;

-- Add comment to columns
COMMENT ON COLUMN projects.start_date IS 'Project or event start date (optional)';
COMMENT ON COLUMN projects.end_date IS 'Project or event end date (optional)';

-- Create index for filtering by date
CREATE INDEX IF NOT EXISTS idx_projects_start_date ON projects(start_date) WHERE start_date IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_projects_end_date ON projects(end_date) WHERE end_date IS NOT NULL;
