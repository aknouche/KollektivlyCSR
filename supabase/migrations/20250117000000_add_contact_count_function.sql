-- Function to auto-increment contact count
CREATE OR REPLACE FUNCTION increment_project_contact_count(project_uuid UUID)
RETURNS VOID AS $$
BEGIN
    UPDATE projects
    SET contact_count = contact_count + 1
    WHERE id = project_uuid;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
