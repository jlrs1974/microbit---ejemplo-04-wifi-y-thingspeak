let Time = ""
let NivelLuz = 0
ESP8266_IoT.initWIFI(SerialPin.P8, SerialPin.P12, BaudRate.BaudRate115200)
ESP8266_IoT.connectWifi("MiFibra-JLRS", "@1927#Marcos")
basic.clearScreen()
OLED.init(128, 64)
OLED.clear()
basic.forever(function () {
    basic.pause(60000)
    NivelLuz = Environment.ReadLightIntensity(AnalogPin.P1)
    ESP8266_IoT.connectThingSpeak()
    if (ESP8266_IoT.wifiState(true) && ESP8266_IoT.thingSpeakState(true)) {
        ESP8266_IoT.setData(
        "RY1W34VOS4Q56GZB",
        input.temperature(),
        NivelLuz
        )
        Time = timeanddate.time(timeanddate.TimeFormat.HHMM24hr)
        basic.showString(Time)
        ESP8266_IoT.uploadData()
        OLED.writeString("Hora: ")
        OLED.writeString(Time)
        OLED.writeString(" - ")
        OLED.writeString("T (C): ")
        OLED.writeNum(input.temperature())
        OLED.writeString(" - ")
        OLED.writeString("Luz (%): ")
        OLED.writeNum(NivelLuz)
        OLED.newLine()
    }
})
