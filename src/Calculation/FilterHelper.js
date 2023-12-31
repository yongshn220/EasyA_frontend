

export default class FilterHelper {

  static filterByMajor(data, filteredMajors) {
    return data.filter((course) => !filteredMajors.includes(course.name.substring(0, 3)))
  }

  static filterBySBC(data, filteredSBCs) {
    return data.filter((course) => {
      if (course["SBC"]?.length === 0 && !filteredSBCs.includes("None")) return true

      for (let sbc of course["SBC"]) {
        if (!filteredSBCs.includes(sbc)) {
          return true
        }
      }
      return false
    })
  }

  static filterByLevel(data, filteredLevels) {
    return data.filter((course) => {
      for (let level of filteredLevels) {
        if (course.name.substring(3,4) === level.toString().substring(0,1))
          return false
      }
      return true
    })
  }

  static filterByCourseSize(data, courseSize) {
    return data.filter((course) => {
      return course["Grade_numOfStudents"] >= courseSize
    })
  }

  static getIntersectionOfData(dataA, dataB, dataC, dataD) {
    let result = []

    let ai = 0, bi = 0, ci = 0, di = 0
    while (ai < dataA.length && bi < dataB.length && ci < dataC.length && di < dataD.length) {
      if (
        dataA[ai]["_id"] === dataB[bi]["_id"] &&
        dataB[bi]["_id"] === dataC[ci]["_id"] &&
        dataC[ci]["_id"] === dataD[di]["_id"]
      ) {
        result.push(dataA[ai])
        ai += 1
        bi += 1
        ci += 1
        di += 1
      }
      else if (dataA[ai]["_id"] < dataB[bi]["_id"])
        ai += 1
      else if (dataB[bi]["_id"] < dataC[ci]["_id"])
        bi += 1
      else if (dataC[ci]["_id"] < dataD[di]["_id"])
        ci += 1
      else
        di += 1
    }
    return result
  }
}
