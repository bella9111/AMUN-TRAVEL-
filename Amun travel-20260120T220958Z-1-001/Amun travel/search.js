const hotels = [
    {
        id: 1,
        name: "Nile View Hotel",
        location: "Cairo",
        price: 150,
        rating: 4.5,
        image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1a/ab/e0/15/exterior.jpg?w=900&h=-1&s=1",
        amenities: ["Pool", "Spa", "Restaurant", "WiFi", "Air Conditioning"],
        description: "Luxurious hotel with breathtaking views of the Nile River.",
        available: true,
        deals: ["Free cancellation", "Breakfast included"],
        distance: "2.5 km from city center"
    },
    {
        id: 2,
        name: "Pyramid Resort & Spa",
        location: "Giza",
        price: 220,
        rating: 4.8,
        image: "https://safarin.net/wp-content/uploads/2021/10/21-10-23_20-48-44.jpg",
        amenities: ["Pool", "Gym", "Restaurant", "WiFi", "Spa", "Parking"],
        description: "5-star resort with direct views of the pyramids.",
        available: true,
        deals: ["Pay at hotel", "Free airport shuttle"],
        distance: "1 km from Giza Pyramids"
    },
    {
        id: 3,
        name: "Red Sea Paradise",
        location: "Sharm El Sheikh",
        price: 180,
        rating: 4.3,
        image: "https://tse3.mm.bing.net/th/id/OIP.sVFc8LYmTXBPNk7Ky5TtvAHaE8?cb=iwc1&rs=1&pid=ImgDetMain",
        amenities: ["Beach Access", "Pool", "Restaurant", "WiFi", "Diving Center"],
        description: "Beachfront resort with private beach area.",
        available: true,
        deals: ["Non-refundable", "All-inclusive option"],
        distance: "On the beach"
    },
    {
        id: 4,
        name: "Luxor Palace Hotel",
        location: "Luxor",
        price: 120,
        rating: 4.1,
        image: "https://tse2.mm.bing.net/th/id/OIP.SK2k4xl1NLv_OJSJjpezpwHaE8?cb=iwc1&rs=1&pid=ImgDetMain",
        amenities: ["Pool", "Restaurant", "WiFi", "Tour Desk"],
        description: "Charming hotel located near Luxor Temple.",
        available: true,
        deals: ["Free cancellation", "Early check-in"],
        distance: "500m from Luxor Temple"
    },
    {
        id: 5,
        name: "Desert Oasis Lodge",
        location: "Bahariya",
        price: 90,
        rating: 3.9,
        image: "https://tse3.mm.bing.net/th/id/OIP.Ia29IM69ozKleO6ZMUPpfAHaEw?cb=iwc1&rs=1&pid=ImgDetMain",
        amenities: ["Pool", "Restaurant", "WiFi", "Desert Tours"],
        description: "Unique desert experience with traditional architecture.",
        available: true,
        deals: ["Pay later", "Free desert safari"],
        distance: "In the desert"
    }
];
document.addEventListener('DOMContentLoaded', () => {
    initViewToggle();
    initSearchFilters();
    performSearch();
});

function initViewToggle() {
    const gridViewBtn = document.getElementById('gridView');
    const listViewBtn = document.getElementById('listView');
    const resultsContainer = document.getElementById('resultsContainer');

    const setActiveView = (view) => {
        resultsContainer.classList.remove('grid-view', 'list-view');
        gridViewBtn.classList.remove('active');
        listViewBtn.classList.remove('active');
        
        resultsContainer.classList.add(`${view}-view`);
        document.getElementById(`${view}View`).classList.add('active');
        
        localStorage.setItem('preferredView', view);
    };

    gridViewBtn.addEventListener('click', () => setActiveView('grid'));
    listViewBtn.addEventListener('click', () => setActiveView('list'));

    const preferredView = localStorage.getItem('preferredView') || 'grid';
    setActiveView(preferredView);
}

function initSearchFilters() {
    const locationSelect = document.getElementById('location');
    const uniqueLocations = [...new Set(hotels.map(hotel => hotel.location))];
    
    uniqueLocations.forEach(location => {
        const option = document.createElement('option');
        option.value = location;
        option.textContent = location;
        locationSelect.appendChild(option);
    });

    document.getElementById('searchForm').addEventListener('submit', (e) => {
        e.preventDefault();  
        performSearch();
    });

    ['location', 'priceRange', 'rating', 'amenities', 'sortBy'].forEach(id => {
        const element = document.getElementById(id);
        if (element) {
            element.addEventListener('change', performSearch);
        }
    });
}

function performSearch() {
    const location = document.getElementById('location').value;
    const priceRange = document.getElementById('priceRange').value;
    const minRating = parseFloat(document.getElementById('rating').value) || 0;
    const selectedAmenities = Array.from(document.getElementById('amenities').selectedOptions)
        .map(option => option.value);
    const sortBy = document.getElementById('sortBy').value;

    let filteredResults = hotels.filter(hotel => {
        if (location !== 'all' && hotel.location.toLowerCase() !== location.toLowerCase()) {
            return false;
        }

        if (priceRange !== 'all') {
            switch (priceRange) {
                case 'budget': if (hotel.price > 100) return false; break;
                case 'medium': if (hotel.price <= 100 || hotel.price > 200) return false; break;
                case 'luxury': if (hotel.price <= 200) return false; break;
            }
        }

        if (hotel.rating < minRating) {
            return false;
        }

        if (selectedAmenities.length > 0 && 
            !selectedAmenities.every(amenity => hotel.amenities.includes(amenity))) {
            return false;
        }

        return true;
    });

    filteredResults = sortResults(filteredResults, sortBy);
    displayResults(filteredResults);
    updateResultsCount(filteredResults.length);
}

function sortResults(results, sortBy) {
    return [...results].sort((a, b) => {
        switch (sortBy) {
            case 'price-asc': return a.price - b.price;
            case 'price-desc': return b.price - a.price;
            case 'rating': return b.rating - a.rating;
            case 'name': return a.name.localeCompare(b.name); 
            default: return 0;
        }
    });
}

function displayResults(results) {
    const container = document.getElementById('resultsContainer');
    container.innerHTML = '';

    if (results.length === 0) {
        container.innerHTML = `
            <div class="no-results">
                <i class="fas fa-hotel"></i>
                <h3>No hotels found matching your criteria</h3>
                <p>Try adjusting your filters or search in a different location</p>
            </div>
        `;
        return;
    }

    results.forEach(hotel => {
        const card = createHotelCard(hotel);
        container.appendChild(card);
    });
}

function createHotelCard(hotel) {
    const card = document.createElement('div');
    card.className = 'result-card';
    card.dataset.id = hotel.id;

    const amenitiesHTML = hotel.amenities.map(amenity => 
        `<li><i class="fas fa-check"></i> ${amenity}</li>`
    ).join('');

    const dealsHTML = hotel.deals.map(deal => 
        `<span class="deal-badge"><i class="fas fa-gift"></i> ${deal}</span>`
    ).join(''); 

    const starsHTML = Array(5).fill(0).map((_, i) => 
        `<i class="fas fa-star${i < Math.floor(hotel.rating) ? '' : '-half-alt'}"></i>`
    ).join('');

    card.innerHTML = `
        <div class="card-image">
            <img src="${hotel.image}" alt="${hotel.name}" loading="lazy">
            <div class="image-overlay">
                <span class="price">$${hotel.price}<small>/night</small></span>
                ${dealsHTML}
            </div>
        </div>
        <div class="card-content">
            <div class="card-header">
                <h3>${hotel.name}</h3>
                <div class="rating">
                    ${starsHTML}
                    <span>${hotel.rating.toFixed(1)}</span>
                </div>
            </div>
            <div class="location">
                <i class="fas fa-map-marker-alt"></i> ${hotel.location} • ${hotel.distance}
            </div>
            <p class="description">${hotel.description}</p>
            <div class="amenities">
                <h4>Facilities:</h4>
                <ul>${amenitiesHTML}</ul>
            </div>
            <div class="card-footer">
                <button class="details-button">
                    <i class="fas fa-info-circle"></i> Details
                </button>
                <button class="book-button">
                    <i class="fas fa-calendar-check"></i> Book Now
                </button>
            </div>
        </div>
    `;

    card.querySelector('.details-button').addEventListener('click', () => {
        showHotelDetails(hotel.id);
    });

    card.querySelector('.book-button').addEventListener('click', () => {
        bookHotel(hotel.id);
    });

    return card;
}

function updateResultsCount(count) {
    const countElement = document.getElementById('resultsCount');
    if (countElement) {
        countElement.textContent = `${count} ${count === 1 ? 'hotel' : 'hotels'} found`;
    }
}

function showHotelDetails(hotelId) {
    const hotel = hotels.find(h => h.id === hotelId);
    if (!hotel) return;
    console.log('Showing details for:', hotel.name);
}

function bookHotel(hotelId) {
    const hotel = hotels.find(h => h.id === hotelId);
    if (!hotel) return;
    console.log('Booking hotel:', hotel.name);
}