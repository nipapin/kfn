import { ParticipationPackage } from "@/app/types/interfaces";

/** Fallback until packages table is migrated; keep in sync with migrations/004_packages_seed.sql */
export const FALLBACK_PACKAGES: ParticipationPackage[] = [
	{
		id: 1,
		title: "Базовый",
		price: 3500,
		vip: false,
		benefits: [
			{ available: true, label: "Выставка застройщиков" },
			{ available: true, label: "Пленарное заседание" },
			{ available: true, label: "Раздаточные материалы" },
			{ available: true, label: "Образовательные секции" },
			{ available: true, label: "Квест в зоне выставки" },
			{ available: false, label: "Путешествие в загадочный замок тевтонского ордена" },
			{ available: false, label: "Доступ в ВИП зону" },
			{ available: false, label: "Фуршет в ВИП зоне" },
			{ available: false, label: "Гала ужин" }
		]
	},
	{
		id: 2,
		title: "Премьер",
		price: 20000,
		vip: false,
		benefits: [
			{ available: true, label: "Выставка застройщиков" },
			{ available: true, label: "Пленарное заседание" },
			{ available: true, label: "Раздаточные материалы" },
			{ available: true, label: "Образовательные секции" },
			{ available: true, label: "Квест в зоне выставки" },
			{ available: true, label: "Путешествие в загадочный замок тевтонского ордена" },
			{ available: false, label: "Доступ в ВИП зону" },
			{ available: false, label: "Фуршет в ВИП зоне" },
			{ available: false, label: "Гала ужин" }
		]
	},
	{
		id: 3,
		title: "VIP",
		price: 35000,
		vip: true,
		benefits: [
			{ available: true, label: "Выставка застройщиков" },
			{ available: true, label: "Пленарное заседание" },
			{ available: true, label: "Раздаточные материалы" },
			{ available: true, label: "Образовательные секции" },
			{ available: true, label: "Квест в зоне выставки" },
			{ available: true, label: "Путешествие в загадочный замок тевтонского ордена" },
			{ available: true, label: "Доступ в ВИП зону" },
			{ available: true, label: "Фуршет в ВИП зоне" },
			{ available: true, label: "Гала ужин" }
		]
	}
];
