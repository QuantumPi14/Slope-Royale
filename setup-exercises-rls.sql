-- Enable Row Level Security on exercises table (if not already enabled)
ALTER TABLE exercises ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Allow public read access to exercises" ON exercises;
DROP POLICY IF EXISTS "Enable read access for all users" ON exercises;

-- Create policy to allow anyone (including anonymous users) to read exercises
-- Exercises should be publicly readable since they're reference data
CREATE POLICY "Allow public read access to exercises"
  ON exercises FOR SELECT
  USING (true);

-- Note: If you want to restrict to authenticated users only, use this instead:
-- CREATE POLICY "Allow authenticated users to read exercises"
--   ON exercises FOR SELECT
--   USING (auth.role() = 'authenticated');

