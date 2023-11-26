import HomeWrapper from "../../components/HomeWrapper";
import {styled} from "@mui/material/styles";
import {TextField} from "@mui/material";
import {COLOR} from "../../util/util";
import {useState} from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import {useRecoilState} from "recoil";
import {tpostListAtom} from "../../0.Recoil/postState";
import {useNavigate} from "react-router-dom"; // Import the delete icon


export default function StoreCreatePost() {
  const [tpostList, setTPostList] = useRecoilState(tpostListAtom)
  const navigate = useNavigate()
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handlePriceChange = (event) => {
    const value = event.target.value;
    setPrice(value !== '' ? parseInt(value, 10) : '');
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDeleteImage = () => {
    setImage(null);
  };

  function handlePost() {
    // Temp
    const id = tpostList.length + 2
    const post = {
      img: image,
      id,
      userId: id,
      title,
      price,
      description,
    }
    setTPostList([...tpostList, post])
    navigate('/store')
  }

  return(
    <HomeWrapper>
      <Base>
        <TitleArea>
          <Title>Sell an Item</Title>
        </TitleArea>
        <Content>
          <ImageBox style={{ backgroundImage: `url(${image})` }}>
            {image && (
              <DeleteButton onClick={handleDeleteImage}>
                <DeleteIcon style={{fontSize:'2rem'}}/>
              </DeleteButton>
            )}
            {!image && (
              <label htmlFor="file-input">
                <UploadButton variant="contained" component="span">
                  Upload Image
                </UploadButton>
              </label>
            )}
            <input
              type="file"
              id="file-input"
              style={{ display: 'none' }}
              accept="image/*"
              onChange={handleImageChange}
            />
          </ImageBox>
          <TextField
            id="outlined-multiline-flexible"
            label="Title"
            maxRows={4}
            fullWidth
            autoComplete="off"
            value={title}
            onChange={handleTitleChange}
            sx={{
              marginTop:'2rem',
              '& .MuiInputBase-input': { fontSize: '1.6rem' },
            }}
          />
          <TextField
            id="price-input"
            type="number"
            label="Price"
            maxRows={4}
            fullWidth
            autoComplete="off"
            value={price}
            onChange={handlePriceChange}
            InputProps={{ inputProps: { min: 0 } }}
            sx={{
              marginTop:'2rem',
              '& .MuiInputBase-input': { fontSize: '1.6rem' },
            }}
          />
          <TextField
            id="outlined-multiline-static"
            label="Description"
            multiline
            rows={15}
            fullWidth
            autoComplete="off"
            value={description}
            onChange={handleDescriptionChange}
            sx={{
              marginTop:'2rem',
              marginBottom:'2rem',
              '& .MuiInputBase-input': { fontSize: '1.6rem' },
            }}
          />
          <Button onClick={handlePost}>Post</Button>
        </Content>
      </Base>
    </HomeWrapper>
  )
}

const Base = styled('div')({
  display: 'flex',
  flexDirection: 'column',
});

const Content = styled('div')({
  display:'flex',
  flexDirection:'column',
  flex: 1,
  paddingTop:'5rem',
  paddingBottom:'3rem',
  paddingLeft: '2rem',
  paddingRight: '2rem',
  alignItems: 'center',
  backgroundColor:'white',
});

const TitleArea = styled('div')({
  display:'flex',
  flexDirection:'column',
  height: '6rem',
  marginLeft:'1rem',
  justifyContent:'center',
});

const Title = styled('div')({
  fontSize: '2.0rem',
  fontWeight:'700',
  textAlign:'left',
});

const Button = styled('div')({
  display:'flex',
  fontSize:'1.6rem',
  fontWeight:'600',
  width:'8rem',
  height:'3rem',
  alignItems:'center',
  justifyContent:'center',
  backgroundColor: COLOR.mainYellow,
  '&:hover': {
    backgroundColor: COLOR.mainLightYellow,
  },
  color: 'white',
  borderRadius:'2px',
  cursor:'pointer',
})

const ImageBox = styled('div')({
  position:'relative',
  display:'flex',
  justifyContent:'center',
  alignItems:'center',
  width: '100%',
  height: '20rem',
  borderRadius:'5px',
  border: `1px solid ${COLOR.lineGray}`,
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'contain',
});

const UploadButton = styled('div')({
  display:'flex',
  fontSize:'1.6rem',
  fontWeight:'600',
  width:'14rem',
  height:'3rem',
  alignItems:'center',
  justifyContent:'center',
  border: `1px solid ${COLOR.mainYellow}`,
  '&:hover': {
    backgroundColor: COLOR.mainLightYellow10,
  },
  color: COLOR.mainYellow,
  borderRadius:'30px',
  cursor:'pointer',
})

const DeleteButton = styled('button')({
  position: 'absolute',
  right: '1rem',
  bottom: '1rem',
  backgroundColor: 'white',
  border: 'none',
  cursor: 'pointer',
});
