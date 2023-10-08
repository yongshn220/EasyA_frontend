import Box from "@mui/material/Box";
import {useEffect, useMemo} from "react";
import SortingHelper from "../Calculation/SortingHelper";
import Rank from "./Rank";
import {useSetRecoilState} from "recoil";
import {gradeRankAtom} from "../0.Recoil/summaryState";

export default function GradeRank({data}) {
  const setGradeRank = useSetRecoilState(gradeRankAtom);

  const avgSortedByGrade = useMemo(() => {
    return SortingHelper.sortByGrade(data)
  }, [data])

  useEffect(() => {
    let rank = {}
    avgSortedByGrade.forEach((data, index) => {
      rank[data.name] = index + 1
    })
    setGradeRank(rank);
  }, [setGradeRank, avgSortedByGrade])

  return (
    <Box style={{flex:1, display:'flex', flexDirection:'column', justifyContent:'center'}}>
      <Rank title={"Highest A's"} avgData={avgSortedByGrade} rankType={"Grade"}/>
    </Box>
  )
}
