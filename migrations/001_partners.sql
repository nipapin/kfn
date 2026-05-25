-- Таблица партнёров/спонсоров форума
CREATE TABLE IF NOT EXISTS partners (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    type VARCHAR(255),
    description TEXT NOT NULL,
    body TEXT,
    image_src TEXT NOT NULL,
    image_width INTEGER NOT NULL,
    image_height INTEGER NOT NULL,
    image_alt VARCHAR(255) NOT NULL,
    video_src TEXT,
    video_width INTEGER,
    video_height INTEGER,
    video_poster TEXT,
    sort_order INTEGER NOT NULL DEFAULT 0,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at BIGINT NOT NULL,
    updated_at BIGINT NOT NULL
);

CREATE INDEX IF NOT EXISTS partners_sort_idx ON partners (sort_order);
CREATE INDEX IF NOT EXISTS partners_active_idx ON partners (is_active);
