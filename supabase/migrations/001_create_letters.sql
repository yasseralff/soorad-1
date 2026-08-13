-- Create letters table
CREATE TABLE IF NOT EXISTS letters (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  sender      TEXT NOT NULL CHECK (char_length(sender) BETWEEN 1 AND 80),
  receiver    TEXT NOT NULL CHECK (char_length(receiver) BETWEEN 1 AND 80),
  body        TEXT NOT NULL CHECK (char_length(body) BETWEEN 1 AND 4000),
  code        TEXT UNIQUE NOT NULL,
  edit_token  TEXT UNIQUE NOT NULL,
  song_url    TEXT,
  views       INTEGER NOT NULL DEFAULT 0,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Fast lookups by public code
CREATE INDEX IF NOT EXISTS idx_letters_code ON letters(code);
-- Fast lookups by private edit token
CREATE INDEX IF NOT EXISTS idx_letters_edit_token ON letters(edit_token);

-- Row-level security: letters are readable by everyone (they're shared via secret links/codes)
ALTER TABLE letters ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read" ON letters
  FOR SELECT USING (true);

CREATE POLICY "Public insert" ON letters
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Edit by token" ON letters
  FOR UPDATE USING (true);

-- Helper function to atomically increment views
CREATE OR REPLACE FUNCTION increment_letter_views(letter_code TEXT)
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  UPDATE letters SET views = views + 1 WHERE code = letter_code;
END;
$$;
