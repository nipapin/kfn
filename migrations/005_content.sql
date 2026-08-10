-- Доп. мероприятия, программа, туры
CREATE TABLE IF NOT EXISTS entertainments (
    id SERIAL PRIMARY KEY,
    slug VARCHAR(255) NOT NULL UNIQUE,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    price INTEGER NOT NULL DEFAULT 0,
    image TEXT NOT NULL,
    special BOOLEAN NOT NULL DEFAULT FALSE,
    sort_order INTEGER NOT NULL DEFAULT 0,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at BIGINT NOT NULL,
    updated_at BIGINT NOT NULL
);

CREATE INDEX IF NOT EXISTS entertainments_sort_idx ON entertainments (sort_order);
CREATE INDEX IF NOT EXISTS entertainments_active_idx ON entertainments (is_active);

CREATE TABLE IF NOT EXISTS program_days (
    id SERIAL PRIMARY KEY,
    slug VARCHAR(255) NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL DEFAULT '',
    date VARCHAR(255) NOT NULL DEFAULT '',
    halls JSONB NOT NULL DEFAULT '[]'::jsonb,
    content JSONB NOT NULL DEFAULT '[]'::jsonb,
    sort_order INTEGER NOT NULL DEFAULT 0,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at BIGINT NOT NULL,
    updated_at BIGINT NOT NULL
);

CREATE INDEX IF NOT EXISTS program_days_slug_idx ON program_days (slug);
CREATE INDEX IF NOT EXISTS program_days_sort_idx ON program_days (sort_order);
CREATE INDEX IF NOT EXISTS program_days_active_idx ON program_days (is_active);

CREATE TABLE IF NOT EXISTS tours (
    id SERIAL PRIMARY KEY,
    slug VARCHAR(255) NOT NULL UNIQUE,
    name VARCHAR(255) NOT NULL,
    type VARCHAR(255) NOT NULL DEFAULT '',
    description TEXT NOT NULL DEFAULT '',
    price INTEGER NOT NULL DEFAULT 0,
    image TEXT NOT NULL DEFAULT '',
    content JSONB NOT NULL DEFAULT '[]'::jsonb,
    sort_order INTEGER NOT NULL DEFAULT 0,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at BIGINT NOT NULL,
    updated_at BIGINT NOT NULL
);

CREATE INDEX IF NOT EXISTS tours_sort_idx ON tours (sort_order);
CREATE INDEX IF NOT EXISTS tours_active_idx ON tours (is_active);
