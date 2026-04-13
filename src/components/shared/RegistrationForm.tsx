"use client";

import "@/styles/registration.css";
import { CheckCircle, Close, Group } from "@mui/icons-material";
import {
	Box,
	Button,
	Chip,
	CircularProgress,
	Dialog,
	DialogContent,
	DialogTitle,
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
import { useRef, useState } from "react";
import { IMask, IMaskMixin } from "react-imask";

const tariffs = [
	{ name: "Брокер Тур" },
	{ name: "Базовый" },
	{ name: "Таинственный Замок" },
	{ name: "Премьер" },
	{ name: "Гала Ужин" },
	{ name: "VIP" }
];

const phoneMaskOptions = {
	mask: "+7 000 000 00 00",
	lazy: false
};

const phoneMask = IMask.createMask(phoneMaskOptions);

const PhoneInput = IMaskMixin(({ inputRef, ...props }: any) => {
	return <TextField {...props} inputRef={inputRef} />;
});

export default function RegistrationForm({ modal, close }: { modal?: boolean; close?: () => void }) {
	const phoneRef = useRef<HTMLInputElement>(null);
	const [isLoading, setIsLoading] = useState(false);
	const [success, setSuccess] = useState(false);
	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const formData = new FormData(e.target as HTMLFormElement);
		const payload = Object.fromEntries(formData);
		await fetch("/api/registration", {
			method: "POST",
			body: JSON.stringify({ ...payload, tariff: tariffs[Number(payload.tariff)].name })
		}).finally(() => {
			setIsLoading(false);
			setSuccess(true);
			(e.target as HTMLFormElement).reset();
		});
		close?.();
	};
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
				Количество мест ограничено — успейте забронировать участие по специальной цене раннего бронирования. Заполните форму ниже.
			</Typography>
			<Typography fontSize={"0.875rem"} textAlign={"center"} color='white' sx={{ opacity: 0.95, mt: 0.5, px: 1 }}>
				Стоимость уточняется у оргкомитета. Для членов Гильдии риэлторов Калининграда — скидка 20%.
			</Typography>
			<Stack component={"form"} direction={"column"} spacing={2} mt={2} onSubmit={handleSubmit}>
				<FormControl fullWidth>
					<Select
						fullWidth
						color='primary'
						slotProps={{ input: { sx: { backgroundColor: "white", borderRadius: "0.5rem" } } }}
						defaultValue={1}
						name='tariff'
					>
						{tariffs.map((tariff, index) => (
							<MenuItem key={tariff.name} value={index}>
								{tariff.name}
								<Chip size='small' label='уточняется' sx={{ ml: "auto" }} />
							</MenuItem>
						))}
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
					name='fullName'
					color='primary'
					fullWidth
					required
					placeholder='Введите ФИО'
					slotProps={{ input: { sx: { backgroundColor: "white", borderRadius: "0.5rem" } } }}
				/>
				<TextField
					name='companyName'
					color='secondary'
					fullWidth
					required
					placeholder='Наименование компании'
					slotProps={{ input: { sx: { backgroundColor: "white", borderRadius: "0.5rem" } } }}
				/>
				<TextField
					name='city'
					color='secondary'
					fullWidth
					required
					placeholder='Город проживания'
					slotProps={{ input: { sx: { backgroundColor: "white", borderRadius: "0.5rem" } } }}
				/>
				<Stack direction={"row"} spacing={1}>
					<TextField
						name='email'
						color='secondary'
						fullWidth
						required
						placeholder='example@mail.com'
						slotProps={{ input: { sx: { backgroundColor: "white", borderRadius: "0.5rem" } } }}
					/>
					<PhoneInput
						mask={phoneMask}
						inputRef={phoneRef}
						name='phone'
						color='secondary'
						fullWidth
						required
						placeholder='+7 (999) 999-99-99'
						slotProps={{ input: { sx: { backgroundColor: "white", borderRadius: "0.5rem" } } }}
					/>
				</Stack>
				<TextField
					name='promoCode'
					color='secondary'
					fullWidth
					placeholder='Введите промокод'
					slotProps={{ input: { sx: { backgroundColor: "white", borderRadius: "0.5rem" } } }}
				/>
				<Button
					type='submit'
					variant='contained'
					color='secondary'
					startIcon={<Group />}
					fullWidth
					sx={{ color: "primary.main" }}
					endIcon={isLoading ? <CircularProgress size={20} sx={{ color: "white" }} /> : null}
					disabled={isLoading}
				>
					Зарегистрироваться
				</Button>
				<Typography id='registration-form-terms' textAlign={"center"} color='white' sx={{ "& a": { color: "inherit", textDecoration: "underline" } }}>
					Нажимая кнопку "Зарегистрироваться", вы соглашаетесь с <NextLink href={"#"}>условиями использования</NextLink> и{" "}
					<NextLink href={"#"}>политикой конфиденциальности</NextLink>
				</Typography>
			</Stack>
			<Dialog open={success} onClose={() => setSuccess(false)} fullWidth maxWidth='xs'>
				<DialogTitle component={"div"} sx={{ display: "flex", alignItems: "center", gap: 1 }}>
					<CheckCircle sx={{ color: "success.main" }} />
					<Typography>Заявка успешно отправлена</Typography>
					<IconButton onClick={() => setSuccess(false)} sx={{ ml: "auto" }}>
						<Close />
					</IconButton>
				</DialogTitle>
				<DialogContent>
					<Typography>Ваша заявка успешно отправлена. В ближайшее время мы свяжемся с вами.</Typography>
				</DialogContent>
			</Dialog>
		</Paper>
	);
}
