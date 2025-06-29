"use client";

import type React from "react";
import { useEffect, useState } from "react";
import {
	AppBar,
	Toolbar,
	Typography,
	Container,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Chip,
	Box,
	TextField,
	InputAdornment,
	Grid,
	Card,
	CardContent,
	IconButton,
	Menu,
	MenuItem,
	Avatar,
	Fab,
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
	Button,
	CardHeader
} from "@mui/material";
import {
	Search as SearchIcon,
	MoreVert as MoreVertIcon,
	Add as AddIcon,
	Person as PersonIcon,
	Assignment as AssignmentIcon,
	CheckCircle as CheckCircleIcon,
	Schedule as ScheduleIcon
} from "@mui/icons-material";

// Типы данных
interface Application {
	id: number;
	name: string;
	email: string;
	phone: string;
	service: string;
	status: "pending" | "approved" | "rejected" | "in-review";
	date: string;
	description: string;
}

// Функция для получения цвета статуса
const getStatusColor = (status: Application["status"]) => {
	switch (status) {
		case "pending":
			return "warning";
		case "approved":
			return "success";
		case "rejected":
			return "error";
		case "in-review":
			return "info";
		default:
			return "default";
	}
};

// Функция для получения текста статуса
const getStatusText = (status: Application["status"]) => {
	switch (status) {
		case "pending":
			return "Ожидает";
		case "approved":
			return "Одобрено";
		case "rejected":
			return "Отклонено";
		case "in-review":
			return "На рассмотрении";
		default:
			return status;
	}
};

export default function AdminDashboard() {
	const [applications, setApplications] = useState<Application[]>([]);
	const [searchTerm, setSearchTerm] = useState("");
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const [selectedApp, setSelectedApp] = useState<Application | null>(null);
	const [detailsOpen, setDetailsOpen] = useState(false);

	// Фильтрация заявок по поисковому запросу
	const filteredApplications = applications.filter(
		(app) =>
			app.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
			app.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
			app.service.toLowerCase().includes(searchTerm.toLowerCase())
	);

	// Статистика
	const stats = {
		total: applications.length,
		pending: applications.filter((app) => app.status === "pending").length,
		approved: applications.filter((app) => app.status === "approved").length,
		rejected: applications.filter((app) => app.status === "rejected").length
	};

	const handleMenuClick = (event: React.MouseEvent<HTMLElement>, app: Application) => {
		setAnchorEl(event.currentTarget);
		setSelectedApp(app);
	};

	const handleMenuClose = () => {
		setAnchorEl(null);
		setSelectedApp(null);
	};

	const handleViewDetails = () => {
		setDetailsOpen(true);
		handleMenuClose();
	};

	useEffect(() => {
		fetch("/api/registration")
			.then((res) => res.json())
			.then((data) => {
				console.log(data);
				setApplications(data);
			});
	}, []);

	return (
		<Box sx={{ flexGrow: 1 }}>
			{/* Заголовок */}
			<AppBar position='static' sx={{ mb: 3 }}>
				<Toolbar sx={{ maxWidth: "xl", margin: "0 auto", width: "100%" }}>
					<AssignmentIcon sx={{ mr: 2 }} />
					<Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
						Dashboard - Заявки пользователей
					</Typography>
				</Toolbar>
			</AppBar>

			<Container maxWidth='xl'>
				{/* Статистика */}
				<Grid container spacing={3} sx={{ mb: 3 }}>
					<Grid>
						<Card>
							<CardHeader title='Всего заявок' avatar={<AssignmentIcon color='primary' />} />
							<CardContent>
								<Typography variant='h4'>{stats.total}</Typography>
							</CardContent>
						</Card>
					</Grid>

					<Grid>
						<Card>
							<CardHeader title='Ожидают' avatar={<ScheduleIcon color='warning' />} />
							<CardContent>
								<Typography variant='h4'>{stats.pending}</Typography>
							</CardContent>
						</Card>
					</Grid>

					<Grid>
						<Card>
							<CardHeader title='Одобрено' avatar={<CheckCircleIcon color='success' />} />
							<CardContent>
								<Typography variant='h4'>{stats.approved}</Typography>
							</CardContent>
						</Card>
					</Grid>

					<Grid>
						<Card>
							<CardHeader title='Отклонено' avatar={<PersonIcon color='error' />} />
							<CardContent>
								<Typography variant='h4'>{stats.rejected}</Typography>
							</CardContent>
						</Card>
					</Grid>
				</Grid>

				{/* Поиск */}
				<Paper sx={{ p: 2, mb: 3 }}>
					<TextField
						fullWidth
						variant='outlined'
						placeholder='Поиск по имени, email или услуге...'
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
						InputProps={{
							startAdornment: (
								<InputAdornment position='start'>
									<SearchIcon />
								</InputAdornment>
							)
						}}
					/>
				</Paper>

				{/* Таблица заявок */}
				<Paper>
					<TableContainer>
						<Table>
							<TableHead>
								<TableRow>
									<TableCell></TableCell>
									<TableCell>ФИО</TableCell>
									<TableCell>Компания</TableCell>
									<TableCell>Тариф</TableCell>
									<TableCell>Телефон</TableCell>
									<TableCell>Почта</TableCell>
									<TableCell>Город</TableCell>
									<TableCell>Промокод</TableCell>
									<TableCell>Статус</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{filteredApplications.map((app) => (
									<TableRow key={app.id} hover>
										<TableCell>
											<Box sx={{ display: "flex", alignItems: "center" }}>
												<Avatar sx={{ mr: 2, bgcolor: "primary.main" }}>{app.name.charAt(0)}</Avatar>
												<Typography variant='body2'>{app.name}</Typography>
											</Box>
										</TableCell>
										<TableCell>
											<Typography variant='body2'>{app.email}</Typography>
											<Typography variant='caption' color='textSecondary'>
												{app.phone}
											</Typography>
										</TableCell>
										<TableCell>{app.service}</TableCell>
										<TableCell>
											<Chip label={getStatusText(app.status)} color={getStatusColor(app.status)} size='small' />
										</TableCell>
										<TableCell>{new Date(app.date).toLocaleDateString("ru-RU")}</TableCell>
										<TableCell align='right'>
											<IconButton onClick={(e) => handleMenuClick(e, app)}>
												<MoreVertIcon />
											</IconButton>
										</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</TableContainer>
				</Paper>

				{/* Меню действий */}
				<Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
					<MenuItem onClick={handleViewDetails}>Просмотр деталей</MenuItem>
					<MenuItem onClick={handleMenuClose}>Редактировать</MenuItem>
					<MenuItem onClick={handleMenuClose}>Удалить</MenuItem>
				</Menu>

				{/* Диалог с деталями */}
				<Dialog open={detailsOpen} onClose={() => setDetailsOpen(false)} maxWidth='sm' fullWidth>
					<DialogTitle>Детали заявки #{selectedApp?.id}</DialogTitle>
					<DialogContent>
						{selectedApp && (
							<Box sx={{ pt: 1 }}>
								<Typography variant='h6' gutterBottom>
									{selectedApp.name}
								</Typography>
								<Typography variant='body2' color='textSecondary' gutterBottom>
									Email: {selectedApp.email}
								</Typography>
								<Typography variant='body2' color='textSecondary' gutterBottom>
									Телефон: {selectedApp.phone}
								</Typography>
								<Typography variant='body2' color='textSecondary' gutterBottom>
									Услуга: {selectedApp.service}
								</Typography>
								<Typography variant='body2' color='textSecondary' gutterBottom>
									Дата: {new Date(selectedApp.date).toLocaleDateString("ru-RU")}
								</Typography>
								<Box sx={{ mt: 2 }}>
									<Chip label={getStatusText(selectedApp.status)} color={getStatusColor(selectedApp.status)} />
								</Box>
								<Typography variant='h6' sx={{ mt: 2, mb: 1 }}>
									Описание:
								</Typography>
								<Typography variant='body2'>{selectedApp.description}</Typography>
							</Box>
						)}
					</DialogContent>
					<DialogActions>
						<Button onClick={() => setDetailsOpen(false)}>Закрыть</Button>
						<Button variant='contained'>Редактировать</Button>
					</DialogActions>
				</Dialog>

				{/* Кнопка добавления */}
				<Fab
					color='primary'
					aria-label='add'
					sx={{
						position: "fixed",
						bottom: 16,
						right: 16
					}}
				>
					<AddIcon />
				</Fab>
			</Container>
		</Box>
	);
}
