-- Сид тарифов участников (цены от клиента: Базовый 3500, Премьер 20000, VIP 35000)
INSERT INTO packages (title, price, vip, benefits, sort_order, is_active, created_at, updated_at)
SELECT
    v.title,
    v.price,
    v.vip,
    v.benefits::jsonb,
    v.sort_order,
    TRUE,
    EXTRACT(EPOCH FROM NOW())::bigint * 1000,
    EXTRACT(EPOCH FROM NOW())::bigint * 1000
FROM (
    VALUES
        (
            'Базовый',
            3500,
            FALSE,
            '[
                {"available": true, "label": "Выставка застройщиков"},
                {"available": true, "label": "Пленарное заседание"},
                {"available": true, "label": "Раздаточные материалы"},
                {"available": true, "label": "Образовательные секции"},
                {"available": true, "label": "Квест в зоне выставки"},
                {"available": false, "label": "Путешествие в загадочный замок тевтонского ордена"},
                {"available": false, "label": "Доступ в ВИП зону"},
                {"available": false, "label": "Фуршет в ВИП зоне"},
                {"available": false, "label": "Гала ужин"}
            ]',
            0
        ),
        (
            'Премьер',
            20000,
            FALSE,
            '[
                {"available": true, "label": "Выставка застройщиков"},
                {"available": true, "label": "Пленарное заседание"},
                {"available": true, "label": "Раздаточные материалы"},
                {"available": true, "label": "Образовательные секции"},
                {"available": true, "label": "Квест в зоне выставки"},
                {"available": true, "label": "Путешествие в загадочный замок тевтонского ордена"},
                {"available": false, "label": "Доступ в ВИП зону"},
                {"available": false, "label": "Фуршет в ВИП зоне"},
                {"available": false, "label": "Гала ужин"}
            ]',
            10
        ),
        (
            'VIP',
            35000,
            TRUE,
            '[
                {"available": true, "label": "Выставка застройщиков"},
                {"available": true, "label": "Пленарное заседание"},
                {"available": true, "label": "Раздаточные материалы"},
                {"available": true, "label": "Образовательные секции"},
                {"available": true, "label": "Квест в зоне выставки"},
                {"available": true, "label": "Путешествие в загадочный замок тевтонского ордена"},
                {"available": true, "label": "Доступ в ВИП зону"},
                {"available": true, "label": "Фуршет в ВИП зоне"},
                {"available": true, "label": "Гала ужин"}
            ]',
            20
        )
) AS v(title, price, vip, benefits, sort_order)
WHERE NOT EXISTS (SELECT 1 FROM packages LIMIT 1);
