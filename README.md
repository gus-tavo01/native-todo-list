# Todo App

## Known Issues

- none

## Enhancements and future updates (V 3.0.0)

- Add menu (Configuration, About, Login) button on Home screen header
- Create about screen with app and author information

### Configuration feature

- set app theme
  - select a predefined theme for the whole app
  - applies for lists and todos cart components font and background color
- switch between dark or light app theme
- Backup data
  - Sync local data with server

### Import data feature

This feature allows the user to import previous data for existing lists and app configuration

- Define a format to receive (json)
  - {lists, configuration: {theme, isDark}}

The import feature could be when the user logs in the application

- Define when to sync the server data with the local stored

## Deploy app

### Android

- in android directory run command: ./gradlew assembleRelease
