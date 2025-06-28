import { ProgrammPageProps } from "@/app/types/interfaces";
import AdditionalEntertainments from "@/components/main/AdditionalEntertainments";
import Timeline from "@/components/Timeline";
import { program } from "@/db/database";
import { Container, Divider } from "@mui/material";
import { Fragment } from "react";
import "@/styles/program.css";

export default async function ProgrammPage({ params }: ProgrammPageProps) {
	const { programid } = await params;

	const timelines = program.filter((item) => item.id === programid);

	return (
		<Container id='program-page-container'>
			{programid === "business" &&
				timelines.length > 0 &&
				timelines.map((timeline, index, self) => (
					<Fragment key={index}>
						<Timeline timeline={timeline} />
						{index < self.length - 1 && <Divider sx={{ my: "2rem" }} />}
					</Fragment>
				))}
			{programid === "entertainment" && <AdditionalEntertainments sx={{ height: "auto" }} special={true} />}
		</Container>
	);
}
