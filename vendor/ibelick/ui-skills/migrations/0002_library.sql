CREATE TABLE saved_skill (
  user_id TEXT NOT NULL REFERENCES auth_user(id) ON DELETE CASCADE,
  skill_path TEXT NOT NULL,
  created_at INTEGER NOT NULL,
  PRIMARY KEY (user_id, skill_path)
);
CREATE INDEX saved_skill_user_created_idx ON saved_skill(user_id, created_at);

CREATE TABLE user_collection (
  id TEXT PRIMARY KEY NOT NULL,
  user_id TEXT NOT NULL REFERENCES auth_user(id) ON DELETE CASCADE,
  slug TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  created_at INTEGER NOT NULL,
  updated_at INTEGER NOT NULL
);
CREATE UNIQUE INDEX user_collection_user_slug_idx ON user_collection(user_id, slug);
CREATE INDEX user_collection_user_updated_idx ON user_collection(user_id, updated_at);

CREATE TABLE user_collection_skill (
  collection_id TEXT NOT NULL REFERENCES user_collection(id) ON DELETE CASCADE,
  skill_path TEXT NOT NULL,
  position INTEGER NOT NULL,
  created_at INTEGER NOT NULL,
  PRIMARY KEY (collection_id, skill_path)
);
CREATE INDEX user_collection_skill_order_idx ON user_collection_skill(collection_id, position);
