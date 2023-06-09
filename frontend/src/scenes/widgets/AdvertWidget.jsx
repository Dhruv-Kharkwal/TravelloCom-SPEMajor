import { Typography, useTheme } from "@mui/material";
import FlexBetween from "components/FlexBetween";
import WidgetWrapper from "components/WidgetWrapper";

const AdvertWidget = () => {
  const { palette } = useTheme();
  const dark = palette.neutral.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;

  return (
    <WidgetWrapper>
      <img
        width="100%"
        height="auto"
        alt="advert"
        src="./info4.jpeg"
        style={{ borderRadius: "0.75rem", margin: "0.75rem 0" }}
      />
      <FlexBetween>
        <Typography color={main}>Quote</Typography>
        <Typography color={medium}>Here is the quote for day!!!</Typography>
      </FlexBetween>
      <Typography color={medium} m="0.5rem 0">
        “Yesterday is history, tomorrow is a mystery, but today is a gift. That
        is why it is called the present.” – Master Oogway
      </Typography>
    </WidgetWrapper>
  );
};

export default AdvertWidget;
