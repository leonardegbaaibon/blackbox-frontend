const mapSettings = {
  clickableIcons: false,
  streetViewControl: true,
  panControlOptions: false,
  gestureHandling: 'cooperative',
  // backgroundColor: COLORS.LANDSCAPE,
  mapTypeControl: true,
  zoomControlOptions: {
    style: 'SMALL',
  },
  zoom: 16,
  // minZoom: 2,
  // maxZoom: 8,
  // styles: [
  //   {
  //     elementType: 'geometry',
  //     stylers: [
  //       {
  //         color: '#f5f5f5',
  //       },
  //     ],
  //   },
  //   {
  //     elementType: 'labels.icon',
  //     stylers: [
  //       {
  //         visibility: 'off',
  //       },
  //     ],
  //   },
  //   {
  //     elementType: 'labels.text.fill',
  //     stylers: [
  //       {
  //         color: '#616161',
  //       },
  //     ],
  //   },
  //   {
  //     elementType: 'labels.text.stroke',
  //     stylers: [
  //       {
  //         color: '#f5f5f5',
  //       },
  //     ],
  //   },
  //   {
  //     featureType: 'administrative.land_parcel',
  //     elementType: 'labels.text.fill',
  //     stylers: [
  //       {
  //         color: '#bdbdbd',
  //       },
  //     ],
  //   },
  //   {
  //     featureType: 'poi',
  //     elementType: 'geometry',
  //     stylers: [
  //       {
  //         color: '#eeeeee',
  //       },
  //     ],
  //   },
  //   {
  //     featureType: 'poi',
  //     elementType: 'labels.text.fill',
  //     stylers: [
  //       {
  //         color: '#757575',
  //       },
  //     ],
  //   },
  //   {
  //     featureType: 'poi.park',
  //     elementType: 'geometry',
  //     stylers: [
  //       {
  //         color: '#e5e5e5',
  //       },
  //     ],
  //   },
  //   {
  //     featureType: 'poi.park',
  //     elementType: 'labels.text.fill',
  //     stylers: [
  //       {
  //         color: '#9e9e9e',
  //       },
  //     ],
  //   },
  //   {
  //     featureType: 'road',
  //     elementType: 'geometry',
  //     stylers: [
  //       {
  //         color: '#ffffff',
  //       },
  //     ],
  //   },
  //   {
  //     featureType: 'road.arterial',
  //     elementType: 'labels.text.fill',
  //     stylers: [
  //       {
  //         color: '#757575',
  //       },
  //     ],
  //   },
  //   {
  //     featureType: 'road.highway',
  //     elementType: 'geometry',
  //     stylers: [
  //       {
  //         color: '#dadada',
  //       },
  //     ],
  //   },
  //   {
  //     featureType: 'road.highway',
  //     elementType: 'labels.text.fill',
  //     stylers: [
  //       {
  //         color: '#616161',
  //       },
  //     ],
  //   },
  //   {
  //     featureType: 'road.local',
  //     elementType: 'labels.text.fill',
  //     stylers: [
  //       {
  //         color: '#9e9e9e',
  //       },
  //     ],
  //   },
  //   {
  //     featureType: 'transit.line',
  //     elementType: 'geometry',
  //     stylers: [
  //       {
  //         color: '#e5e5e5',
  //       },
  //     ],
  //   },
  //   {
  //     featureType: 'transit.station',
  //     elementType: 'geometry',
  //     stylers: [
  //       {
  //         color: '#eeeeee',
  //       },
  //     ],
  //   },
  //   {
  //     featureType: 'water',
  //     elementType: 'geometry',
  //     stylers: [
  //       {
  //         color: '#c9c9c9',
  //       },
  //     ],
  //   },
  //   {
  //     featureType: 'water',
  //     elementType: 'labels.text.fill',
  //     stylers: [
  //       {
  //         color: '#9e9e9e',
  //       },
  //     ],
  //   },
  // ],
}

const POINT_MARKER_ICON_CONFIG = {
  start:
    'https://firebasestorage.googleapis.com/v0/b/fir-5fa64.appspot.com/o/start.svg?alt=media&token=78b989a4-6a54-41c6-ba04-5f5becff641c',
  end: 'https://firebasestorage.googleapis.com/v0/b/fir-5fa64.appspot.com/o/end.svg?alt=media&token=c85454b8-4d35-4bf2-8bc2-9ff80c70bf96',
  on: 'https://firebasestorage.googleapis.com/v0/b/fir-5fa64.appspot.com/o/on.svg?alt=media&token=f9e21630-9d82-4f81-8b6b-5d1d6e01efb9',
  off: 'https://firebasestorage.googleapis.com/v0/b/fir-5fa64.appspot.com/o/off.svg?alt=media&token=eadefb7c-e996-4c0f-8590-cc194e9a75b7',
  carGreen:
    'https://firebasestorage.googleapis.com/v0/b/tsaron-technologies.appspot.com/o/map-icons%2Fcar-48-green.png?alt=media&token=5abd5a55-586c-4518-93c1-1d528f252b8d',
  carRed:
    'https://firebasestorage.googleapis.com/v0/b/tsaron-technologies.appspot.com/o/map-icons%2Fcar-48-red.png?alt=media&token=59bfa472-c5dc-44dc-bafd-6095a3caf295',
}

export { mapSettings, POINT_MARKER_ICON_CONFIG }
