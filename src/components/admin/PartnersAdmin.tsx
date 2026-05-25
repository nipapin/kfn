"use client";

import { Partner } from "@/app/types/interfaces";
import {
	Add as AddIcon,
	ArrowDownward as ArrowDownIcon,
	ArrowUpward as ArrowUpIcon,
	Close as CloseIcon,
	Delete as DeleteIcon,
	Edit as EditIcon,
	Visibility as VisibilityIcon,
	VisibilityOff as VisibilityOffIcon,
	Upload as UploadIcon
} from "@mui/icons-material";
import {
	Alert,
	Avatar,
	Box,
	Button,
	Chip,
	CircularProgress,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
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
import { useEffect, useRef, useState } from "react";

type FormState = {
	id?: number;
	name: string;
	type: string;
	description: string;
	body: string;
	image: { src: string; width: number; height: number; alt: string };
	video: { src: string; width: number; height: number; poster: string };
	isActive: boolean;
};

const emptyForm: FormState = {
	name: "",
	type: "",
	description: "",
	body: "",
	image: { src: "", width: 0, height: 0, alt: "" },
	video: { src: "", width: 0, height: 0, poster: "" },
	isActive: true
};

const partnerToForm = (p: Partner): FormState => ({
	id: p.id,
	name: p.name,
	type: p.type ?? "",
	description: p.description,
	body: p.body?.join("\n\n") ?? "",
	image: { ...p.image },
	video: {
		src: p.video?.src ?? "",
		width: p.video?.width ?? 0,
		height: p.video?.height ?? 0,
		poster: p.video?.poster ?? ""
	},
	isActive: p.isActive ?? true
});

const formToPartner = (f: FormState, sortOrder: number): Partner => ({
	id: f.id,
	name: f.name,
	type: f.type || undefined,
	description: f.description,
	body: f.body
		? f.body
				.split(/\n{2,}/)
				.map((s) => s.trim())
				.filter(Boolean)
		: undefined,
	image: f.image,
	video: f.video.src ? f.video : undefined,
	sortOrder,
	isActive: f.isActive
});

async function readImageDimensions(file: File): Promise<{ width: number; height: number }> {
	return new Promise((resolve, reject) => {
		const url = URL.createObjectURL(file);
		const img = new window.Image();
		img.onload = () => {
			resolve({ width: img.naturalWidth, height: img.naturalHeight });
			URL.revokeObjectURL(url);
		};
		img.onerror = () => {
			reject(new Error("Не удалось определить размеры изображения"));
			URL.revokeObjectURL(url);
		};
		img.src = url;
	});
}

async function readVideoDimensions(file: File): Promise<{ width: number; height: number }> {
	return new Promise((resolve, reject) => {
		const url = URL.createObjectURL(file);
		const video = document.createElement("video");
		video.preload = "metadata";
		video.onloadedmetadata = () => {
			resolve({ width: video.videoWidth, height: video.videoHeight });
			URL.revokeObjectURL(url);
		};
		video.onerror = () => {
			reject(new Error("Не удалось определить размеры видео"));
			URL.revokeObjectURL(url);
		};
		video.src = url;
	});
}

export default function PartnersAdmin() {
	const [partners, setPartners] = useState<Partner[]>([]);
	const [loading, setLoading] = useState(true);
	const [open, setOpen] = useState(false);
	const [form, setForm] = useState<FormState>(emptyForm);
	const [saving, setSaving] = useState(false);
	const [uploading, setUploading] = useState<"image" | "video" | "poster" | null>(null);
	const [toast, setToast] = useState<{ type: "success" | "error"; message: string } | null>(null);
	const [deleteId, setDeleteId] = useState<number | null>(null);

	const imageInputRef = useRef<HTMLInputElement>(null);
	const videoInputRef = useRef<HTMLInputElement>(null);
	const posterInputRef = useRef<HTMLInputElement>(null);

	const loadPartners = async (showSpinner = false) => {
		if (showSpinner) setLoading(true);
		try {
			const res = await fetch("/api/partners?all=true");
			const data = (await res.json()) as Partner[];
			setPartners(data);
		} catch {
			setToast({ type: "error", message: "Не удалось загрузить партнёров" });
		} finally {
			if (showSpinner) setLoading(false);
		}
	};

	useEffect(() => {
		loadPartners(true);
	}, []);

	const handleAdd = () => {
		setForm({ ...emptyForm });
		setOpen(true);
	};

	const handleEdit = (partner: Partner) => {
		setForm(partnerToForm(partner));
		setOpen(true);
	};

	const handleClose = () => {
		if (saving) return;
		setOpen(false);
	};

	const handleSave = async () => {
		if (!form.name.trim() || !form.description.trim()) {
			setToast({ type: "error", message: "Заполните название и описание" });
			return;
		}
		if (!form.image.src) {
			setToast({ type: "error", message: "Загрузите логотип" });
			return;
		}
		setSaving(true);
		try {
			const isUpdate = Boolean(form.id);
			const existing = partners.find((p) => p.id === form.id);
			const nextSortOrder = isUpdate ? existing?.sortOrder ?? 0 : (partners[partners.length - 1]?.sortOrder ?? 0) + 10;
			const res = await fetch("/api/partners", {
				method: isUpdate ? "PUT" : "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(formToPartner(form, nextSortOrder))
			});
			if (!res.ok) {
				const err = await res.json().catch(() => ({}));
				throw new Error(err.message ?? "Ошибка сохранения");
			}
			setToast({ type: "success", message: isUpdate ? "Партнёр обновлён" : "Партнёр создан" });
			setOpen(false);
			await loadPartners(false);
		} catch (e) {
			setToast({ type: "error", message: e instanceof Error ? e.message : "Ошибка сохранения" });
		} finally {
			setSaving(false);
		}
	};

	const persistOrder = async (ordered: Partner[]) => {
		const ids = ordered.map((p) => p.id).filter((id): id is number => typeof id === "number");
		try {
			const res = await fetch("/api/partners/reorder", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ ids })
			});
			if (!res.ok) throw new Error("Не удалось сохранить порядок");
		} catch (e) {
			setToast({ type: "error", message: e instanceof Error ? e.message : "Ошибка" });
			loadPartners(false);
		}
	};

	const handleMove = (index: number, direction: -1 | 1) => {
		const target = index + direction;
		if (target < 0 || target >= partners.length) return;
		const next = partners.slice();
		[next[index], next[target]] = [next[target], next[index]];
		const reindexed = next.map((p, i) => ({ ...p, sortOrder: i * 10 }));
		setPartners(reindexed);
		persistOrder(reindexed);
	};

	const handleDelete = async () => {
		if (!deleteId) return;
		try {
			const res = await fetch(`/api/partners?id=${deleteId}`, { method: "DELETE" });
			if (!res.ok) throw new Error("Не удалось удалить");
			setPartners((prev) => prev.filter((p) => p.id !== deleteId));
			setToast({ type: "success", message: "Партнёр удалён" });
			setDeleteId(null);
		} catch (e) {
			setToast({ type: "error", message: e instanceof Error ? e.message : "Ошибка удаления" });
		}
	};

	const handleToggleActive = async (partner: Partner) => {
		const nextValue = !(partner.isActive ?? true);
		setPartners((prev) => prev.map((p) => (p.id === partner.id ? { ...p, isActive: nextValue } : p)));
		try {
			const res = await fetch("/api/partners", {
				method: "PUT",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ ...partner, isActive: nextValue })
			});
			if (!res.ok) throw new Error("Не удалось изменить статус");
		} catch (e) {
			setPartners((prev) => prev.map((p) => (p.id === partner.id ? { ...p, isActive: partner.isActive ?? true } : p)));
			setToast({ type: "error", message: e instanceof Error ? e.message : "Ошибка" });
		}
	};

	const uploadFile = async (file: File, folder: "partners" | "video") => {
		const formData = new FormData();
		formData.append("file", file);
		formData.append("folder", folder);
		const res = await fetch("/api/upload", { method: "POST", body: formData });
		if (!res.ok) {
			const err = await res.json().catch(() => ({}));
			throw new Error(err.message ?? "Ошибка загрузки");
		}
		return (await res.json()) as { src: string };
	};

	const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (!file) return;
		setUploading("image");
		try {
			const dimensions = await readImageDimensions(file);
			const { src } = await uploadFile(file, "partners");
			setForm((prev) => ({
				...prev,
				image: { src, width: dimensions.width, height: dimensions.height, alt: prev.image.alt || prev.name || file.name }
			}));
		} catch (err) {
			setToast({ type: "error", message: err instanceof Error ? err.message : "Ошибка загрузки" });
		} finally {
			setUploading(null);
			if (imageInputRef.current) imageInputRef.current.value = "";
		}
	};

	const handlePosterUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (!file) return;
		setUploading("poster");
		try {
			const { src } = await uploadFile(file, "video");
			setForm((prev) => ({ ...prev, video: { ...prev.video, poster: src } }));
		} catch (err) {
			setToast({ type: "error", message: err instanceof Error ? err.message : "Ошибка загрузки" });
		} finally {
			setUploading(null);
			if (posterInputRef.current) posterInputRef.current.value = "";
		}
	};

	const handleVideoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (!file) return;
		setUploading("video");
		try {
			const dimensions = await readVideoDimensions(file);
			const { src } = await uploadFile(file, "video");
			setForm((prev) => ({ ...prev, video: { ...prev.video, src, width: dimensions.width, height: dimensions.height } }));
		} catch (err) {
			setToast({ type: "error", message: err instanceof Error ? err.message : "Ошибка загрузки" });
		} finally {
			setUploading(null);
			if (videoInputRef.current) videoInputRef.current.value = "";
		}
	};

	return (
		<Box sx={{ flexGrow: 1, pb: "6rem" }}>
			<Stack direction='row' justifyContent='space-between' alignItems='center' mb={3}>
				<Typography variant='h5' fontWeight={600}>
					Партнёры / Спонсоры
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
								<TableCell width={90} align='center'>Порядок</TableCell>
								<TableCell>Лого</TableCell>
								<TableCell>Название</TableCell>
								<TableCell>Тип</TableCell>
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
							) : partners.length === 0 ? (
								<TableRow>
									<TableCell colSpan={6} align='center' sx={{ py: 6 }}>
										<Typography color='text.secondary'>Партнёры ещё не добавлены</Typography>
									</TableCell>
								</TableRow>
							) : (
								partners.map((partner, index) => (
									<TableRow key={partner.id} hover>
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
														<IconButton size='small' onClick={() => handleMove(index, 1)} disabled={index === partners.length - 1}>
															<ArrowDownIcon fontSize='small' />
														</IconButton>
													</span>
												</Tooltip>
											</Stack>
										</TableCell>
										<TableCell>
											<Avatar src={partner.image.src} variant='rounded' sx={{ width: 56, height: 56, bgcolor: "grey.100" }}>
												{partner.name.charAt(0)}
											</Avatar>
										</TableCell>
										<TableCell>
											<Typography variant='body2' fontWeight={500}>
												{partner.name}
											</Typography>
											<Typography variant='caption' color='text.secondary' sx={{ display: "block", maxWidth: 360 }}>
												{partner.description.slice(0, 120)}
												{partner.description.length > 120 ? "…" : ""}
											</Typography>
										</TableCell>
										<TableCell>{partner.type ? <Chip size='small' label={partner.type} color='primary' /> : <Typography variant='caption' color='text.secondary'>—</Typography>}</TableCell>
										<TableCell>
											<Switch checked={partner.isActive ?? true} onChange={() => handleToggleActive(partner)} size='small' />
										</TableCell>
										<TableCell align='right'>
											<Tooltip title={partner.isActive ? "Видимый на сайте" : "Скрыт"}>
												<span>
													<IconButton size='small' disabled>
														{partner.isActive ? <VisibilityIcon fontSize='small' /> : <VisibilityOffIcon fontSize='small' />}
													</IconButton>
												</span>
											</Tooltip>
											<Tooltip title='Редактировать'>
												<IconButton size='small' onClick={() => handleEdit(partner)}>
													<EditIcon fontSize='small' />
												</IconButton>
											</Tooltip>
											<Tooltip title='Удалить'>
												<IconButton size='small' color='error' onClick={() => partner.id && setDeleteId(partner.id)}>
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
					{form.id ? "Редактировать партнёра" : "Новый партнёр"}
					<IconButton onClick={handleClose} sx={{ position: "absolute", right: 8, top: 8 }} disabled={saving}>
						<CloseIcon />
					</IconButton>
				</DialogTitle>
				<DialogContent dividers>
					<Stack spacing={2.5} pt={1}>
						<TextField label='Название' value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required fullWidth />
						<TextField
							label='Тип (например: Официальный партнер)'
							value={form.type}
							onChange={(e) => setForm({ ...form, type: e.target.value })}
							fullWidth
							helperText='Необязательно. Отображается крупным шрифтом над названием.'
						/>
						<TextField
							label='Краткое описание'
							value={form.description}
							onChange={(e) => setForm({ ...form, description: e.target.value })}
							required
							fullWidth
							multiline
							minRows={3}
						/>
						<TextField
							label='Доп. абзацы (необязательно)'
							value={form.body}
							onChange={(e) => setForm({ ...form, body: e.target.value })}
							fullWidth
							multiline
							minRows={3}
							helperText='Каждый абзац разделяйте пустой строкой.'
						/>

						<Paper variant='outlined' sx={{ p: 2 }}>
							<Typography variant='subtitle2' mb={1}>
								Логотип
							</Typography>
							<Stack direction='row' spacing={2} alignItems='center'>
								<Box
									sx={{
										width: 120,
										height: 80,
										border: "1px dashed",
										borderColor: "divider",
										borderRadius: 1,
										display: "flex",
										alignItems: "center",
										justifyContent: "center",
										overflow: "hidden",
										bgcolor: "grey.50"
									}}
								>
									{form.image.src ? (
										// eslint-disable-next-line @next/next/no-img-element
										<img src={form.image.src} alt='preview' style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain" }} />
									) : (
										<Typography variant='caption' color='text.secondary'>
											Нет фото
										</Typography>
									)}
								</Box>
								<Box flex={1}>
									<Button
										variant='outlined'
										startIcon={uploading === "image" ? <CircularProgress size={16} /> : <UploadIcon />}
										onClick={() => imageInputRef.current?.click()}
										disabled={uploading !== null}
									>
										Загрузить логотип
									</Button>
									<input ref={imageInputRef} type='file' hidden accept='image/*' onChange={handleImageUpload} />
									{form.image.src && (
										<Typography variant='caption' color='text.secondary' sx={{ display: "block", mt: 1 }}>
											{form.image.src} ({form.image.width}×{form.image.height})
										</Typography>
									)}
								</Box>
							</Stack>
							<TextField
								label='Alt текст (для доступности)'
								value={form.image.alt}
								onChange={(e) => setForm({ ...form, image: { ...form.image, alt: e.target.value } })}
								fullWidth
								size='small'
								sx={{ mt: 2 }}
							/>
						</Paper>

						<Paper variant='outlined' sx={{ p: 2 }}>
							<Typography variant='subtitle2' mb={1}>
								Видео (необязательно)
							</Typography>
							<Stack direction='row' spacing={2} alignItems='center'>
								<Button
									variant='outlined'
									startIcon={uploading === "video" ? <CircularProgress size={16} /> : <UploadIcon />}
									onClick={() => videoInputRef.current?.click()}
									disabled={uploading !== null}
								>
									Видео
								</Button>
								<input ref={videoInputRef} type='file' hidden accept='video/mp4,video/webm' onChange={handleVideoUpload} />
								<Button
									variant='outlined'
									startIcon={uploading === "poster" ? <CircularProgress size={16} /> : <UploadIcon />}
									onClick={() => posterInputRef.current?.click()}
									disabled={uploading !== null}
								>
									Постер
								</Button>
								<input ref={posterInputRef} type='file' hidden accept='image/*' onChange={handlePosterUpload} />
								{form.video.src && (
									<Button
										color='error'
										size='small'
										onClick={() => setForm({ ...form, video: { src: "", width: 0, height: 0, poster: "" } })}
									>
										Удалить видео
									</Button>
								)}
							</Stack>
							{form.video.src && (
								<Typography variant='caption' color='text.secondary' sx={{ display: "block", mt: 1 }}>
									{form.video.src} ({form.video.width}×{form.video.height}) • постер: {form.video.poster || "не задан"}
								</Typography>
							)}
						</Paper>

						<Stack direction='row' alignItems='center' spacing={1}>
							<Switch checked={form.isActive} onChange={(e) => setForm({ ...form, isActive: e.target.checked })} />
							<Typography>Показывать на сайте</Typography>
							<Typography variant='caption' color='text.secondary' sx={{ ml: 2 }}>
								Порядок отображения задаётся стрелками в таблице.
							</Typography>
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
				<DialogTitle>Удалить партнёра?</DialogTitle>
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
