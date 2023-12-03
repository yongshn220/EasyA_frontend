import {Checkbox, Input} from "@mui/material";
import {COLOR} from "../../util/util";
import {styled} from "@mui/material/styles";
import {useState} from "react";
import {addReply} from "../../api/api";
import {useRecoilValue} from "recoil";
import {userAtom} from "../../0.Recoil/accountState";


export default function CreateReply({postId, commentId}) {
  const user = useRecoilValue(userAtom)
  const [replyText, setReplyText] = useState('');
  const [isSecret, setIsSecret] = useState(false);


  const handleInputChange = (event) => {
    setReplyText(event.target.value);
  };

  const handleCheckboxChange = (event) => {
    setIsSecret(event.target.checked);
  };

  const HandleAddReply = () => {
    addReply(user, postId, commentId, replyText, isSecret).then(res =>{
      if (res.status_code === 200) {
        console.log("suc", res)
      }
      else {
        console.log("fail", res)
      }
    })

    // Reset fields after submission
    setReplyText('');
    setIsSecret(false);
  };


  return (
    <Base>
      <Input
        id="outlined-multiline-flexible"
        placeholder="Add a reply..."
        disableUnderline
        fullWidth
        autoComplete="off"
        value={replyText}
        onChange={handleInputChange}
        inputProps={{maxLength: 100,}}
        style={{fontSize:'1.6rem', height:'5rem', paddingLeft:'1rem', marginBottom:'1rem', backgroundColor:'white', borderRadius: '5px',
          border: `0.5px solid ${COLOR.lineGray}`,}}
      />
      <div style={{flex: 1, display: 'flex', justifyContent:'flex-end', fontSize:'1.2rem', fontWeight:'600'}}>
        <div style={{flex:0}}>
          <Checkbox
            defaultChecked
            checked={isSecret}
            onChange={handleCheckboxChange}
            sx={{ '& .MuiSvgIcon-root': { fontSize: '2rem' },  '&.Mui-checked': {color: COLOR.fontGray50,},}}
          />
        </div>
        <div style={{display:'flex', flex: '0 0 12rem', flexDirection:'column', justifyContent:'center'}}>
          <div style={{display: 'inline-block', fontSize:'1.2rem', fontWeight:'700', color:COLOR.fontGray80}}>
            Secret Reply
          </div>
          <div style={{display: 'inline-block', fontSize:'1rem', fontWeight:'600', color:COLOR.fontGray50}}>
            Only seller can see it
          </div>
        </div>
      </div>
      <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-end', marginRight:'1rem', marginTop:'1rem'}}>
        <Button onClick={HandleAddReply}>Reply</Button>
      </div>
    </Base>
  )
}


const Base = styled('div')({
  display:'flex',
  flexDirection:'column',
  flex: 1,
  borderRadius:'5px',
  padding:'2rem',
  backgroundColor:'white',
});

const Button = styled('div')({
  display:'flex',
  fontSize:'1.6rem',
  fontWeight:'600',
  width:'10rem',
  height:'3rem',
  alignItems:'center',
  justifyContent:'center',
  borderRadius:'5px',
  backgroundColor: COLOR.mainYellow,
  '&:hover': {
    backgroundColor: COLOR.mainLightYellow,
  },
  color: 'white',
  cursor:'pointer',
})