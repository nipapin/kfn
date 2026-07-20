"use client";

import { Hall, Timeline, TimelineItem } from "@/app/types/interfaces";
import {
	Add as AddIcon,
	ArrowDownward as ArrowDownIcon,
	ArrowUpward as ArrowUpIcon,
	Close as CloseIcon,
	Delete as DeleteIcon,
	Edit as EditIcon
} from "@mui/icons-material";
import {
	Alert,
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
import { useEffect, useState } from "react";

const emptyItem = (): TimelineItem => ({ name: "", time: "", description: "", speakers: "" });
const emptyHall = (): Hall => ({ name: "", content: [emptyItem()] });

type FormState = {
	rowId?: number;
	id: string;
	title: string;
	description: string;
	date: string;
	content: TimelineItem[];
	halls: Hall[];
	isActive: boolean;
};

const emptyForm: FormState = {
	id: "business",
	title: "",
	description: "",
	date: "",
	content: [emptyItem()],
	halls: [emptyHall()],
	isActive: true
};

const toForm = (t: Timeline): FormState => ({
	rowId: t.rowId,
	id: t.id,
	title: t.title,
	description: t.description,
	date: t.date,
	content: t.content.length > 0 ? t.content.map((c) => ({ ...c, speakers: c.speakers ?? "" })) : [emptyItem()],
	halls:
		t.halls.length > 0
			? t.halls.map((h) => ({
					name: h.name,
					content: h.content.length > 0 ? h.content.map((c) => ({ ...c })) : [emptyItem()]
			  }))
			: [emptyHall()],
	isActive: t.isActive ?? true
});

const cleanItem = (item: TimelineItem): TimelineItem => {
	const cleaned: TimelineItem = {
		name: item.name.trim(),
		time: item.time.trim(),
		description: item.description?.trim() ?? ""
	};
	if (item.speakers?.trim()) cleaned.speakers = item.speakers.trim();
	return cleaned;
};

const toPayload = (f: FormState, sortOrder: number): Timeline => ({
	rowId: f.rowId,
	id: f.id.trim(),
	title: f.title.trim(),
	description: f.description.trim(),
	date: f.date.trim(),
	content: f.content.map(cleanItem).filter((c) => c.name.length > 0 || c.time.length > 0),
	halls: f.halls
		.map((h) => ({
			name: h.name.trim(),
			content: h.content.map(cleanItem).filter((c) => c.name.length > 0 || c.time.length > 0)
		}))
		.filter((h) => h.name.length > 0 || h.content.length > 0),
	sortOrder,
	isActive: f.isActive
});

function ItemEditor({
	item,
	onChange,
	onRemove,
	onMoveUp,
	onMoveDown,
	canRemove,
	showSpeakers
}: {
	item: TimelineItem;
	onChange: (patch: Partial<TimelineItem>) => void;
	onRemove: () => void;
	onMoveUp: () => void;
	onMoveDown: () => void;
	canRemove: boolean;
	showSpeakers?: boolean;
}) {
	return (
		<Paper variant='outlined' sx={{ p: 1.5 }}>
			<Stack direction='row' spacing={1} alignItems='flex-start'>
				<Stack>
					<IconButton size='small' onClick={onMoveUp}>
						<ArrowUpIcon fontSize='small' />
					</IconButton>
					<IconButton size='small' onClick={onMoveDown}>
						<ArrowDownIcon fontSize='small' />
					</IconButton>
				</Stack>
				<Stack spacing={1} flex={1}>
					<Stack direction={{ xs: "column", sm: "row" }} spacing={1}>
						<TextField size='small' label='Время' value={item.time} onChange={(e) => onChange({ time: e.target.value })} sx={{ minWidth: 140 }} />
						<TextField size='small' label='Название / спикер' value={item.name} onChange={(e) => onChange({ name: e.target.value })} fullWidth />
					</Stack>
					<TextField
						size='small'
						label='Описание'
						value={item.description}
						onChange={(e) => onChange({ description: e.target.value })}
						multiline
						minRows={2}
						fullWidth
					/>
					{showSpeakers && (
						<TextField
							size='small'
							label='Спикеры (строка)'
							value={item.speakers ?? ""}
							onChange={(e) => onChange({ speakers: e.target.value })}
							fullWidth
							helperText='Необязательно. Для пленарных блоков.'
						/>
					)}
				</Stack>
				<IconButton size='small' color='error' onClick={onRemove} disabled={!canRemove}>
					<DeleteIcon fontSize='small' />
				</IconButton>
			</Stack>
		</Paper>
	);
}

export default function ProgramAdmin() {
	const [items, setItems] = useState<Timeline[]>([]);
	const [loading, setLoading] = useState(true);
	const [open, setOpen] = useState(false);
	const [form, setForm] = useState<FormState>(emptyForm);
	const [saving, setSaving] = useState(false);
	const [toast, setToast] = useState<{ type: "success" | "error"; message: string } | null>(null);
	const [deleteId, setDeleteId] = useState<number | null>(null);

	const load = async (showSpinner = false) => {
		if (showSpinner) setLoading(true);
		try {
			const res = await fetch("/api/program-days?all=true");
			setItems((await res.json()) as Timeline[]);
		} catch {
			setToast({ type: "error", message: "Не удалось загрузить программу" });
		} finally {
			if (showSpinner) setLoading(false);
		}
	};

	useEffect(() => {
		load(true);
	}, []);

	const handleSave = async () => {
		if (!form.id.trim() || !form.title.trim()) {
			setToast({ type: "error", message: "Укажите slug и название дня" });
			return;
		}
		setSaving(true);
		try {
			const isUpdate = Boolean(form.rowId);
			const existing = items.find((p) => p.rowId === form.rowId);
			const nextSort = isUpdate ? existing?.sortOrder ?? 0 : (items[items.length - 1]?.sortOrder ?? 0) + 10;
			const res = await fetch("/api/program-days", {
				method: isUpdate ? "PUT" : "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(toPayload(form, nextSort))
			});
			if (!res.ok) {
				const err = await res.json().catch(() => ({}));
				throw new Error(err.message ?? "Ошибка сохранения");
			}
			setToast({ type: "success", message: isUpdate ? "День обновлён" : "День создан" });
			setOpen(false);
			await load(false);
		} catch (e) {
			setToast({ type: "error", message: e instanceof Error ? e.message : "Ошибка" });
		} finally {
			setSaving(false);
		}
	};

	const persistOrder = async (ordered: Timeline[]) => {
		const ids = ordered.map((p) => p.rowId).filter((id): id is number => typeof id === "number");
		try {
			const res = await fetch("/api/program-days/reorder", {
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
			const res = await fetch(`/api/program-days?id=${deleteId}`, { method: "DELETE" });
			if (!res.ok) throw new Error("Не удалось удалить");
			setItems((prev) => prev.filter((p) => p.rowId !== deleteId));
			setToast({ type: "success", message: "Удалено" });
			setDeleteId(null);
		} catch (e) {
			setToast({ type: "error", message: e instanceof Error ? e.message : "Ошибка" });
		}
	};

	const handleToggleActive = async (item: Timeline) => {
		const nextValue = !(item.isActive ?? true);
		setItems((prev) => prev.map((p) => (p.rowId === item.rowId ? { ...p, isActive: nextValue } : p)));
		try {
			const res = await fetch("/api/program-days", {
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

	const moveContent = (index: number, direction: -1 | 1) => {
		const target = index + direction;
		if (target < 0 || target >= form.content.length) return;
		setForm((prev) => {
			const next = prev.content.slice();
			[next[index], next[target]] = [next[target], next[index]];
			return { ...prev, content: next };
		});
	};

	const moveHall = (index: number, direction: -1 | 1) => {
		const target = index + direction;
		if (target < 0 || target >= form.halls.length) return;
		setForm((prev) => {
			const next = prev.halls.slice();
			[next[index], next[target]] = [next[target], next[index]];
			return { ...prev, halls: next };
		});
	};

	const moveHallItem = (hallIndex: number, itemIndex: number, direction: -1 | 1) => {
		setForm((prev) => {
			const hall = prev.halls[hallIndex];
			const target = itemIndex + direction;
			if (target < 0 || target >= hall.content.length) return prev;
			const content = hall.content.slice();
			[content[itemIndex], content[target]] = [content[target], content[itemIndex]];
			const halls = prev.halls.slice();
			halls[hallIndex] = { ...hall, content };
			return { ...prev, halls };
		});
	};

	return (
		<Box sx={{ flexGrow: 1, pb: "6rem" }}>
			<Stack direction='row' justifyContent='space-between' alignItems='center' mb={3}>
				<Box>
					<Typography variant='h5' fontWeight={600}>
						Деловая программа
					</Typography>
					<Typography variant='body2' color='text.secondary'>
						Для обеда укажите точное имя слота «Обед» — по нему строится утро/вечер на сайте.
					</Typography>
				</Box>
				<Button
					variant='contained'
					startIcon={<AddIcon />}
					onClick={() => {
						setForm({ ...emptyForm, content: [emptyItem()], halls: [emptyHall()] });
						setOpen(true);
					}}
				>
					Добавить день
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
								<TableCell>День</TableCell>
								<TableCell>Slug</TableCell>
								<TableCell width={100}>Активен</TableCell>
								<TableCell width={120} align='right'>
									Действия
								</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{loading ? (
								<TableRow>
									<TableCell colSpan={5} align='center' sx={{ py: 6 }}>
										<CircularProgress />
									</TableCell>
								</TableRow>
							) : items.length === 0 ? (
								<TableRow>
									<TableCell colSpan={5} align='center' sx={{ py: 6 }}>
										<Typography color='text.secondary'>Пока пусто</Typography>
									</TableCell>
								</TableRow>
							) : (
								items.map((item, index) => (
									<TableRow key={item.rowId ?? `${item.id}-${item.date}`} hover>
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
											<Typography variant='body2' fontWeight={500}>
												{item.title}
											</Typography>
											<Typography variant='caption' color='text.secondary'>
												{item.date} · {item.content.length} слотов · {item.halls.length} залов
											</Typography>
										</TableCell>
										<TableCell>
											<Typography variant='caption'>/{item.id}</Typography>
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

			<Dialog open={open} onClose={() => !saving && setOpen(false)} maxWidth='lg' fullWidth>
				<DialogTitle>
					{form.rowId ? "Редактировать день" : "Новый день программы"}
					<IconButton onClick={() => setOpen(false)} sx={{ position: "absolute", right: 8, top: 8 }} disabled={saving}>
						<CloseIcon />
					</IconButton>
				</DialogTitle>
				<DialogContent dividers>
					<Stack spacing={3} pt={1}>
						<Alert severity='info'>
							Slug <code>business</code> — деловая программа. Несколько дней с одним slug показываются на одной странице. Слот с именем{" "}
							<strong>Обед</strong> делит утро и вечер; залы режутся по времени относительно 13:00.
						</Alert>
						<Stack direction={{ xs: "column", md: "row" }} spacing={2}>
							<TextField
								label='Slug'
								value={form.id}
								onChange={(e) => setForm({ ...form, id: e.target.value })}
								helperText='Обычно business'
								required
								fullWidth
							/>
							<TextField label='Дата' value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} fullWidth />
						</Stack>
						<TextField label='Заголовок' value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required fullWidth />
						<TextField
							label='Описание'
							value={form.description}
							onChange={(e) => setForm({ ...form, description: e.target.value })}
							multiline
							minRows={2}
							fullWidth
						/>

						<Box>
							<Stack direction='row' justifyContent='space-between' alignItems='center' mb={1}>
								<Typography variant='subtitle2'>Общая программа (content)</Typography>
								<Button size='small' startIcon={<AddIcon />} onClick={() => setForm((p) => ({ ...p, content: [...p.content, emptyItem()] }))}>
									Слот
								</Button>
							</Stack>
							<Stack spacing={1.5}>
								{form.content.map((item, index) => (
									<ItemEditor
										key={index}
										item={item}
										showSpeakers
										canRemove={form.content.length > 1}
										onChange={(patch) =>
											setForm((prev) => ({
												...prev,
												content: prev.content.map((c, i) => (i === index ? { ...c, ...patch } : c))
											}))
										}
										onRemove={() =>
											setForm((prev) => ({
												...prev,
												content: prev.content.filter((_, i) => i !== index)
											}))
										}
										onMoveUp={() => moveContent(index, -1)}
										onMoveDown={() => moveContent(index, 1)}
									/>
								))}
							</Stack>
						</Box>

						<Box>
							<Stack direction='row' justifyContent='space-between' alignItems='center' mb={1}>
								<Typography variant='subtitle2'>Залы (параллельные секции)</Typography>
								<Button size='small' startIcon={<AddIcon />} onClick={() => setForm((p) => ({ ...p, halls: [...p.halls, emptyHall()] }))}>
									Зал
								</Button>
							</Stack>
							<Stack spacing={2}>
								{form.halls.map((hall, hallIndex) => (
									<Paper key={hallIndex} variant='outlined' sx={{ p: 2 }}>
										<Stack direction='row' spacing={1} alignItems='center' mb={1.5}>
											<Stack>
												<IconButton size='small' onClick={() => moveHall(hallIndex, -1)} disabled={hallIndex === 0}>
													<ArrowUpIcon fontSize='small' />
												</IconButton>
												<IconButton size='small' onClick={() => moveHall(hallIndex, 1)} disabled={hallIndex === form.halls.length - 1}>
													<ArrowDownIcon fontSize='small' />
												</IconButton>
											</Stack>
											<TextField
												size='small'
												label='Название зала'
												value={hall.name}
												onChange={(e) =>
													setForm((prev) => {
														const halls = prev.halls.slice();
														halls[hallIndex] = { ...hall, name: e.target.value };
														return { ...prev, halls };
													})
												}
												fullWidth
											/>
											<Button
												size='small'
												startIcon={<AddIcon />}
												onClick={() =>
													setForm((prev) => {
														const halls = prev.halls.slice();
														halls[hallIndex] = { ...hall, content: [...hall.content, emptyItem()] };
														return { ...prev, halls };
													})
												}
											>
												Слот
											</Button>
											<IconButton
												size='small'
												color='error'
												disabled={form.halls.length <= 1}
												onClick={() =>
													setForm((prev) => ({
														...prev,
														halls: prev.halls.filter((_, i) => i !== hallIndex)
													}))
												}
											>
												<DeleteIcon fontSize='small' />
											</IconButton>
										</Stack>
										<Stack spacing={1.5}>
											{hall.content.map((item, itemIndex) => (
												<ItemEditor
													key={itemIndex}
													item={item}
													canRemove={hall.content.length > 1}
													onChange={(patch) =>
														setForm((prev) => {
															const halls = prev.halls.slice();
															const content = hall.content.map((c, i) => (i === itemIndex ? { ...c, ...patch } : c));
															halls[hallIndex] = { ...hall, content };
															return { ...prev, halls };
														})
													}
													onRemove={() =>
														setForm((prev) => {
															const halls = prev.halls.slice();
															halls[hallIndex] = {
																...hall,
																content: hall.content.filter((_, i) => i !== itemIndex)
															};
															return { ...prev, halls };
														})
													}
													onMoveUp={() => moveHallItem(hallIndex, itemIndex, -1)}
													onMoveDown={() => moveHallItem(hallIndex, itemIndex, 1)}
												/>
											))}
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
				<DialogTitle>Удалить день программы?</DialogTitle>
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
