-- Тарифы участников форума
CREATE TABLE IF NOT EXISTS packages (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    price INTEGER NOT NULL,
    vip BOOLEAN NOT NULL DEFAULT FALSE,
    benefits JSONB NOT NULL DEFAULT '[]'::jsonb,
    sort_order INTEGER NOT NULL DEFAULT 0,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at BIGINT NOT NULL,
    updated_at BIGINT NOT NULL
);

CREATE INDEX IF NOT EXISTS packages_sort_idx ON packages (sort_order);
CREATE INDEX IF NOT EXISTS packages_active_idx ON packages (is_active);
