"use client";

import { TourContentItem, TourItem } from "@/app/types/interfaces";
import {
	Add as AddIcon,
	ArrowDownward as ArrowDownIcon,
	ArrowUpward as ArrowUpIcon,
	Close as CloseIcon,
	Delete as DeleteIcon,
	Edit as EditIcon,
	Upload as UploadIcon
} from "@mui/icons-material";
import {
	Alert,
	Avatar,
	Box,
	Button,
	CircularProgress,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	FormControlLabel,
	IconButton,
	Paper,
	Snackbar,
	Stack,
	Switch,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	TextField,
	Typography
} from "@mui/material";
import { useEffect, useRef, useState } from "react";

type FormState = {
	rowId?: number;
	id: string;
	name: string;
	type: string;
	description: string;
	price: string;
	image: string;
	content: TourContentItem[];
	isActive: boolean;
};

const emptyStop = (id: number): TourContentItem => ({ id, time: "", title: "", description: "" });

const emptyForm: FormState = {
	id: "",
	name: "",
	type: "",
	description: "",
	price: "0",
	image: "",
	content: [emptyStop(1)],
	isActive: true
};

const toForm = (t: TourItem): FormState => ({
	rowId: t.rowId,
	id: t.id,
	name: t.name,
	type: t.type,
	description: t.description,
	price: String(t.price),
	image: t.image,
	content: t.content.length > 0 ? t.content.map((c) => ({ ...c })) : [emptyStop(1)],
	isActive: t.isActive ?? true
});

const toPayload = (f: FormState, sortOrder: number): TourItem => ({
	rowId: f.rowId,
	id: f.id.trim(),
	name: f.name.trim(),
	type: f.type.trim(),
	description: f.description.trim(),
	price: Number(f.price),
	image: f.image.trim(),
	content: f.content
		.map((c, i) => ({
			id: i + 1,
			time: c.time.trim(),
			title: c.title.trim(),
			description: c.description?.trim() ?? ""
		}))
		.filter((c) => c.title.length > 0 || c.time.length > 0),
	sortOrder,
	isActive: f.isActive
});

export default function ToursAdmin() {
	const [items, setItems] = useState<TourItem[]>([]);
	const [loading, setLoading] = useState(true);
	const [open, setOpen] = useState(false);
	const [form, setForm] = useState<FormState>(emptyForm);
	const [saving, setSaving] = useState(false);
	const [uploading, setUploading] = useState(false);
	const [toast, setToast] = useState<{ type: "success" | "error"; message: string } | null>(null);
	const [deleteId, setDeleteId] = useState<number | null>(null);
	const imageInputRef = useRef<HTMLInputElement>(null);

	const load = async (showSpinner = false) => {
		if (showSpinner) setLoading(true);
		try {
			const res = await fetch("/api/tours?all=true");
			setItems((await res.json()) as TourItem[]);
		} catch {
			setToast({ type: "error", message: "Не удалось загрузить туры" });
		} finally {
			if (showSpinner) setLoading(false);
		}
	};

	useEffect(() => {
		load(true);
	}, []);

	const handleSave = async () => {
		if (!form.id.trim() || !form.name.trim()) {
			setToast({ type: "error", message: "Укажите slug и название" });
			return;
		}
		setSaving(true);
		try {
			const isUpdate = Boolean(form.rowId);
			const existing = items.find((p) => p.rowId === form.rowId);
			const nextSort = isUpdate ? existing?.sortOrder ?? 0 : (items[items.length - 1]?.sortOrder ?? 0) + 10;
			const res = await fetch("/api/tours", {
				method: isUpdate ? "PUT" : "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(toPayload(form, nextSort))
			});
			if (!res.ok) {
				const err = await res.json().catch(() => ({}));
				throw new Error(err.message ?? "Ошибка сохранения");
			}
			setToast({ type: "success", message: isUpdate ? "Тур обновлён" : "Тур создан" });
			setOpen(false);
			await load(false);
		} catch (e) {
			setToast({ type: "error", message: e instanceof Error ? e.message : "Ошибка" });
		} finally {
			setSaving(false);
		}
	};

	const persistOrder = async (ordered: TourItem[]) => {
		const ids = ordered.map((p) => p.rowId).filter((id): id is number => typeof id === "number");
		try {
			const res = await fetch("/api/tours/reorder", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ ids })
			});
			if (!res.ok) throw new Error("Не удалось сохранить порядок");
		} catch (e) {
			setToast({ type: "error", message: e instanceof Error ? e.message : "Ошибка" });
			load(false);
		}
	};

	const handleMove = (index: number, direction: -1 | 1) => {
		const target = index + direction;
		if (target < 0 || target >= items.length) return;
		const next = items.slice();
		[next[index], next[target]] = [next[target], next[index]];
		const reindexed = next.map((p, i) => ({ ...p, sortOrder: i * 10 }));
		setItems(reindexed);
		persistOrder(reindexed);
	};

	const handleDelete = async () => {
		if (!deleteId) return;
		try {
			const res = await fetch(`/api/tours?id=${deleteId}`, { method: "DELETE" });
			if (!res.ok) throw new Error("Не удалось удалить");
			setItems((prev) => prev.filter((p) => p.rowId !== deleteId));
			setToast({ type: "success", message: "Удалено" });
			setDeleteId(null);
		} catch (e) {
			setToast({ type: "error", message: e instanceof Error ? e.message : "Ошибка" });
		}
	};

	const handleToggleActive = async (item: TourItem) => {
		const nextValue = !(item.isActive ?? true);
		setItems((prev) => prev.map((p) => (p.rowId === item.rowId ? { ...p, isActive: nextValue } : p)));
		try {
			const res = await fetch("/api/tours", {
				method: "PUT",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ ...item, isActive: nextValue })
			});
			if (!res.ok) throw new Error("Не удалось изменить статус");
		} catch (e) {
			setItems((prev) => prev.map((p) => (p.rowId === item.rowId ? { ...p, isActive: item.isActive ?? true } : p)));
			setToast({ type: "error", message: e instanceof Error ? e.message : "Ошибка" });
		}
	};

	const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (!file) return;
		setUploading(true);
		try {
			const formData = new FormData();
			formData.append("file", file);
			formData.append("folder", "tours");
			const res = await fetch("/api/upload", { method: "POST", body: formData });
			if (!res.ok) {
				const err = await res.json().catch(() => ({}));
				throw new Error(err.message ?? "Ошибка загрузки");
			}
			const { src } = (await res.json()) as { src: string };
			setForm((prev) => ({ ...prev, image: src }));
		} catch (err) {
			setToast({ type: "error", message: err instanceof Error ? err.message : "Ошибка загрузки" });
		} finally {
			setUploading(false);
			if (imageInputRef.current) imageInputRef.current.value = "";
		}
	};

	const updateStop = (index: number, patch: Partial<TourContentItem>) => {
		setForm((prev) => ({
			...prev,
			content: prev.content.map((c, i) => (i === index ? { ...c, ...patch } : c))
		}));
	};

	const moveStop = (index: number, direction: -1 | 1) => {
		const target = index + direction;
		if (target < 0 || target >= form.content.length) return;
		setForm((prev) => {
			const next = prev.content.slice();
			[next[index], next[target]] = [next[target], next[index]];
			return { ...prev, content: next };
		});
	};

	return (
		<Box sx={{ flexGrow: 1, pb: "6rem" }}>
			<Stack direction='row' justifyContent='space-between' alignItems='center' mb={3}>
				<Typography variant='h5' fontWeight={600}>
					Брокер-туры
				</Typography>
				<Button
					variant='contained'
					startIcon={<AddIcon />}
					onClick={() => {
						setForm({ ...emptyForm, content: [emptyStop(1)] });
						setOpen(true);
					}}
				>
					Добавить
				</Button>
			</Stack>

			<Paper>
				<TableContainer>
					<Table>
						<TableHead>
							<TableRow>
								<TableCell width={90} align='center'>
									Порядок
								</TableCell>
								<TableCell>Фото</TableCell>
								<TableCell>Название</TableCell>
								<TableCell>Тип</TableCell>
								<TableCell width={100}>Цена</TableCell>
								<TableCell width={100}>Активен</TableCell>
								<TableCell width={120} align='right'>
									Действия
								</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{loading ? (
								<TableRow>
									<TableCell colSpan={7} align='center' sx={{ py: 6 }}>
										<CircularProgress />
									</TableCell>
								</TableRow>
							) : items.length === 0 ? (
								<TableRow>
									<TableCell colSpan={7} align='center' sx={{ py: 6 }}>
										<Typography color='text.secondary'>Пока пусто</Typography>
									</TableCell>
								</TableRow>
							) : (
								items.map((item, index) => (
									<TableRow key={item.rowId ?? item.id} hover>
										<TableCell align='center' sx={{ p: 0.5 }}>
											<Stack direction='column' alignItems='center'>
												<IconButton size='small' onClick={() => handleMove(index, -1)} disabled={index === 0}>
													<ArrowUpIcon fontSize='small' />
												</IconButton>
												<IconButton size='small' onClick={() => handleMove(index, 1)} disabled={index === items.length - 1}>
													<ArrowDownIcon fontSize='small' />
												</IconButton>
											</Stack>
										</TableCell>
										<TableCell>
											<Avatar src={item.image} variant='rounded' sx={{ width: 56, height: 56 }} />
										</TableCell>
										<TableCell>
											<Typography variant='body2' fontWeight={500}>
												{item.name}
											</Typography>
											<Typography variant='caption' color='text.secondary'>
												/{item.id} · {item.content.length} остановок
											</Typography>
										</TableCell>
										<TableCell>{item.type}</TableCell>
										<TableCell>
											{item.price.toLocaleString("ru", { style: "currency", currency: "RUB", maximumFractionDigits: 0 })}
										</TableCell>
										<TableCell>
											<Switch checked={item.isActive ?? true} onChange={() => handleToggleActive(item)} size='small' />
										</TableCell>
										<TableCell align='right'>
											<IconButton
												size='small'
												onClick={() => {
													setForm(toForm(item));
													setOpen(true);
												}}
											>
												<EditIcon fontSize='small' />
											</IconButton>
											<IconButton size='small' color='error' onClick={() => item.rowId && setDeleteId(item.rowId)}>
												<DeleteIcon fontSize='small' />
											</IconButton>
										</TableCell>
									</TableRow>
								))
							)}
						</TableBody>
					</Table>
				</TableContainer>
			</Paper>

			<Dialog open={open} onClose={() => !saving && setOpen(false)} maxWidth='md' fullWidth>
				<DialogTitle>
					{form.rowId ? "Редактировать тур" : "Новый тур"}
					<IconButton onClick={() => setOpen(false)} sx={{ position: "absolute", right: 8, top: 8 }} disabled={saving}>
						<CloseIcon />
					</IconButton>
				</DialogTitle>
				<DialogContent dividers>
					<Stack spacing={2} pt={1}>
						<TextField
							label='Slug (URL)'
							value={form.id}
							onChange={(e) => setForm({ ...form, id: e.target.value })}
							helperText='Латиница, цифры, дефис'
							required
							fullWidth
						/>
						<TextField label='Название' value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required fullWidth />
						<TextField label='Тип / направление' value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })} fullWidth />
						<TextField
							label='Описание'
							value={form.description}
							onChange={(e) => setForm({ ...form, description: e.target.value })}
							multiline
							minRows={3}
							fullWidth
						/>
						<TextField
							label='Цена (₽)'
							type='number'
							value={form.price}
							onChange={(e) => setForm({ ...form, price: e.target.value })}
							fullWidth
						/>
						<Stack direction='row' spacing={2} alignItems='center'>
							{form.image && <Avatar src={form.image} variant='rounded' sx={{ width: 80, height: 60 }} />}
							<Button
								variant='outlined'
								startIcon={uploading ? <CircularProgress size={16} /> : <UploadIcon />}
								onClick={() => imageInputRef.current?.click()}
								disabled={uploading}
							>
								Загрузить фото
							</Button>
							<input ref={imageInputRef} type='file' hidden accept='image/*' onChange={handleImageUpload} />
						</Stack>
						<TextField label='URL изображения' value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} fullWidth />

						<Box>
							<Stack direction='row' justifyContent='space-between' alignItems='center' mb={1}>
								<Typography variant='subtitle2'>Маршрут</Typography>
								<Button
									size='small'
									startIcon={<AddIcon />}
									onClick={() => setForm((prev) => ({ ...prev, content: [...prev.content, emptyStop(prev.content.length + 1)] }))}
								>
									Остановка
								</Button>
							</Stack>
							<Stack spacing={1.5}>
								{form.content.map((stop, index) => (
									<Paper key={index} variant='outlined' sx={{ p: 1.5 }}>
										<Stack direction='row' spacing={1} alignItems='flex-start'>
											<Stack>
												<IconButton size='small' onClick={() => moveStop(index, -1)} disabled={index === 0}>
													<ArrowUpIcon fontSize='small' />
												</IconButton>
												<IconButton size='small' onClick={() => moveStop(index, 1)} disabled={index === form.content.length - 1}>
													<ArrowDownIcon fontSize='small' />
												</IconButton>
											</Stack>
											<Stack spacing={1} flex={1}>
												<Stack direction={{ xs: "column", sm: "row" }} spacing={1}>
													<TextField
														size='small'
														label='Время'
														value={stop.time}
														onChange={(e) => updateStop(index, { time: e.target.value })}
														sx={{ minWidth: 140 }}
													/>
													<TextField
														size='small'
														label='Название'
														value={stop.title}
														onChange={(e) => updateStop(index, { title: e.target.value })}
														fullWidth
													/>
												</Stack>
												<TextField
													size='small'
													label='Описание'
													value={stop.description}
													onChange={(e) => updateStop(index, { description: e.target.value })}
													multiline
													minRows={2}
													fullWidth
												/>
											</Stack>
											<IconButton
												size='small'
												color='error'
												onClick={() =>
													setForm((prev) => ({
														...prev,
														content: prev.content.length <= 1 ? prev.content : prev.content.filter((_, i) => i !== index)
													}))
												}
												disabled={form.content.length <= 1}
											>
												<DeleteIcon fontSize='small' />
											</IconButton>
										</Stack>
									</Paper>
								))}
							</Stack>
						</Box>

						<FormControlLabel
							control={<Switch checked={form.isActive} onChange={(e) => setForm({ ...form, isActive: e.target.checked })} />}
							label='Показывать на сайте'
						/>
					</Stack>
				</DialogContent>
				<DialogActions sx={{ px: 3, py: 2 }}>
					<Button onClick={() => setOpen(false)} disabled={saving}>
						Отмена
					</Button>
					<Button variant='contained' onClick={handleSave} disabled={saving}>
						Сохранить
					</Button>
				</DialogActions>
			</Dialog>

			<Dialog open={deleteId !== null} onClose={() => setDeleteId(null)} maxWidth='xs' fullWidth>
				<DialogTitle>Удалить тур?</DialogTitle>
				<DialogActions>
					<Button onClick={() => setDeleteId(null)}>Отмена</Button>
					<Button color='error' variant='contained' onClick={handleDelete}>
						Удалить
					</Button>
				</DialogActions>
			</Dialog>

			<Snackbar open={Boolean(toast)} autoHideDuration={4000} onClose={() => setToast(null)} anchorOrigin={{ vertical: "bottom", horizontal: "right" }}>
				{toast ? (
					<Alert severity={toast.type} onClose={() => setToast(null)} variant='filled'>
						{toast.message}
					</Alert>
				) : undefined}
			</Snackbar>
		</Box>
	);
}
