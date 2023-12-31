import {styled} from "@mui/material/styles";
import {COLOR} from "../../util/util";


export default function ItemColumnBox({onClick, content}) {
  return (
    <Base onClick={onClick}>
      <Title>{content.title}</Title>
      <SubTitle>{content.subTitle}</SubTitle>
    </Base>
  )
}

const Base = styled('div')({
  display:'flex',
  flexDirection:'column',
  justifyContent:'center',
  height: '8rem',
  borderBottom: `0.5px solid ${COLOR.lineGray}`,
  paddingLeft:"2rem",
  cursor:'pointer',
});

const Title = styled('div')({
  fontSize: '1.6rem',
  fontWeight:'700',
  textAlign:'left',
});

const SubTitle = styled('div')({
  fontSize: '1.6rem',
  textAlign:'left',
  color: COLOR.fontGray50,
  marginTop:'0.5rem',
})
