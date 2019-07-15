exports. convert = function(performance) {
    return {
        lastName: performance.lastName.stringValue,
        trainEffect: performance.trainEffect.numberValue,
        chronicTrainLoad: performance.chronicTrainLoad.numberValue,
        acuteTrainLoad: performance.acuteTrainLoad.numberValue,
        epoc: performance.epoc.numberValue,
        firstName: performance.firstName.stringValue,
        trimp: performance.trimp.numberValue,
        acwr: performance.acwr.numberValue
    }
}