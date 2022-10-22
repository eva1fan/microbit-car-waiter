直行时长 = 0
正在前进 = 0

def on_forever():
    global 正在前进, 直行时长
    if 正在前进 == 1:
        basic.show_number(直行时长)
    else:
        basic.show_icon(IconNames.HEART)
        if Tinybit.Voice_Sensor() > 100:
            正在前进 = 1
    if 正在前进 == 1 and 直行时长 < 5:
        if Tinybit.Line_Sensor(Tinybit.enPos.LEFT_STATE, Tinybit.enLineState.WHITE) and Tinybit.Line_Sensor(Tinybit.enPos.RIGHT_STATE, Tinybit.enLineState.WHITE):
            Tinybit.car_ctrl_speed(Tinybit.CarState.CAR_RUN, 70)
        elif Tinybit.Line_Sensor(Tinybit.enPos.LEFT_STATE, Tinybit.enLineState.BLACK) and Tinybit.Line_Sensor(Tinybit.enPos.RIGHT_STATE, Tinybit.enLineState.WHITE):
            Tinybit.car_ctrl_speed(Tinybit.CarState.CAR_SPINLEFT, 70)
        elif Tinybit.Line_Sensor(Tinybit.enPos.LEFT_STATE, Tinybit.enLineState.WHITE) and Tinybit.Line_Sensor(Tinybit.enPos.RIGHT_STATE, Tinybit.enLineState.BLACK):
            Tinybit.car_ctrl_speed(Tinybit.CarState.CAR_SPINRIGHT, 70)
        else:
            Tinybit.car_ctrl(Tinybit.CarState.CAR_STOP)
    else:
        Tinybit.car_ctrl(Tinybit.CarState.CAR_STOP)
        正在前进 = 0
        直行时长 = 0
basic.forever(on_forever)
