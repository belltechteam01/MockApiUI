import { Box, Button, Radio, RadioGroup, Select, styled } from "@mui/material";
import RSelect from "react-select";
import CRSelect from "react-select/creatable";
import ARSelect from "react-select/async";

export const FormControlContainer = styled(Box)(() => ({
  maxWidth: 490,
  width: "100%",
  marginTop: 24,
}));

export const Label = styled("label")(() => ({
  fontStyle: "normal",
  fontWeight: "normal",
  fontSize: 16,
  color: "#444444",
}));

export const Input = styled("input")((props: any) => ({
  border: "1px solid #EAEAEA",
  background: "#fff",
  boxSizing: "border-box",
  width: "100%",
  height: 40,
  padding: 16,
  marginTop: 2,
  "&:focus": {
    border: "1px solid #1239AE",
  },
  // multiline: props.multiline || false,
}));

export const StyledSelect = styled(Select)(() => ({
  // border: '1px solid #EAEAEA',
  // background: '#fff',
  // boxSizing: 'border-box',
  // width: '100%',
  // height: 40,
  // padding: 8,
  // marginTop: 2,
  // ['&:focus']: {
  //   border: '1px solid #1239AE',
  // },
}));

export const ReactSelect = styled(RSelect)(() => ({
  background: "inherit",
  width: "100%",
  height: 40,
  marginTop: 2,
}));

export const CreatableReactSelect = styled(CRSelect)(() => ({
  background: "inherit",
  width: "100%",
  height: 40,
  marginTop: 2,
}));

export const AsyncReactSelect = styled(ARSelect)(() => ({
  background: "inherit",
  width: "100%",
  height: 40,
  marginTop: 2,
}));

export const TextArea = styled("textarea")(() => ({
  border: "1px solid #EAEAEA",
  background: "#fff",
  boxSizing: "border-box",
  width: "100%",
  padding: 16,
  marginTop: 2,
  "&:focus": {
    border: "1px solid #1239AE",
  },
}));

export const SegmentedRadioGroup = styled(RadioGroup)(() => ({
  display: "flex",
  background: "rgba(0,27,72,.08)",
  borderRadius: 8,
  boxSizing: "border-box",
  height: "32px",
  margin: "1px",
  padding: "3px",
  position: "relative",
  verticalAlign: "middle",
}));

export const SegmentedRadioGroupDividers = styled("div")(() => ({
  alignItems: "center",
  bottom: 0,
  display: "flex",
  left: "3px",
  position: "absolute",
  right: 3,
  top: 0,
}));

export const SegmentedRadioGroupDivider = styled("div")(() => ({
  borderLeft: "1px solid transparent",
  borderRight: "1px solid rgba(0,27,72,.22)",
  flexGrow: 1,
  height: "16px",
  position: "relative",
  "&:last-child": {
    borderRightColor: "transparent",
  },
}));

export const SegmentedRadioGroupCurrent = styled("div")(() => ({
  backgroundColor: "#fff",
  borderRadius: 5,
  boxShadow: "0 0 2px rgb(0 27 72 / 54%)",
  height: "26px",
  position: "absolute",
  transition: ".2s ease-in-out",
}));

export const SegmentedRadio = styled("div")(() => ({
  flexBasis: 0,
  flexGrow: 1,
}));

export const SegmentedRadioInput = styled(Radio)(() => ({
  display: "none",
}));

export const SegmentedRadioLabel = styled("label")(() => ({
  backgroundColor: "transparent",
  borderRadius: "5px",
  boxSizing: "border-box",
  color: "rgba(0,14,36,.87)",
  cursor: "pointer",
  display: "block",
  fontSize: 12,
  lineHeight: "26px",
  overflow: "hidden",
  padding: "0 8px",
  position: "relative",
  textAlign: "center",
  textDecoration: "none",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
  fontWeight: "bold",
}));

export const MonthSelect = styled("ul")(() => ({
  display: "flex",
  flexWrap: "wrap",
  listStyle: "none",
  margin: 0,
  padding: 0,
  width: "100%",
}));

export const MonthSelectOption = styled("li")(() => ({
  alignItems: "center",
  borderBottom: "1px solid #EAEAEA",
  borderRight: "1px solid #EAEAEA",
  borderRadius: 0,
  boxSizing: "border-box",
  display: "flex",
  height: "40px",
  justifyContent: "center",
  overflow: "hidden",
  textAlign: "center",
  width: "14.28571%",
  "&:nth-of-type(-n+7)": {
    borderTop: "1px solid #EAEAEA",
  },
  "&:nth-of-type(7n-6)": {
    borderLeft: "1px solid #EAEAEA",
  },
  "&:first-child": {
    borderTopLeftRadius: "8px",
  },
  "&:nth-child(7)": {
    borderTopRightRadius: "8px",
  },
  "&:nth-child(29)": {
    borderBottomLeftRadius: "8px",
  },
  "&:nth-child(28)": {
    borderBottomRightRadius: "8px",
  },
  "&:last-element": {
    borderBottomRightRadius: "8px",
  },
}));

export const MonthSelectOptionButton = styled(Button, {
  shouldForwardProp: (props) => props !== "selected",
})<{ selected?: boolean }>(({ selected }) => ({
  appearance: "none",
  backgroundColor: selected ? "#E5E5E5" : "#fff",
  borderStyle: "none",
  borderRadius: 0,
  color: selected ? "#1239AE" : "inherit",
  height: "100%",
  outline: "none",
  overflow: "hidden",
  paddingLeft: "4px",
  paddingRight: "4px",
  textOverflow: "ellipsis",
  width: "100%",
}));
