game.splash("Hi, I am your Math AI!")

forever(function () {
    // 1. Choose the operation
    let choice = game.askForNumber("1:+, 2:-, 3:x, 4:/")
    
    // 2. Ask for the two numbers
    let num_1 = game.askForNumber("First number:")
    let num_2 = game.askForNumber("Second number:")
    let result = 0
    let symbol = ""

    // 3. Logic to decide which math to do
    if (choice == 1) {
        result = num_1 + num_2
        symbol = "+"
    } else if (choice == 2) {
        result = num_1 - num_2
        symbol = "-"
    } else if (choice == 3) {
        result = num_1 * num_2
        symbol = "x"
    } else if (choice == 4) {
        // Simple check to prevent dividing by zero
        if (num_2 != 0) {
            result = num_1 / num_2
            symbol = "/"
        } else {
            game.splash("Error: Cannot divide by 0")
        }
    } else {
        game.splash("Invalid choice!")
    }

    // 4. Show the result
    if (choice >= 1 && choice <= 4) {
        game.splash(num_1 + " " + symbol + " " + num_2 + " = " + result)
    }
})
