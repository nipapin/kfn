"use client";

import {
	Assignment as AssignmentIcon,
	CheckCircle as CheckCircleIcon,
	Person as PersonIcon,
	Schedule as ScheduleIcon,
	Search as SearchIcon
} from "@mui/icons-material";
import {
	Avatar,
	Box,
	Card,
	CardContent,
	CardHeader,
	Chip,
	Grid,
	InputAdornment,
	Menu,
	MenuItem,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	TextField,
	Typography
} from "@mui/material";
import type React from "react";
import { useEffect, useState } from "react";

// Типы данных
interface Application {
	id: number;
	name: string;
	company: string;
	email: string;
	phone: string;
	city: string;
	price: string;
	promocode: string;
	status: "pending" | "processed" | "rejected" | "in-review";
	timestamp: number;
}

// Функция для получения цвета статуса
const getStatusColor = (status: Application["status"]) => {
	switch (status) {
		case "pending":
			return "warning";
		case "processed":
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
		case "processed":
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

	// Фильтрация заявок по поисковому запросу
	const filteredApplications = applications.filter(
		(app) =>
			app.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
			app.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
			app.price.toLowerCase().includes(searchTerm.toLowerCase()) ||
			app.city.toLowerCase().includes(searchTerm.toLowerCase())
	);

	// Статистика
	const stats = {
		total: applications.length,
		pending: applications.filter((app) => app.status === "pending").length,
		processed: applications.filter((app) => app.status === "processed").length,
		rejected: applications.filter((app) => app.status === "rejected").length
	};

	const handleStatusChange = (app: Application) => (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
		setSelectedApp(app);
	};

	const handleUpdateStatus = (status: Application["status"]) => {
		fetch(`/api/registration`, {
			method: "PUT",
			body: JSON.stringify({
				id: selectedApp?.id,
				status
			})
		}).then(() => {
			fetch("/api/registration")
				.then((res) => res.json())
				.then((data) => {
					setApplications(data);
				});
		});
		handleMenuClose();
	};

	const handleMenuClose = () => {
		setAnchorEl(null);
		setSelectedApp(null);
	};

	useEffect(() => {
		fetch("/api/registration")
			.then((res) => res.json())
			.then((data) => {
				setApplications(data);
			});
	}, []);

	return (
		<Box sx={{ flexGrow: 1, pb: "6rem" }}>
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
							<Typography variant='h4'>{stats.processed}</Typography>
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
								<TableCell>ФИО</TableCell>
								<TableCell>Компания</TableCell>
								<TableCell>Контакты</TableCell>
								<TableCell>Город</TableCell>
								<TableCell>Тариф</TableCell>
								<TableCell>Статус</TableCell>
								<TableCell>Промокод</TableCell>
								<TableCell>Дата</TableCell>
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
									<TableCell>{app.company}</TableCell>
									<TableCell>
										<Typography variant='body2'>{app.email}</Typography>
										<Typography variant='caption' color='textSecondary'>
											{app.phone}
										</Typography>
									</TableCell>
									<TableCell>{app.city}</TableCell>
									<TableCell>{app.price}</TableCell>
									<TableCell>
										<Chip label={getStatusText(app.status)} color={getStatusColor(app.status)} size='small' onClick={handleStatusChange(app)} />
									</TableCell>
									<TableCell>{app.promocode}</TableCell>
									<TableCell>{new Date(Number(app.timestamp)).toLocaleString("ru-RU")}</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</TableContainer>
			</Paper>

			{/* Меню действий */}
			<Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
				<MenuItem onClick={() => handleUpdateStatus("processed")}>Одобрить</MenuItem>
				<MenuItem onClick={() => handleUpdateStatus("rejected")}>Отклонить</MenuItem>
			</Menu>
		</Box>
	);
}
