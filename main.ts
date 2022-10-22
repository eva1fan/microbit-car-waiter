let 任务中 = 0
let 左转掉头剩余时间 = 0
basic.forever(function () {
    if (任务中 != 1) {
        if (Tinybit.Voice_Sensor() > 50) {
            任务中 = 1
        }
    } else {
        basic.showIcon(IconNames.Giraffe)
    }
})
basic.forever(function () {
    if (任务中 == 1) {
        if (Tinybit.Line_Sensor(Tinybit.enPos.LeftState, Tinybit.enLineState.White) && Tinybit.Line_Sensor(Tinybit.enPos.RightState, Tinybit.enLineState.White)) {
            Tinybit.CarCtrlSpeed(Tinybit.CarState.Car_Run, 70)
        } else if (Tinybit.Line_Sensor(Tinybit.enPos.LeftState, Tinybit.enLineState.Black) && Tinybit.Line_Sensor(Tinybit.enPos.RightState, Tinybit.enLineState.White)) {
            Tinybit.CarCtrlSpeed(Tinybit.CarState.Car_SpinLeft, 70)
        } else if (Tinybit.Line_Sensor(Tinybit.enPos.LeftState, Tinybit.enLineState.White) && Tinybit.Line_Sensor(Tinybit.enPos.RightState, Tinybit.enLineState.Black)) {
            Tinybit.CarCtrlSpeed(Tinybit.CarState.Car_SpinRight, 70)
        } else if (Tinybit.Line_Sensor(Tinybit.enPos.LeftState, Tinybit.enLineState.Black) && Tinybit.Line_Sensor(Tinybit.enPos.RightState, Tinybit.enLineState.Black)) {
            Tinybit.CarCtrl(Tinybit.CarState.Car_Stop)
            任务中 = 0
            左转掉头剩余时间 = 26
        }
    } else if (左转掉头剩余时间 > 0) {
        Tinybit.CarCtrlSpeed(Tinybit.CarState.Car_SpinLeft, 70)
        左转掉头剩余时间 += -1
    } else {
        Tinybit.CarCtrl(Tinybit.CarState.Car_Stop)
    }
})
