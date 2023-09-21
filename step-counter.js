// Initialize variables
let stepCount = 0;
let isCounting = false;
let watchID = null;

// Function to update the step count on the web page
function updateStepCount() {
    document.getElementById('stepCount').textContent = stepCount;
}

// Function to start counting steps
function startCounting() {
    if (!isCounting) {
        // Check if the device supports the accelerometer API
        if ('ondevicemotion' in window) {
            watchID = window.addEventListener('devicemotion', function (e) {
                const acceleration = e.accelerationIncludingGravity;
                // Calculate the magnitude of acceleration
                const magnitude = Math.sqrt(
                    acceleration.x * acceleration.x +
                    acceleration.y * acceleration.y +
                    acceleration.z * acceleration.z
                );
                // Define a threshold to consider a step
                const stepThreshold = 10;
                if (magnitude > stepThreshold) {
                    stepCount++;
                    updateStepCount();
                }
            });
            isCounting = true;
            document.getElementById('startButton').disabled = true;
            document.getElementById('stopButton').disabled = false;
        } else {
            alert("Your device does not support the required sensors.");
        }
    }
}

// Function to stop counting steps
function stopCounting() {
    if (isCounting) {
        window.removeEventListener('devicemotion', watchID);
        isCounting = false;
        document.getElementById('startButton').disabled = false;
        document.getElementById('stopButton').disabled = true;
    }
}

// Attach event listeners to the buttons
document.getElementById('startButton').addEventListener('click', startCounting);
document.getElementById('stopButton').addEventListener('click', stopCounting);
