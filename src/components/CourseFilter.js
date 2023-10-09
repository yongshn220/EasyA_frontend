import Box from "@mui/material/Box";
import Chip from '@mui/material/Chip';
import {useRecoilState, useRecoilValue} from "recoil";
import {filteredMajorsAtom, majorListAtom, SBCs} from "../0.Recoil/summaryState";
import {useEffect} from "react";
import Button from "@mui/material/Button";


export default function CourseFilter() {
  const majorList = useRecoilValue(majorListAtom);
  const [filteredMajors, setFilteredMajors] = useRecoilState(filteredMajorsAtom);

  useEffect(() => {
    console.log(filteredMajors);
  }, [filteredMajors])

  function handleClickMajor(e, major) {
    e.stopPropagation();

    if (filteredMajors.includes(major)) {
      setFilteredMajors(filteredMajors.filter((_major) => _major !== major));
    }
    else {
      setFilteredMajors([...filteredMajors, major])
    }
  }

  function handleClickSelectAllMajors(e) {
    e.stopPropagation()
    setFilteredMajors([])
  }

  function handleClickUnselectAllMajors(e) {
    e.stopPropagation()
    setFilteredMajors(majorList)
  }

  return (
    <Box style={{display:'flex', flexDirection:'column', flex:'1', marginLeft:40, marginRight:40, padding:20, borderRadius:'5px', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)', backgroundColor:'white'}}>
      <Box style={{position:'absolute', fontSize:'1.6rem', fontWeight:'700'}}>
        Filter
      </Box>
      <Box style={{dispCourseFilterlay:'flex', flexDirection:'column', flex:1}}>
        <Box style={{flex:0, fontSize:'1.6rem', fontWeight:'600', color:'gray'}}>
          Majors
        </Box>
        <Box style={{flex:1, padding:'10px'}}>
          {
            majorList.map((major) => {
              const variant = (filteredMajors.includes(major))? "outlined" : "";
              return <Chip key={major} onClick={(e) => handleClickMajor(e, major)} label={major} color="primary" sx={{fontSize:'1.2rem', margin:'3px'}} variant={variant} />
            })
          }
          <Box style={{display:'flex', flex:1, flexDirection:'row', justifyContent:'center'}}>
            <Button onClick={(e) => handleClickSelectAllMajors(e)} style={{position:'relative', width:'100px', marginTop:10}}>Select All</Button>
            <Button onClick={(e) => handleClickUnselectAllMajors(e)} style={{position:'relative', width:'100px', marginTop:10}}>Unselect All</Button>
          </Box>
        </Box>
      </Box>
      <Box style={{display:'flex', flexDirection:'column', flex:1}}>
        <Box style={{flex:0, fontSize:'1.6rem', fontWeight:'600', color:'gray'}}>
          SBCs (It will be available soon)
        </Box>
        <Box style={{flex:1, padding:'10px'}}>
          {
            SBCs.map((sbc) => {
              return <Chip key={sbc} disabled={true} color="success" onClick={(e) => console.log(sbc)} label={sbc} sx={{fontSize:'1.2rem', margin:'3px'}} variant="" />
            })
          }
          <Box style={{display:'flex', flex:1, flexDirection:'row', justifyContent:'center'}}>
            <Button style={{position:'relative', width:'100px', marginTop:10}}>Select All</Button>
            <Button style={{position:'relative', width:'100px', marginTop:10}}>Unselect All</Button>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}