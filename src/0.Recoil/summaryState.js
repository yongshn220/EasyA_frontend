import {atom, atomFamily, selectorFamily} from "recoil";
import {getSummary} from "../api/api";

export const HardwareType = {
  PC: 'hardwareTypePC',
  MOBILE: 'hardwareTypeMobile',
}

export const userHardWareTypeAtom = atom({
  key: 'userHardWareTypeAtom',
  default: HardwareType.PC,
})

export const defaultYearAtom = atom({
  key: 'defaultYearAtom',
  default: 2020,
})

export const summaryByStartYearAtom = atomFamily({
  key: 'summaryByStartYearAtomAtom',
  default: selectorFamily({
    key: 'summaryByStartYearAtomAtom/Default',
    get: (year) => async () => {
      return await getSummary(year);
    }
  })
})


export const selectedCourseDataAtom = atom({
  key: "selectedCourseDataAtom",
  default: null
})


export const gradeRankAtom = atom({
  key: "gradeRankAtom",
  default: {}
})

export const studyingHoursRankAtom = atom({
  key: "studyingHoursRankAtom",
  default: {}
})


