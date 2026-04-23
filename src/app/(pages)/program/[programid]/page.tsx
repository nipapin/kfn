import { ProgrammPageProps } from "@/app/types/interfaces";
import AdditionalEntertainments from "@/components/main/AdditionalEntertainments";
import Timeline from "@/components/Timeline";
import { program } from "@/db/database";
import "@/styles/program.css";
import { Box, Container, Divider, Typography } from "@mui/material";
import { Fragment } from "react";

export default async function ProgrammPage({ params }: ProgrammPageProps) {
	const { programid } = await params;

	const timelines = program.filter((item) => item.id === programid);

	return (
		<Container id='program-page-container'>
			{programid === "business" && (
				<Box sx={{ maxWidth: "720px", mx: "auto", mb: 3, px: { xs: 1, sm: 0 } }}>
					<Typography variant='body1' sx={{ textWrap: "balance", textAlign: { xs: "left", sm: "center" } }}>
						Форум проходит с <strong>23 по 26 июля 2026 года</strong>. Ниже — подробное расписание основных дней деловой программы (
						<strong>23 и 24 июля</strong>). Программа форума и наполнение билетов будут дополняться — следите за обновлениями на сайте.
					</Typography>
				</Box>
			)}
			{programid === "business" &&
				timelines.map((timeline, index, self) => (
					<Fragment key={timeline.date}>
						<Timeline timeline={timeline} />
						{index < self.length - 1 && <Divider sx={{ my: "2rem" }} />}
					</Fragment>
				))}
			{programid === "entertainment" && <AdditionalEntertainments sx={{ height: "auto" }} special={true} />}
		</Container>
	);
}
