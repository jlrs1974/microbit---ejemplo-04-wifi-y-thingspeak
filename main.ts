ESP8266_IoT.initWIFI(SerialPin.P8, SerialPin.P12, BaudRate.BaudRate115200)
ESP8266_IoT.connectWifi("MSI-JLRS", "050191gemma")
let contador = 0
basic.clearScreen()
OLED.init(128, 64)
OLED.clear()
basic.forever(function () {
    basic.pause(60000)
    ESP8266_IoT.connectThingSpeak()
    if (ESP8266_IoT.wifiState(true) && ESP8266_IoT.thingSpeakState(true)) {
        contador = contador + 1
        ESP8266_IoT.setData(
        "RY1W34VOS4Q56GZB",
        input.temperature(),
        contador,
        input.lightLevel()
        )
        ESP8266_IoT.uploadData()
        basic.showNumber(contador)
        OLED.writeString("Contador: ")
        OLED.writeNum(contador)
        OLED.writeString(" - ")
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
