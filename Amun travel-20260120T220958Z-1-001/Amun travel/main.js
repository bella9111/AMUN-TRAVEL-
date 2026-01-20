document.addEventListener('DOMContentLoaded', () => {
    // Set active navigation link
    document.querySelectorAll('.nav-links a').forEach(link => {
        if (link.href === window.location.href) {
            link.classList.add('active');
        }
    });
});

function startItinerary() {
    document.getElementById('ai-itinerary').scrollIntoView({ behavior: 'smooth' });
}

function updateItinerary() {
    const budget = document.getElementById('budget').value;
    const duration = document.getElementById('duration').value;
    const resultsDiv = document.getElementById('itinerary-results');

    resultsDiv.classList.remove('hidden');

    const itinerary = generateItinerary(budget, duration);
    resultsDiv.innerHTML = itinerary;
}

function generateItinerary(budget, duration) {
    const itineraries = {
        low: {
            short: `
                <h3>Budget-Friendly 3-5 Day Itinerary</h3>
                <ul>
                    <li>Day 1: Explore Cairo's historic sites</li>
                    <li>Day 2: Visit the Pyramids of Giza</li>
                    <li>Day 3: Nile River cruise</li>
                </ul>
                <p>Recommended Budget Hotels: $50-100/night</p>
            `,
            medium: `
                <h3>Budget-Friendly 6-10 Day Itinerary</h3>
                <ul>
                    <li>Days 1-3: Cairo exploration</li>
                    <li>Days 4-6: Luxor and Valley of the Kings</li>
                    <li>Days 7-10: Red Sea relaxation</li>
                </ul>
                <p>Recommended Budget Hotels: $50-100/night</p>
            `,
            long: `
                <h3>Budget-Friendly Extended Stay</h3>
                <ul>
                    <li>Weeks 1-2: Cultural exploration</li>
                    <li>Weeks 3-4: Beach destinations</li>
                </ul>
                <p>Recommended Budget Hotels: $50-100/night</p>
            `
        },
        medium: {
            short: `
                <h3>Comfortable 3-5 Day Itinerary</h3>
                <ul>
                    <li>Day 1: Luxury hotel stay in Cairo</li>
                    <li>Day 2: Private tour of the Pyramids</li>
                    <li>Day 3: Nile dinner cruise</li>
                </ul>
                <p>Recommended Hotels: $100-200/night</p>
            `,
            medium: `
                <h3>Comfortable 6-10 Day Itinerary</h3>
                <ul>
                    <li>Days 1-4: Cairo and Giza</li>
                    <li>Days 5-7: Luxor and Aswan</li>
                    <li>Days 8-10: Red Sea resort</li>
                </ul>
                <p>Recommended Hotels: $100-200/night</p>
            `,
            long: `
                <h3>Comfortable Extended Stay</h3>
                <ul>
                    <li>Weeks 1-2: Cultural and historical sites</li>
                    <li>Weeks 3-4: Luxury beach resorts</li>
                </ul>
                <p>Recommended Hotels: $100-200/night</p>
            `
        },
        high: {
            short: `
                <h3>Luxury 3-5 Day Itinerary</h3>
                <ul>
                    <li>Day 1: 5-star hotel in Cairo</li>
                    <li>Day 2: Private helicopter tour of the Pyramids</li>
                    <li>Day 3: Luxury Nile cruise</li>
                </ul>
                <p>Recommended Hotels: $200+/night</p>
            `,
            medium: `
                <h3>Luxury 6-10 Day Itinerary</h3>
                <ul>
                    <li>Days 1-4: Luxury Cairo experience</li>
                    <li>Days 5-7: Private Nile cruise</li>
                    <li>Days 8-10: 5-star Red Sea resort</li>
                </ul>
                <p>Recommended Hotels: $200+/night</p>
            `,
            long: `
                <h3>Luxury Extended Stay</h3>
                <ul>
                    <li>Weeks 1-2: Private tours and luxury stays</li>
                    <li>Weeks 3-4: Exclusive beach resorts</li>
                </ul>
                <p>Recommended Hotels: $200+/night</p>
            `
        }
    };

    return itineraries[budget][duration];
}