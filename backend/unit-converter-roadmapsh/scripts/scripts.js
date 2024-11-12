document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('form');
    const formId = form.id;
    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the default form submission

        const formData = new FormData(form);
        const data = {};
        formData.forEach((value, key) => {
            data[key] = value;
        });

        console.log('Form data:', data);
        let result;
        switch (formId) {
            case 'length-converter-form':
                console.log("Length converter form data:", data);
                result = convertLength(data);
                // Send data to the backend for form1
                break;
            case 'temperature-converter-form':
                console.log("Temperature converter form data:", data);
                result = convertTemperature(data);
                // Send data to the backend for form2
                break;
            case 'weight-converter-form':
                result = convertWeight(data);
                console.log("Weight converter form data:", data);
                // Send data to the backend for form3
                break;
            default:
                console.error('Unknown form ID:', formId);
        }
        console.log('Result:', result);
        // Fill out the result section with the result
        const resultElement = document.querySelector('#result');
        const resultSection = document.querySelector('#conversion-result');

        // Set the result text content
        resultElement.textContent = result;

        // Make the result section visible
        resultSection.style.display = 'block'
    });

    const resetButton = document.querySelector('button[type="reset"]');
    resetButton.addEventListener('click', function() {
        const resultElement = document.querySelector('#result');
        const resultSection = document.querySelector('#conversion-result');
        resultSection.style.display = 'none';
        resultElement.textContent = '';
    });
});

function convertLength(data) {
    const unitTable = {
        "meters": 1,
        "kilometers": 0.001,
        "centimeters": 100,
        "millimeters": 1000,
        "miles": 0.000621371,
        "yards": 1.09361,
        "feet": 3.28084,
        "inches": 39.3701
    }
    console.log(data);
    const from = data['input-unit'];
    const to = data['output-unit'];
    const value = data['input-value'];

    console.log('Length conversion:', from, to, value);
    console.log("Types of from and to:", typeof from, typeof to);

    const result = (value * unitTable[to]) / unitTable[from];

    return result;
}

function convertTemperature(data) {
    const from = data['input-unit'];
    const to = data['output-unit'];
    const value = data['input-value'];

    let result;
    if (from === 'celsius' && to === 'fahrenheit') {
        result = value * 9 / 5 + 32;
    } else if (from === 'fahrenheit' && to === 'celsius') {
        result = (value - 32) * 5 / 9;
    } else {
        console.error('Unknown temperature conversion:', from, to);
    }

    return result;
}

function convertWeight(data) {
    const unitTable = {
        "kilograms": 1,
        "grams": 1000,
        "milligrams": 1000000,
        "pounds": 2.20462,
        "ounces": 35.274
    }
    console.log(data);
    const from = data['input-unit'];
    const to = data['output-unit'];
    const value = data['input-value'];

    const result = value * unitTable[to] / unitTable[from];

    return result;
}