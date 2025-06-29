"use client";
import { ArrowBack, ArrowBackIos } from "@mui/icons-material";
import { Box, Button, CircularProgress, Container, IconButton, Paper, TextField, Typography } from "@mui/material";
import NextLink from "next/link";
import { useState } from "react";

export default function Authorisation() {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState("");
	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const formData = new FormData(e.target as HTMLFormElement);
		const payload = Object.fromEntries(formData);
		fetch("/api/auth", {
			method: "POST",
			body: JSON.stringify(payload)
		})
			.then((res) => {
				if (res.ok) {
					window.location.href = "/dashboard";
				} else {
					setError("Неверный логин или пароль");
				}
			})
			.finally(() => {
				setIsLoading(false);
			});
	};
	return (
		<Container sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
			<Paper
				component='form'
				onSubmit={handleSubmit}
				variant='outlined'
				sx={{ p: 2, width: "100%", maxWidth: "400px", margin: "0 auto", display: "flex", flexDirection: "column", gap: 2, borderRadius: "1rem" }}
			>
				<Box display={"flex"} alignItems={"center"} gap={1}>
					<NextLink href='/' passHref>
						<IconButton>
							<ArrowBack />
						</IconButton>
					</NextLink>
					<Typography variant='h1' fontSize={"1rem"}>
						Вход в панель управления
					</Typography>
				</Box>
				<TextField label='Логин' type='text' name='login' />
				<TextField label='Пароль' type='password' name='password' />
				<Button variant='contained' color='primary' type='submit' disabled={isLoading} endIcon={isLoading ? <CircularProgress size={16} /> : null}>
					Войти
				</Button>
				{error && <Typography color='error'>{error}</Typography>}
			</Paper>
		</Container>
	);
}
