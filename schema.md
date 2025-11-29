Tables:

profiles
- id: uuid (primary key)
- first_name: text
- last_name: text
- clan_id: uuid (optional, references clans.id)

clans
- id: uuid (primary key)
- name: text

exercises
- id: uuid (primary key)
- name: text
- p_muscle: text

logs
- id: uuid (primary key)
- user_id: uuid (references profiles.id)
- exercise_id: uuid (references exercises.id)
- date: timestamptz
- reps: int
- weight: int