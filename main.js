function SetMinDate() {
    const today = new Date().toISOString().split("T")[0];
    const eventdate = document.querySelector(".date");

    if (eventdate) {
        eventdate.setAttribute("min", today);

        eventdate.addEventListener("input", function() {
            if (eventdate.value < today) {
                eventdate.value = today;
            }
        });
    }
}

SetMinDate();

function addEvent() {
    const eventName = document.querySelector(".name").value;
    const eventDate = document.querySelector(".date").value;
    const eventOrganizer = document.querySelector(".org").value;


    if (!eventName || !eventDate || !eventOrganizer) {
        alert("Please fill in all fields before adding the event.");
        return;
    }

    const eventTimeStamp = new Date(eventDate).getTime();

    const event = {
        name: eventName,
        date: eventDate,
        organizer: eventOrganizer,
        timestamp: eventTimeStamp,
    };

    let events = JSON.parse(localStorage.getItem("events")) || [];
    events.push(event);
    localStorage.setItem("events", JSON.stringify(events));
    console.log(events);

    const inputs = document.querySelectorAll("input");
    inputs.forEach((input) => (input.value = ""));
    displayEvents();
}

function displayEvents() {
    const events = JSON.parse(localStorage.getItem("events")) || [];
    const eventsList = document.querySelector(".events");
    eventsList.innerHTML = "";
    events.forEach((event, index) => {
        eventsList.innerHTML += `
        <div class="event">
            <h3>${event.name}</h3>
            <p><span>By</span> ${event.organizer}</p>
            <p><span>On</span> ${event.date}</p>
            <p><span>Time Left</span> ${calculateTimeLeft(event.timestamp)}</p>
            <button onClick="deleteEvent(${index})">Delete</button>
        </div>
        `;
    });
}

function deleteEvent(index) {
    let events = JSON.parse(localStorage.getItem("events"));
    events.splice(index, 1);
    localStorage.setItem("events", JSON.stringify(events));
    displayEvents();
}

setInterval(displayEvents, 1000)

function calculateTimeLeft(timestamp) {
    const now = new Date().getTime();
    const timeLeft = timestamp - now;

    if (timeLeft <= 0) {
        return "Event has passed";
    }

    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000 )

    return `${days}d ${hours}h ${minutes}m ${seconds}s`;
}

displayEvents();
