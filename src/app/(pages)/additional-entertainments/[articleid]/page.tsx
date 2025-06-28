import { getArticle } from "@/actions";
import { AdditionalEntertainmentsPageProps } from "@/app/types/interfaces";
import ModalRegistration from "@/components/shared/ModalRegistration";
import { ArrowBackIosNew } from "@mui/icons-material";
import { Box, Button, Container, Typography } from "@mui/material";
import { headers } from "next/headers";
import Image from "next/image";
import NextLink from "next/link";
import { notFound } from "next/navigation";
import "@/styles/additional-entertainments.css";

export default async function AdditionalEntertainmentsPage({ params }: AdditionalEntertainmentsPageProps) {
	const headersList = await headers();
	const referer = headersList.get("referer");
	const { articleid } = await params;

	const article = await getArticle(articleid);

	if (!article) {
		return notFound();
	}

	return (
		<Container id='additional-entertainments-page-container'>
			<NextLink href={referer || "/"} passHref className='back-link'>
				<Button variant='text' color='primary' startIcon={<ArrowBackIosNew />}>
					Назад
				</Button>
			</NextLink>
			<Box id='additional-entertainments-page-content'>
				<Box id='additional-entertainments-page-content-image'>
					<Box id='additional-entertainments-page-content-image-box'>
						<Image src={article.image} alt={article.title} width={500} height={500} />
					</Box>
					<ModalRegistration buttonProps={{ variant: "contained", fullWidth: true, sx: { mt: 0 } }} hideOnScroll={false} />
				</Box>
				<Box sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
					<Typography variant='h1' fontSize={"2.5rem"} sx={{ textWrap: "balance" }}>
						{article.title}
					</Typography>
					<Typography variant='body1' sx={{ textWrap: "balance", whiteSpace: "pre-wrap" }}>
						{article.description}
					</Typography>
					<Typography variant='body1'>
						Стоимость:
						<Typography component={"span"} fontWeight={"bold"} fontSize={"1.5rem"} ml={"0.5rem"}>
							{article.price.toLocaleString("ru", { style: "currency", currency: "RUB", maximumFractionDigits: 0 })}
						</Typography>
					</Typography>
				</Box>
			</Box>
		</Container>
	);
}
