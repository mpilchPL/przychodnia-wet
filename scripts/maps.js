// Initialize and add the map
function initMap() {
    // The location of Uluru
    const vet = { lat: 50.080402, lng: 20.009178 };
    // The map, centered at Uluru
    const map = new google.maps.Map(document.getElementById("map"), {
      zoom: 15,
      center: vet,
    });
    // The marker, positioned at Uluru
    const marker = new google.maps.Marker({
      position: vet,
      map: map,
    });
  }