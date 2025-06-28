import { Close, Group } from "@mui/icons-material";
import {
	Box,
	Button,
	Chip,
	FormControl,
	FormHelperText,
	IconButton,
	Link,
	MenuItem,
	Paper,
	Select,
	Stack,
	TextField,
	Typography
} from "@mui/material";
import NextLink from "next/link";
import "@/styles/registration.css";

export default function RegistrationForm({ modal, close }: { modal?: boolean; close?: () => void }) {
	return (
		<Paper id='registration-form' sx={{ backgroundColor: "primary.main", width: "100%", height: "100%" }}>
			{modal && (
				<Box display={"flex"} justifyContent={"flex-end"} alignItems={"center"}>
					<IconButton color='secondary' onClick={close}>
						<Close />
					</IconButton>
				</Box>
			)}
			<Typography fontWeight={"bold"} fontSize={"1.5rem"} textAlign={"center"} color='white'>
				Регистрация на форум
			</Typography>
			<Typography id='registration-form-description' fontWeight={"regular"} fontSize={"1rem"} textAlign={"center"} color='white'>
				Заполните форму ниже, чтобы зарегистрироваться на мероприятие.
			</Typography>
			<Stack direction={"column"} spacing={2} mt={2}>
				<FormControl fullWidth>
					<Select fullWidth color='primary' slotProps={{ input: { sx: { backgroundColor: "white", borderRadius: "0.5rem" } } }} defaultValue={0}>
						<MenuItem value={0}>Выберите тариф</MenuItem>
						<MenuItem value={1}>
							Базовый <Chip size='small' label={(2000).toLocaleString("ru", { style: "currency", currency: "RUB" })} sx={{ ml: "auto" }} />
						</MenuItem>
						<MenuItem value={2}>
							Премьер <Chip size='small' label={(15000).toLocaleString("ru", { style: "currency", currency: "RUB" })} sx={{ ml: "auto" }} />
						</MenuItem>
						<MenuItem value={3}>
							VIP <Chip size='small' label={(30000).toLocaleString("ru", { style: "currency", currency: "RUB" })} sx={{ ml: "auto" }} />
						</MenuItem>
					</Select>
					{!modal && (
						<FormHelperText>
							<Link href={"#tarrifs"} sx={{ color: "white", textDecoration: "underline" }}>
								Узнать подробнее о тарифах
							</Link>
						</FormHelperText>
					)}
				</FormControl>
				<TextField
					color='primary'
					fullWidth
					// label='ФИО'
					required
					placeholder='Введите ФИО'
					slotProps={{ input: { sx: { backgroundColor: "white", borderRadius: "0.5rem" } } }}
				/>
				<TextField
					color='secondary'
					fullWidth
					// label='Компания'
					required
					placeholder='Наименование компании'
					slotProps={{ input: { sx: { backgroundColor: "white", borderRadius: "0.5rem" } } }}
				/>
				<TextField
					color='secondary'
					fullWidth
					// label='Город'
					required
					placeholder='Город проживания'
					slotProps={{ input: { sx: { backgroundColor: "white", borderRadius: "0.5rem" } } }}
				/>
				<Stack direction={"row"} spacing={1}>
					<TextField
						color='secondary'
						fullWidth
						// label='Email'
						required
						placeholder='example@mail.com'
						slotProps={{ input: { sx: { backgroundColor: "white", borderRadius: "0.5rem" } } }}
					/>
					<TextField
						color='secondary'
						fullWidth
						// label='Телефон'
						required
						placeholder='+7 (999) 999-99-99'
						slotProps={{ input: { sx: { backgroundColor: "white", borderRadius: "0.5rem" } } }}
					/>
				</Stack>
				<TextField
					color='secondary'
					fullWidth
					// label='Промокод'
					placeholder='Введите промокод'
					slotProps={{ input: { sx: { backgroundColor: "white", borderRadius: "0.5rem" } } }}
				/>
				<Button variant='contained' color='secondary' startIcon={<Group />} fullWidth sx={{ color: "primary.main" }}>
					Зарегистрироваться
				</Button>
				<Typography
					id='registration-form-terms'
					textAlign={"center"}
					color='white'
					fontSize={"1rem"}
					sx={{ "& a": { color: "inherit", textDecoration: "underline" } }}
				>
					Нажимая кнопку "Зарегистрироваться", вы соглашаетесь с <NextLink href={"#"}>условиями использования</NextLink> и{" "}
					<NextLink href={"#"}>политикой конфиденциальности</NextLink>
				</Typography>
			</Stack>
		</Paper>
	);
}
