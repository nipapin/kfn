"use client";

import { PackageBenefit, ParticipationPackage } from "@/app/types/interfaces";
import {
	Add as AddIcon,
	ArrowDownward as ArrowDownIcon,
	ArrowUpward as ArrowUpIcon,
	Check as CheckIcon,
	Close as CloseIcon,
	Delete as DeleteIcon,
	Edit as EditIcon
} from "@mui/icons-material";
import {
	Alert,
	Box,
	Button,
	Checkbox,
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
	Tooltip,
	Typography
} from "@mui/material";
import { useEffect, useState } from "react";

type FormState = {
	id?: number;
	title: string;
	price: string;
	vip: boolean;
	benefits: PackageBenefit[];
	isActive: boolean;
};

const emptyBenefit = (): PackageBenefit => ({ available: true, label: "" });

const emptyForm: FormState = {
	title: "",
	price: "0",
	vip: false,
	benefits: [emptyBenefit()],
	isActive: true
};

const packageToForm = (p: ParticipationPackage): FormState => ({
	id: p.id,
	title: p.title,
	price: String(p.price),
	vip: p.vip,
	benefits: p.benefits.length > 0 ? p.benefits.map((b) => ({ ...b })) : [emptyBenefit()],
	isActive: p.isActive ?? true
});

const formToPackage = (f: FormState, sortOrder: number): ParticipationPackage => ({
	id: f.id,
	title: f.title.trim(),
	price: Number(f.price),
	vip: f.vip,
	benefits: f.benefits
		.map((b) => ({ available: Boolean(b.available), label: b.label.trim() }))
		.filter((b) => b.label.length > 0),
	sortOrder,
	isActive: f.isActive
});

export default function PackagesAdmin() {
	const [packages, setPackages] = useState<ParticipationPackage[]>([]);
	const [loading, setLoading] = useState(true);
	const [open, setOpen] = useState(false);
	const [form, setForm] = useState<FormState>(emptyForm);
	const [saving, setSaving] = useState(false);
	const [toast, setToast] = useState<{ type: "success" | "error"; message: string } | null>(null);
	const [deleteId, setDeleteId] = useState<number | null>(null);

	const loadPackages = async (showSpinner = false) => {
		if (showSpinner) setLoading(true);
		try {
			const res = await fetch("/api/packages?all=true");
			const data = (await res.json()) as ParticipationPackage[];
			setPackages(data);
		} catch {
			setToast({ type: "error", message: "Не удалось загрузить тарифы" });
		} finally {
			if (showSpinner) setLoading(false);
		}
	};

	useEffect(() => {
		loadPackages(true);
	}, []);

	const handleAdd = () => {
		setForm({ ...emptyForm, benefits: [emptyBenefit()] });
		setOpen(true);
	};

	const handleEdit = (pack: ParticipationPackage) => {
		setForm(packageToForm(pack));
		setOpen(true);
	};

	const handleClose = () => {
		if (saving) return;
		setOpen(false);
	};

	const handleSave = async () => {
		if (!form.title.trim()) {
			setToast({ type: "error", message: "Укажите название тарифа" });
			return;
		}
		const price = Number(form.price);
		if (!Number.isFinite(price) || price < 0) {
			setToast({ type: "error", message: "Цена должна быть числом ≥ 0" });
			return;
		}
		const payload = formToPackage(form, 0);
		if (payload.benefits.length === 0) {
			setToast({ type: "error", message: "Добавьте хотя бы одно преимущество" });
			return;
		}
		setSaving(true);
		try {
			const isUpdate = Boolean(form.id);
			const existing = packages.find((p) => p.id === form.id);
			const nextSortOrder = isUpdate ? existing?.sortOrder ?? 0 : (packages[packages.length - 1]?.sortOrder ?? 0) + 10;
			const res = await fetch("/api/packages", {
				method: isUpdate ? "PUT" : "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(formToPackage(form, nextSortOrder))
			});
			if (!res.ok) {
				const err = await res.json().catch(() => ({}));
				throw new Error(err.message ?? "Ошибка сохранения");
			}
			setToast({ type: "success", message: isUpdate ? "Тариф обновлён" : "Тариф создан" });
			setOpen(false);
			await loadPackages(false);
		} catch (e) {
			setToast({ type: "error", message: e instanceof Error ? e.message : "Ошибка сохранения" });
		} finally {
			setSaving(false);
		}
	};

	const persistOrder = async (ordered: ParticipationPackage[]) => {
		const ids = ordered.map((p) => p.id).filter((id): id is number => typeof id === "number");
		try {
			const res = await fetch("/api/packages/reorder", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ ids })
			});
			if (!res.ok) throw new Error("Не удалось сохранить порядок");
		} catch (e) {
			setToast({ type: "error", message: e instanceof Error ? e.message : "Ошибка" });
			loadPackages(false);
		}
	};

	const handleMove = (index: number, direction: -1 | 1) => {
		const target = index + direction;
		if (target < 0 || target >= packages.length) return;
		const next = packages.slice();
		[next[index], next[target]] = [next[target], next[index]];
		const reindexed = next.map((p, i) => ({ ...p, sortOrder: i * 10 }));
		setPackages(reindexed);
		persistOrder(reindexed);
	};

	const handleDelete = async () => {
		if (!deleteId) return;
		try {
			const res = await fetch(`/api/packages?id=${deleteId}`, { method: "DELETE" });
			if (!res.ok) throw new Error("Не удалось удалить");
			setPackages((prev) => prev.filter((p) => p.id !== deleteId));
			setToast({ type: "success", message: "Тариф удалён" });
			setDeleteId(null);
		} catch (e) {
			setToast({ type: "error", message: e instanceof Error ? e.message : "Ошибка удаления" });
		}
	};

	const handleToggleActive = async (pack: ParticipationPackage) => {
		const nextValue = !(pack.isActive ?? true);
		setPackages((prev) => prev.map((p) => (p.id === pack.id ? { ...p, isActive: nextValue } : p)));
		try {
			const res = await fetch("/api/packages", {
				method: "PUT",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ ...pack, isActive: nextValue })
			});
			if (!res.ok) throw new Error("Не удалось изменить статус");
		} catch (e) {
			setPackages((prev) => prev.map((p) => (p.id === pack.id ? { ...p, isActive: pack.isActive ?? true } : p)));
			setToast({ type: "error", message: e instanceof Error ? e.message : "Ошибка" });
		}
	};

	const updateBenefit = (index: number, patch: Partial<PackageBenefit>) => {
		setForm((prev) => ({
			...prev,
			benefits: prev.benefits.map((b, i) => (i === index ? { ...b, ...patch } : b))
		}));
	};

	const addBenefit = () => {
		setForm((prev) => ({ ...prev, benefits: [...prev.benefits, emptyBenefit()] }));
	};

	const removeBenefit = (index: number) => {
		setForm((prev) => ({
			...prev,
			benefits: prev.benefits.length <= 1 ? prev.benefits : prev.benefits.filter((_, i) => i !== index)
		}));
	};

	return (
		<Box sx={{ flexGrow: 1, pb: "6rem" }}>
			<Stack direction='row' justifyContent='space-between' alignItems='center' mb={3}>
				<Typography variant='h5' fontWeight={600}>
					Тарифы участников
				</Typography>
				<Button variant='contained' startIcon={<AddIcon />} onClick={handleAdd}>
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
								<TableCell>Название</TableCell>
								<TableCell width={140}>Цена</TableCell>
								<TableCell width={80}>VIP</TableCell>
								<TableCell width={120}>Активен</TableCell>
								<TableCell width={140} align='right'>
									Действия
								</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{loading ? (
								<TableRow>
									<TableCell colSpan={6} align='center' sx={{ py: 6 }}>
										<CircularProgress />
									</TableCell>
								</TableRow>
							) : packages.length === 0 ? (
								<TableRow>
									<TableCell colSpan={6} align='center' sx={{ py: 6 }}>
										<Typography color='text.secondary'>Тарифы ещё не добавлены</Typography>
									</TableCell>
								</TableRow>
							) : (
								packages.map((pack, index) => (
									<TableRow key={pack.id} hover>
										<TableCell align='center' sx={{ p: 0.5 }}>
											<Stack direction='column' alignItems='center' spacing={0}>
												<Tooltip title='Выше'>
													<span>
														<IconButton size='small' onClick={() => handleMove(index, -1)} disabled={index === 0}>
															<ArrowUpIcon fontSize='small' />
														</IconButton>
													</span>
												</Tooltip>
												<Tooltip title='Ниже'>
													<span>
														<IconButton size='small' onClick={() => handleMove(index, 1)} disabled={index === packages.length - 1}>
															<ArrowDownIcon fontSize='small' />
														</IconButton>
													</span>
												</Tooltip>
											</Stack>
										</TableCell>
										<TableCell>
											<Typography variant='body2' fontWeight={500}>
												{pack.title}
											</Typography>
											<Typography variant='caption' color='text.secondary'>
												{pack.benefits.filter((b) => b.available).length}/{pack.benefits.length} включено
											</Typography>
										</TableCell>
										<TableCell>
											{pack.price.toLocaleString("ru", { style: "currency", currency: "RUB", maximumFractionDigits: 0 })}
										</TableCell>
										<TableCell>{pack.vip ? <CheckIcon color='primary' fontSize='small' /> : "—"}</TableCell>
										<TableCell>
											<Switch checked={pack.isActive ?? true} onChange={() => handleToggleActive(pack)} size='small' />
										</TableCell>
										<TableCell align='right'>
											<Tooltip title='Редактировать'>
												<IconButton size='small' onClick={() => handleEdit(pack)}>
													<EditIcon fontSize='small' />
												</IconButton>
											</Tooltip>
											<Tooltip title='Удалить'>
												<IconButton size='small' color='error' onClick={() => pack.id && setDeleteId(pack.id)}>
													<DeleteIcon fontSize='small' />
												</IconButton>
											</Tooltip>
										</TableCell>
									</TableRow>
								))
							)}
						</TableBody>
					</Table>
				</TableContainer>
			</Paper>

			<Dialog open={open} onClose={handleClose} maxWidth='md' fullWidth>
				<DialogTitle>
					{form.id ? "Редактировать тариф" : "Новый тариф"}
					<IconButton onClick={handleClose} sx={{ position: "absolute", right: 8, top: 8 }} disabled={saving}>
						<CloseIcon />
					</IconButton>
				</DialogTitle>
				<DialogContent dividers>
					<Stack spacing={2.5} pt={1}>
						<TextField label='Название' value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required fullWidth />
						<TextField
							label='Цена (₽)'
							type='number'
							value={form.price}
							onChange={(e) => setForm({ ...form, price: e.target.value })}
							required
							fullWidth
							inputProps={{ min: 0, step: 100 }}
						/>
						<FormControlLabel
							control={<Switch checked={form.vip} onChange={(e) => setForm({ ...form, vip: e.target.checked })} />}
							label='VIP-оформление (выделенная рамка на сайте)'
						/>

						<Box>
							<Stack direction='row' justifyContent='space-between' alignItems='center' mb={1}>
								<Typography variant='subtitle2'>Преимущества</Typography>
								<Button size='small' startIcon={<AddIcon />} onClick={addBenefit}>
									Добавить
								</Button>
							</Stack>
							<Stack spacing={1.5}>
								{form.benefits.map((benefit, index) => (
									<Stack key={index} direction='row' spacing={1} alignItems='center'>
										<Checkbox
											checked={benefit.available}
											onChange={(e) => updateBenefit(index, { available: e.target.checked })}
											size='small'
										/>
										<TextField
											size='small'
											fullWidth
											placeholder='Текст преимущества'
											value={benefit.label}
											onChange={(e) => updateBenefit(index, { label: e.target.value })}
										/>
										<IconButton size='small' color='error' onClick={() => removeBenefit(index)} disabled={form.benefits.length <= 1}>
											<DeleteIcon fontSize='small' />
										</IconButton>
									</Stack>
								))}
							</Stack>
							<Typography variant='caption' color='text.secondary' sx={{ display: "block", mt: 1 }}>
								Галочка — преимущество включено в тариф (зелёная галочка на сайте).
							</Typography>
						</Box>

						<Stack direction='row' alignItems='center' spacing={1}>
							<Switch checked={form.isActive} onChange={(e) => setForm({ ...form, isActive: e.target.checked })} />
							<Typography>Показывать на сайте</Typography>
						</Stack>
					</Stack>
				</DialogContent>
				<DialogActions sx={{ px: 3, py: 2 }}>
					<Button onClick={handleClose} disabled={saving}>
						Отмена
					</Button>
					<Button variant='contained' onClick={handleSave} disabled={saving} startIcon={saving ? <CircularProgress size={16} /> : null}>
						Сохранить
					</Button>
				</DialogActions>
			</Dialog>

			<Dialog open={deleteId !== null} onClose={() => setDeleteId(null)} maxWidth='xs' fullWidth>
				<DialogTitle>Удалить тариф?</DialogTitle>
				<DialogContent>
					<Typography>Это действие нельзя отменить.</Typography>
				</DialogContent>
				<DialogActions>
					<Button onClick={() => setDeleteId(null)}>Отмена</Button>
					<Button color='error' variant='contained' onClick={handleDelete}>
						Удалить
					</Button>
				</DialogActions>
			</Dialog>

			<Snackbar
				open={Boolean(toast)}
				autoHideDuration={4000}
				onClose={() => setToast(null)}
				anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
			>
				{toast ? (
					<Alert severity={toast.type} onClose={() => setToast(null)} variant='filled'>
						{toast.message}
					</Alert>
				) : undefined}
			</Snackbar>
		</Box>
	);
}
