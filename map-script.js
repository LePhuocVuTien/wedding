'use strict';

async function initMaps() {
  await google.maps.importLibrary("maps");
  await google.maps.importLibrary("marker");

  await initMap(
    "bride-party-map-canvas",
    new google.maps.LatLng(16.364025, 107.863386),
    "Nhà hàng Thanh Thanh",
    "NHÀ GÁI ⏰ 10:30 AM"
  );

  await initMap(
    "groom-party-map-canvas",
    new google.maps.LatLng(16.376144, 107.846131),
    "Trung tâm tiệc cưới Trung Hải",
    "NHÀ TRAI ⏰ 11:00 AM"
  );
}

async function initMap(mapElementId, center, title, infoContent) {
  var mapOptions = {
    zoom: 18,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    center: center,
    panControl: true,
    zoomControl: true,
    mapTypeControl: true,
    streetViewControl: true,
    overviewMapControl: true,
    mapId: mapElementId
  };

  var map = new google.maps.Map(document.getElementById(mapElementId), mapOptions);

  const img = document.createElement("img");
  img.src = `images/destination.png`; // Custom icon
  img.style.width = "50px";
  img.style.height = "50px";
  img.style.objectFit = "contain";

  const marker = new google.maps.marker.AdvancedMarkerElement({
    map: map,
    position: center,
    content: img,
  });

  const infoWindow = new google.maps.InfoWindow({
    content: `
      <div style="font-size:14px">
        <strong>${title}</strong><br/>
        ${infoContent}
      </div>
    `,
  });
    
  infoWindow.open({
    map: map,
    anchor: marker
  });

  marker.addListener("click", () => {
    infoWindow.open({
      anchor: marker,
      map,
    });
  });
}

initMaps()