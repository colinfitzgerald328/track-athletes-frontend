// AthleteList.js

import React from 'react';
import AthleteCard from './AthleteCard';

const athletesData = [{'aaAthleteId': '14478094',
'familyName': 'HURTA-KLECKER',
'givenName': 'Sage',
'birthDate': '23 JUN 1998',
'disciplines': '800 Metres, 1500 Metres, One Mile',
'iaafId': 301755,
'gender': 'Women',
'country': 'USA',
'urlSlug': 'united-states/sage-hurta-klecker-14478094',
'__typename': 'AthleteSearchResult',
'image_url': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTToqtnFZPKR6M5p8jOxOD5p5ioZVUqEC5hBZ5H0FKxvSRGZgTInVctiWLSRQ&s',
'wikipedia_url': null,
'instagram_url': 'https://instagram.com/hurtasage'},
{'aaAthleteId': '14373955',
'familyName': 'WATSON',
'givenName': 'Sage',
'birthDate': '20 JUN 1994',
'disciplines': '4x400 Metres Relay, 400 Metres Hurdles, 400 Metres',
'iaafId': 258172,
'gender': 'Women',
'country': 'CAN',
'urlSlug': 'canada/sage-watson-14373955',
'__typename': 'AthleteSearchResult',
'image_url': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXF8WbuNYUSf2yY-gJGepvKFpH4EKKT3hiRzQb1W_WebL8czSeO35DgnmRdoU&s',
'wikipedia_url': 'https://en.wikipedia.org/wiki/Sage_Watson',
'instagram_url': 'https://instagram.com/sagewatson'},
{'aaAthleteId': '14250310',
'familyName': 'SAGE',
'givenName': 'Don',
'birthDate': '05 OCT 1981',
'disciplines': '1500 Metres, One Mile, 3000 Metres',
'iaafId': 176445,
'gender': 'Men',
'country': 'USA',
'urlSlug': 'united-states/don-sage-014250310',
'__typename': 'AthleteSearchResult',
'image_url': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-KPEvX7hwkcpmTK1LCpHhC9W8lw33-OmEXyMq8O8LFJot8MPz53JjppFxmA&s',
'instagram_url': 'https://instagram.com/saga_da_don'},
{'aaAthleteId': '14988829',
'familyName': 'SAGE',
'givenName': 'Noah',
'birthDate': null,
'disciplines': 'Distance Medley Relay, 400 Metres, 4x400 Metres Relay',
'iaafId': null,
'gender': 'Men',
'country': 'USA',
'urlSlug': 'united-states/noah-sage-14988829',
'__typename': 'AthleteSearchResult',
'image_url': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0HTA7D-lwx0IfTUj0UhUdOmXv2OmDJfiVGEtkZQ7vftO2E1GD30krnVpnfQ&s',
'instagram_url': 'https://instagram.com/sagenoah3'},
{'aaAthleteId': '14252966',
'familyName': 'THAMES',
'givenName': 'Sage',
'birthDate': '23 MAY 1982',
'disciplines': 'Pole Vault',
'iaafId': 170987,
'gender': 'Men',
'country': 'USA',
'urlSlug': 'united-states/sage-thames-014252966',
'__typename': 'AthleteSearchResult',
'image_url': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3Yks37I2-3w5i83jo0-LJJjz44q7fWV334OplCJOsf9JHrqrIyrAZBv1o74w&s',
'instagram_url': null}];

const AthleteList = () => {
  return (
    <div className="athlete-list">
      {athletesData.map((athlete, index) => (
        <AthleteCard key={index} athlete={athlete} />
      ))}
    </div>
  );
};

export default AthleteList;
