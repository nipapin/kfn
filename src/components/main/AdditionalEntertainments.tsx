import { Entertainment } from "@/app/types/interfaces";
import "@/styles/additional-entertainments.css";
import { Box, Card, CardHeader, CardMedia, SxProps, Typography, CardActionArea } from "@mui/material";
import Title from "../shared/Title";
import NextLink from "next/link";

function AdditionalEntertainments(props: { sx?: SxProps; special?: boolean; entertainments: Entertainment[] }) {
  const list = props.special ? props.entertainments.filter((pack) => pack.special) : props.entertainments;
  if (!list.length) return null;

  return (
    <Box id="additional-entertainments-container" sx={{ ...props.sx, pb: "6rem", px: "1rem" }}>
      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%" }}>
        <Title text={props.special ? "Развлекательные мероприятия" : "Дополнительные мероприятия"} />
        <Box id="additional-entertainments-grid">
          {list.map((pack) => (
            <Box key={pack.id}>
              <Card
                sx={{ borderRadius: "1rem", height: "100%", display: "flex", flexDirection: "column" }}
                variant="outlined"
              >
                <CardActionArea component={NextLink} href={`/additional-entertainments/${pack.id}`}>
                  <CardHeader
                    title={pack.title}
                    slotProps={{ title: { sx: { fontSize: "1.2rem", textTransform: "capitalize" } } }}
                    subheader={`${pack.price.toLocaleString("ru", { style: "currency", currency: "RUB", maximumFractionDigits: 0 })}`}
                  />
                  <CardMedia component={"img"} src={pack.image} alt={pack.title} sx={{ height: "200px" }} />
                </CardActionArea>
              </Card>
            </Box>
          ))}
        </Box>
        <Typography textAlign="center" sx={{ mt: 3, maxWidth: "36rem", mx: "auto", px: 1 }} color="text.secondary">
          Программа мероприятий формируется — подробности появятся позже.
        </Typography>
      </Box>
    </Box>
  );
}

export default AdditionalEntertainments;
