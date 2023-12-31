export const COLOR = {
  default: "rgb(250,248,236)",
  yellow: "#e0b548",
  blue: "#4169e1",
  transparentYellow: "rgba(224,181,72,0.3)",
  lightYellow: "#e7c675",
  lineGray: "#c5c5c5",
  lineGray30: "#e0e0e0",
  fontGray80: "rgb(51,51,51)",
  fontGray50: "rgb(96,96,96)",
  mainYellow: "#FFB700",
  mainLightYellow: "#ffd361",
  mainLightYellow10: "#fff3d1",
}

export const InsideWidthDesktop = '1300px'
export const ContentWidthDesktop = '1000px'

export const whiteYellowInputFieldStyle = {
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: 'white', // Set your desired border color
    },
    '&.Mui-focused fieldset': {
      borderColor: COLOR.yellow, // Change this to your desired color
    },
    '&:hover fieldset': {
      borderColor: COLOR.lightYellow, // Set border color on hover
    },
  },
  '& .MuiFormLabel-root': {
    color: 'white', // Set the label font color
  },
  '& .MuiInputBase-input': {
    color: 'white', // Set your desired font color
  },
  '& label.Mui-focused': {
    color: 'white', // Change this to your desired label color
  },
};


export function stringAvatar(name) {
  return {
    sx: {
      bgcolor: COLOR.mainYellow,
      cursor:'pointer',
      width:'7rem',
      height: '7rem',
      margin: '2rem',
    },
    children: `${name.split(' ')[0][0]}`,
  };
}
