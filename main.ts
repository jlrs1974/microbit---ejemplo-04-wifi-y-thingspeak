ESP8266_IoT.initWIFI(SerialPin.P8, SerialPin.P12, BaudRate.BaudRate115200)
ESP8266_IoT.connectWifi("MSI-JLRS", "050191gemma")
basic.clearScreen()
OLED.init(128, 64)
OLED.clear()
basic.forever(function () {
    basic.pause(60000)
    ESP8266_IoT.connectThingSpeak()
    if (ESP8266_IoT.wifiState(true) && ESP8266_IoT.thingSpeakState(true)) {
        ESP8266_IoT.setData(
        "RY1W34VOS4Q56GZB",
        input.temperature()
        )
        ESP8266_IoT.uploadData()
        OLED.writeString("Hora: ")
        OLED.writeString(timeanddate.time(timeanddate.TimeFormat.HHMMSS24hr))
        OLED.writeString(" - ")
        OLED.writeString("T (C): ")
        OLED.writeNum(input.temperature())
        OLED.newLine()
    } else {
        basic.showIcon(IconNames.Sad)
    }
})
