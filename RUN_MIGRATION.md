# Run Database Migration for Project Creation

You need to run the migration to add English column names to the `projects` table.

## Option 1: Using Supabase CLI (Recommended)

```bash
# If you have Supabase CLI installed
supabase db push

# Or apply the specific migration file
supabase migration up
```

## Option 2: Using Supabase Dashboard (Easy)

1. Go to your Supabase project dashboard
2. Click on **SQL Editor** in the left sidebar
3. Click **New query**
4. Copy and paste the entire contents of:
   `supabase/migrations/20250102000000_add_english_project_columns.sql`
5. Click **Run** or press `Ctrl+Enter`

## Option 3: Direct SQL (If you have psql access)

```bash
psql -h your-supabase-host -U postgres -d postgres -f supabase/migrations/20250102000000_add_english_project_columns.sql
```

## What This Migration Does

- Adds English column names (`title`, `description`, `category`, `location`, etc.)
- Keeps Swedish columns for backward compatibility
- Creates a trigger to automatically sync between Swedish and English columns
- Updates existing projects to sync column values

## After Running Migration

1. Refresh your browser at `http://localhost:3000/lagg-till-projekt`
2. You should see the project creation form (if logged in as APPROVED organization)
3. Fill out the form and submit
4. Check that the project is created in the database

## If Your Organization Status is Not APPROVED

The form will show a message saying you need admin approval. You need to:

1. Go to Supabase Dashboard → **Table Editor** → `organizations`
2. Find your organization by email
3. Change `status` from `VERIFIED` to `APPROVED`
4. Refresh the page and try again

## Testing the Complete Flow

1. **Login**: Go to `/logga-in` and request magic link
2. **Dashboard**: After login, you'll see the dashboard
3. **Create Project**: Click "Lägg till projekt"
4. **Fill Form**: Complete all required fields
5. **Submit**: Project will be created with `PENDING_REVIEW` status
6. **Admin Email**: Admin will receive notification email

## Expected API Response

Success response:
```json
{
  "message": "Projekt skapat! Det kommer granskas innan publicering.",
  "project_id": "uuid-here",
  "status": "PENDING_REVIEW"
}
```

Flagged content (auto-detected inappropriate content):
```json
{
  "message": "Projekt skapat! Det kommer granskas innan publicering.",
  "project_id": "uuid-here",
  "status": "FLAGGED"
}
```

## Next Steps After Project Creation

- Build admin panel to review/approve projects
- Display projects on homepage (fetch from database instead of hardcoded)
- Add "My Projects" page for organizations
- Implement image upload to Supabase Storage
