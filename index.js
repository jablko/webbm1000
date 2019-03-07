// https://github.com/zh2x/SpO2-BLE-for-Android/blob/master/app/src/main/java/com/berry_med/spo2_ble/data/Const.java
export const UUID_SERVICE_DATA = '49535343-fe7d-4ae5-8fa9-9fafd205e455'
export const UUID_CHARACTER_RECEIVE = '49535343-1e4d-4bd9-ba61-23c647249616'

// https://github.com/zh2x/BCI_Protocol/blob/master/BCI%20Protocol%20V1.2.pdf
export function parseData(bytes) {
  const result = {}

  result.signalStrength = bytes[0] & 0xf
  result.noSignal = Boolean(bytes[0] & 0x10)
  result.probeUnplugged = Boolean(bytes[0] & 0x20)
  result.pulseBeep = Boolean(bytes[0] & 0x40)

  result.pleth = bytes[1] & 0x7f
  result.invalidPleth = result.pleth == 0

  result.bargraph = bytes[2] & 0xf
  result.invalidBargraph = result.bargraph == 0
  result.noFinger = Boolean(bytes[2] & 0x10)
  result.pulseResearch = Boolean(bytes[2] & 0x20)

  // Bit 6 of byte 3 is bit 7 of the pulse rate
  result.pulseRate = (bytes[2] & 0x40) << 1 | bytes[3] & 0x7f
  result.invalidPulseRate = result.pulseRate == 0xff

  result.spo2 = bytes[4] & 0x7f
  result.invalidSpo2 = result.spo2 == 0x7f

  return result
}
