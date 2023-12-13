import HomeWrapper from "../../components/HomeWrapper";
import {styled} from "@mui/material/styles";
import Comment from "./Comment";
import {useParams} from "react-router-dom";
import {storePostAtom} from "../../0.Recoil/postState";
import {useRecoilValue} from "recoil";
import CreateComment from "./CreateComment";
import { useSwipeable } from 'react-swipeable';
import {useEffect, useMemo, useState} from "react";
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import Avatar from "@mui/material/Avatar";
import {COLOR} from "../../util/util";
import * as React from "react";
import PostHeaderMenu from "./PostHeaderMenu";
import {formatTimestamp} from "../../util/timeHelper";
import {authAtom, userAtom} from "../../0.Recoil/accountState";
import {ErrorBoundary} from "react-error-boundary";
import Linkify from 'react-linkify';


export default function StorePostWrapper() {
  return (
    <HomeWrapper>
      <ErrorBoundary fallback={<></>}>
        <StorePost/>
      </ErrorBoundary>
    </HomeWrapper>
    )
}

export function stringAvatar() {
  return {
    sx: {
      bgcolor: COLOR.mainYellow,
      width:'4rem',
      height: '4rem',
      marginRight:'1rem',
    },
  };
}

function StorePost() {
  const { id } = useParams();
  const post = useRecoilValue(storePostAtom(id))
  const auth = useRecoilValue(authAtom)
  const user = useRecoilValue(userAtom)
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [highResImages, setHighResImages] = useState([]);


  useEffect(() => {
    console.log(post)
    if (post.images.length <= 0) return;
    const loadedHighResImages = post.images.map(image => {
      const img = new window.Image()
      img.src = image.highRes;
      return img;
    })
    setHighResImages(loadedHighResImages)
  }, [post.images])

  const currentImageSrc = useMemo(() => {
    if (post.images.length <= 0) return null
    return highResImages[currentImageIndex]?.src || post.images[currentImageIndex].lowRes;
  }, [currentImageIndex, highResImages, post.images]);

  const handlers = useSwipeable({
    onSwipedLeft: () => nextImage(),
    onSwipedRight: () => prevImage(),
    preventDefaultTouchmoveEvent: true,
    trackMouse: true
  });

  if (!post) return <></>

  function nextImage() {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % post.images.length);
  }

  function prevImage() {
    setCurrentImageIndex((prevIndex) => (prevIndex === 0 ? post.images.length - 1 : prevIndex - 1))
  }

  function ImageDots({ length, currentIndex }) {
    return (
      <div style={{ textAlign: 'center' }}>
        {Array.from({ length }, (_, index) => (
          <Dot key={index} active={index === currentIndex} />
        ))}
      </div>
    );
  }

  // TODO: This should be done in the server side to hide the owner's email.
  function isMyPost() {
    if (!user) return false
    return user.email === post.email
  }

  return (
    <Base>
      <Content {...handlers}>
        <Header>
          <HeaderProfile>
            <HeaderAuthorInfo>
              <Avatar {...stringAvatar()} />
              <AuthorName>{isMyPost()? "Me" : "Author"}</AuthorName>
            </HeaderAuthorInfo>
            <HeaderPostInfo>
              {formatTimestamp(post.timestamp)}
            </HeaderPostInfo>
          </HeaderProfile>
          <HeaderMenu>
            {isMyPost() && <PostHeaderMenu auth={auth} id={post.id}/>}
          </HeaderMenu>
        </Header>
        {
          (post.images.length > 0) &&
          <ImageArea>
            <LeftButton onClick={prevImage}/>
            <ImageBox style={{ backgroundImage: `url(${currentImageSrc})` }}/>
            <RightButton onClick={nextImage}/>
          </ImageArea>
        }
        <ImageDots length={post.images.length} currentIndex={currentImageIndex} />
        <TextArea>{post.title}</TextArea>
        <TextArea>${post.price}</TextArea>
        <DescriptionArea>
          <Linkify>
            {post.description}
          </Linkify>
        </DescriptionArea>
      </Content>
      <CreateComment postId={post._id}/>
      <CommentArea>
        {
          post.comments.map((comment, index) => (
            <Comment key={index} postId={post._id} comment={comment}/>
          ))
        }
      </CommentArea>
    </Base>
  )
}

const Base = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  marginBottom:'2rem',
});


const Content = styled('div')({
  display:'flex',
  flexDirection:'column',
  flex: 1,
  padding: '4rem',
  marginTop:'1rem',
  marginBottom: '2rem',
  alignItems: 'center',
  borderRadius: '5px',
  backgroundColor:'white',
});

const Header = styled('div')({
  display:'flex',
  width:'100%',
  height:'8rem',
})

const HeaderProfile = styled('div')({
  display:'flex',
  flexDirection: 'column',
  flex: 1,
})

const HeaderAuthorInfo = styled('div')({
  display:'flex',
  marginBottom:'1rem',
  flex: 1,
})

const AuthorName = styled('div')({
  display: 'flex',
  alignItems: 'center',
  fontSize:'1.6rem',
  fontWeight:'600',
})

const HeaderPostInfo = styled('div')({
  display:'flex',
  flex: 1,
  fontSize:'1.2rem',
})

const HeaderMenu = styled('div')({
  display:'flex',
  flex: 1,
  alignItems:'flex-start',
  justifyContent:'flex-end',
})

const TextArea = styled('div')({
  display:'flex',
  flexDirection:'column',
  height: '5rem',
  width:'100%',
  marginLeft: '1rem',
  fontSize: '2rem',
  fontWeight:'700',
  textAlign: 'left',
  justifyContent:'center',
});

const DescriptionArea = styled('p')({
  display: 'flex',
  flexDirection: 'column',
  fontSize: '1.6rem',
  height: 'auto',
  width:'100%',
  maxWidth: '100%', // Set the maximum width
  marginLeft: '1rem',
  textAlign: 'left',
  paddingTop: '2rem',
  whiteSpace: 'pre-wrap', // Preserves whitespace and line-breaks
  overflowWrap: 'break-word', // Ensures long words are broken and wrapped to the next line
  wordBreak: 'break-all', // Breaks words to prevent overflow
});

const CommentArea = styled('div')({
  display:'flex',
  flexDirection:'column',
  flex: 1,
  marginTop:'2rem',
  width:'100%',
  borderRadius:'5px',
  backgroundColor:'white'
});

const ImageArea = styled('div')({
  display:'flex',
  alignItems:'center',
  justifyContent:'center',
  width:'100%',
});


const ImageBox = styled('div')({
  width: '100%',
  aspectRatio: '1/0.5',
  marginBottom: '1rem',
  borderRadius:'5px',
  backgroundColor:'#2d2d2d',
  backgroundPosition: 'center', // Center the image
  backgroundRepeat: 'no-repeat', // Do not repeat the image
  backgroundSize: 'contain', // Adjusts the size to maintain aspect ratio
});

const LeftButton = styled(KeyboardArrowLeftIcon)({
  position:'absolute',
  left:'0.5rem',
  fontSize:'3rem',
  cursor:'pointer'
});

const RightButton = styled(KeyboardArrowRightIcon)({
  position:'absolute',
  right:'0.5rem',
  fontSize:'3rem',
  cursor:'pointer'
});

const Dot = styled('div')(({ active }) => ({
  height: '0.8rem',
  width: '0.8rem',
  backgroundColor: active ? '#757575' : '#d5d5d5', // Active dot is darker
  borderRadius: '50%',
  display: 'inline-block',
  margin: '5px',
}));
