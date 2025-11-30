-- Ensure profiles table has the correct structure (won't modify if columns exist)
DO $$ 
BEGIN
  -- Add columns if they don't exist
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'profiles' AND column_name = 'first_name') THEN
    ALTER TABLE profiles ADD COLUMN first_name TEXT;
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'profiles' AND column_name = 'last_name') THEN
    ALTER TABLE profiles ADD COLUMN last_name TEXT;
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'profiles' AND column_name = 'clan_id') THEN
    ALTER TABLE profiles ADD COLUMN clan_id UUID;
  END IF;
END $$;

-- Enable Row Level Security (idempotent)
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist (to avoid conflicts)
DROP POLICY IF EXISTS "Users can view own profile" ON profiles;
DROP POLICY IF EXISTS "Users can insert own profile" ON profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON profiles;
DROP POLICY IF EXISTS "Enable insert for authenticated users only" ON profiles;
DROP POLICY IF EXISTS "Enable read access for all users" ON profiles;

-- Create policy to allow users to read their own profile
CREATE POLICY "Users can view own profile"
  ON profiles FOR SELECT
  USING (auth.uid() = id);

-- Note: The trigger function uses SECURITY DEFINER, so it bypasses RLS
-- But we still need a policy for manual inserts
CREATE POLICY "Enable insert for authenticated users only"
  ON profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

-- Create policy to allow users to update their own profile
CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);

-- Create or replace function to handle new user signup
-- This function runs with SECURITY DEFINER to bypass RLS
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, first_name, last_name)
  VALUES (NEW.id, COALESCE(NEW.raw_user_meta_data->>'first_name', ''), COALESCE(NEW.raw_user_meta_data->>'last_name', ''))
  ON CONFLICT (id) DO NOTHING; -- Don't error if profile already exists
  RETURN NEW;
EXCEPTION
  WHEN others THEN
    -- Log the error but don't fail the user creation
    -- This allows signup to succeed even if profile creation fails
    RAISE WARNING 'Error creating profile for user %: %', NEW.id, SQLERRM;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Drop existing trigger if it exists
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

-- Create trigger to automatically create profile on user signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

