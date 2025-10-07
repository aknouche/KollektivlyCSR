-- Add English column names to projects table for API compatibility
-- Keep Swedish columns for backward compatibility with existing frontend

ALTER TABLE projects
  ADD COLUMN IF NOT EXISTS title TEXT,
  ADD COLUMN IF NOT EXISTS description TEXT,
  ADD COLUMN IF NOT EXISTS category TEXT,
  ADD COLUMN IF NOT EXISTS location TEXT,
  ADD COLUMN IF NOT EXISTS goal TEXT,
  ADD COLUMN IF NOT EXISTS un_goals TEXT[],
  ADD COLUMN IF NOT EXISTS organization_name TEXT,
  ADD COLUMN IF NOT EXISTS budget INTEGER,
  ADD COLUMN IF NOT EXISTS views INTEGER DEFAULT 0,
  ADD COLUMN IF NOT EXISTS moderation_notes TEXT;

-- Update triggers to sync Swedish and English columns
CREATE OR REPLACE FUNCTION sync_project_columns()
RETURNS TRIGGER AS $$
BEGIN
  -- Sync title <-> projektnamn
  IF NEW.title IS NOT NULL AND NEW.projektnamn IS NULL THEN
    NEW.projektnamn := NEW.title;
  ELSIF NEW.projektnamn IS NOT NULL AND NEW.title IS NULL THEN
    NEW.title := NEW.projektnamn;
  END IF;

  -- Sync description <-> full_beskrivning
  IF NEW.description IS NOT NULL AND NEW.full_beskrivning IS NULL THEN
    NEW.full_beskrivning := NEW.description;
    NEW.kort_beskrivning := LEFT(NEW.description, 200);
  ELSIF NEW.full_beskrivning IS NOT NULL AND NEW.description IS NULL THEN
    NEW.description := NEW.full_beskrivning;
  END IF;

  -- Sync location <-> stad
  IF NEW.location IS NOT NULL AND NEW.stad IS NULL THEN
    NEW.stad := NEW.location;
  ELSIF NEW.stad IS NOT NULL AND NEW.location IS NULL THEN
    NEW.location := NEW.stad;
  END IF;

  -- Sync category <-> csr_kategori
  IF NEW.category IS NOT NULL AND NEW.csr_kategori IS NULL THEN
    NEW.csr_kategori := NEW.category;
  ELSIF NEW.csr_kategori IS NOT NULL AND NEW.category IS NULL THEN
    NEW.category := NEW.csr_kategori;
  END IF;

  -- Sync un_goals <-> fn_mal
  IF NEW.un_goals IS NOT NULL AND NEW.fn_mal IS NULL THEN
    NEW.fn_mal := NEW.un_goals;
  ELSIF NEW.fn_mal IS NOT NULL AND NEW.un_goals IS NULL THEN
    NEW.un_goals := NEW.fn_mal;
  END IF;

  -- Sync views <-> view_count
  IF NEW.views IS NOT NULL AND NEW.view_count IS NULL THEN
    NEW.view_count := NEW.views;
  ELSIF NEW.view_count IS NOT NULL AND NEW.views IS NULL THEN
    NEW.views := NEW.view_count;
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add trigger to sync columns on insert/update
DROP TRIGGER IF EXISTS sync_project_columns_trigger ON projects;
CREATE TRIGGER sync_project_columns_trigger
  BEFORE INSERT OR UPDATE ON projects
  FOR EACH ROW
  EXECUTE FUNCTION sync_project_columns();

-- Update existing projects to sync columns
UPDATE projects
SET
  title = projektnamn,
  description = full_beskrivning,
  location = stad,
  category = csr_kategori,
  un_goals = fn_mal,
  views = view_count
WHERE title IS NULL;

COMMENT ON COLUMN projects.title IS 'English column name, synced with projektnamn';
COMMENT ON COLUMN projects.description IS 'English column name, synced with full_beskrivning';
COMMENT ON COLUMN projects.location IS 'English column name, synced with stad';
COMMENT ON COLUMN projects.category IS 'English column name, synced with csr_kategori';
