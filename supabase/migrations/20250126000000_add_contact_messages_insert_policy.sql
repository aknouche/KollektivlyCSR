-- Add INSERT policy for contact_messages table
-- This allows anyone to insert contact messages (with validation happening in API layer)
-- Previously only SELECT policy existed, blocking inserts from anon users

CREATE POLICY "Anyone can insert contact messages"
  ON contact_messages FOR INSERT
  WITH CHECK (true);

-- Note: The API route handles validation and rate limiting,
-- so we allow inserts here and rely on application-level security
