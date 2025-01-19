export const countries = [
	{ code: 'JP', name: 'Japan' },
];
export const countries2 = [
    { code: 'IN', name: 'India' },
    { code: 'HK', name: 'Hong Kong' },
];
export const countries3 = [
    { code: 'AU', name: 'Australia' }, //未成年者NG
    { code: 'NZ', name: 'New Zealand' }, //未成年者NG
    { code: 'CA', name: 'Canada' }, //未成年者NG
    { code: 'MX', name: 'Mexico' }, //未成年者NG
    { code: 'IE', name: 'Ireland' }, //未成年者NG
    { code: 'IT', name: 'Italy' },
    { code: 'GB', name: 'United Kingdom' },
    { code: 'EE', name: 'Estonia' },
    { code: 'AT', name: 'Austria' },
    { code: 'NL', name: 'Netherlands' },
    { code: 'GR', name: 'Greece' }, //無修正
    { code: 'CH', name: 'Switzerland' },
    { code: 'SE', name: 'Sweden' },
    { code: 'ES', name: 'Spain' },
    { code: 'SI', name: 'Slovenia' },
    { code: 'CZ', name: 'Czechia' },
    { code: 'DK', name: 'Denmark' },
    { code: 'DE', name: 'Germany' }, //無修正
    { code: 'NO', name: 'Norway' },
    { code: 'HU', name: 'Hungary' },
    { code: 'FI', name: 'Finland' },
    { code: 'FR', name: 'France' },
    { code: 'BG', name: 'Bulgaria' },
    { code: 'BE', name: 'Belgium' },
	{ code: 'PL', name: 'Poland' },
    { code: 'PT', name: 'Portugal' },
    { code: 'MT', name: 'Malta' },
    { code: 'LV', name: 'Latvia' },
    { code: 'LT', name: 'Lithuania' },
    { code: 'RO', name: 'Romania' },
];
export const countries4 = [
    { code: 'US', name: 'United States' }, //未成年
];
export const countries5 = [
    { code: 'BR', name: 'Brazil' }, //未成年
    { code: 'ZA', name: 'South Africa' },
];



export const stripeSupportedCountries = [
	'AU', // Australia
	'AT', // Austria
	'BE', // Belgium
	'BR', // Brazil
	'BG', // Bulgaria
	'CA', // Canada
	'HR', // Croatia
	'CY', // Cyprus
	'CZ', // Czech Republic
	'DK', // Denmark
	'EE', // Estonia
	'FI', // Finland
	'FR', // France
	'DE', // Germany
	'GH', // Ghana
	'GI', // Gibraltar
	'GR', // Greece
	'HK', // Hong Kong
	'HU', // Hungary
	'IN', // India
	'ID', // Indonesia
	'IE', // Ireland
	'IT', // Italy
	'JP', // Japan
	'KE', // Kenya
	'LV', // Latvia
	'LI', // Liechtenstein
	'LT', // Lithuania
	'LU', // Luxembourg
	'MY', // Malaysia
	'MT', // Malta
	'MX', // Mexico
	'NL', // Netherlands
	'NZ', // New Zealand
	'NG', // Nigeria
	'NO', // Norway
	'PL', // Poland
	'PT', // Portugal
	'RO', // Romania
	'SG', // Singapore
	'SK', // Slovakia
	'SI', // Slovenia
	'ZA', // South Africa
	'ES', // Spain
	'SE', // Sweden
	'CH', // Switzerland
	'TH', // Thailand
	'AE', // United Arab Emirates
	'GB', // United Kingdom
	'US', // United States
  ];
  

/*

日本郵便が受け付ける国
export const countries = [
	{ code: 'JP', name: 'Japan' },
];
export const countries1 = [
	{ code: 'CN', name: 'China' },
	{ code: 'KR', name: 'Korea, Republic of' },
	{ code: 'TW', name: 'Taiwan' },
];

export const countries2 = [
	{ code: 'AF', name: 'Afghanistan' },
	{ code: 'IN', name: 'India' },
	{ code: 'ID', name: 'Indonesia' },
	{ code: 'KH', name: 'Cambodia' },
	{ code: 'KP', name: 'North Korea' },
	{ code: 'SG', name: 'Singapore' },
	{ code: 'LK', name: 'Sri Lanka' },
	{ code: 'TH', name: 'Thailand' },
	{ code: 'NP', name: 'Nepal' },
	{ code: 'PK', name: 'Pakistan' },
	{ code: 'PW', name: 'Palau' },
	{ code: 'BD', name: 'Bangladesh' },
	{ code: 'TL', name: 'Timor-Leste' },
	{ code: 'PH', name: 'Philippines' },
	{ code: 'BT', name: 'Bhutan' },
	{ code: 'BN', name: 'Brunei' },
	{ code: 'VN', name: 'Vietnam' },
	{ code: 'HK', name: 'Hong Kong' },
	{ code: 'MH', name: 'Marshall Islands' },
	{ code: 'MO', name: 'Macau' },
	{ code: 'MY', name: 'Malaysia' },
	{ code: 'FM', name: 'Micronesia' },
	{ code: 'MM', name: 'Myanmar' },
	{ code: 'MV', name: 'Maldives' },
	{ code: 'MN', name: 'Mongolia' },
	{ code: 'LA', name: 'Laos' },
];


export const countries3 = [
	{ code: 'AU', name: 'Australia' },
	{ code: 'NZ', name: 'New Zealand' },
	{ code: 'CA', name: 'Canada' },
	{ code: 'MX', name: 'Mexico' },
	{ code: 'AE', name: 'United Arab Emirates' },
	{ code: 'YE', name: 'Yemen' },
	{ code: 'IL', name: 'Israel' },
	{ code: 'IQ', name: 'Iraq' },
	{ code: 'IR', name: 'Iran' },
	{ code: 'SA', name: 'Saudi Arabia' },
	{ code: 'TR', name: 'Turkey' },
	{ code: 'IS', name: 'Iceland' },
	{ code: 'IE', name: 'Ireland' },
	{ code: 'IT', name: 'Italy' },
	{ code: 'GB', name: 'United Kingdom' },
	{ code: 'EE', name: 'Estonia' },
	{ code: 'AT', name: 'Austria' },
	{ code: 'NL', name: 'Netherlands' },
	{ code: 'GG', name: 'Guernsey' },
	{ code: 'KZ', name: 'Kazakhstan' },
	{ code: 'MK', name: 'North Macedonia' },
	{ code: 'CY', name: 'Cyprus' },
	{ code: 'GR', name: 'Greece' },
	{ code: 'KG', name: 'Kyrgyzstan' },
	{ code: 'HR', name: 'Croatia' },
	{ code: 'XK', name: 'Kosovo' },
	{ code: 'SM', name: 'San Marino' },
	{ code: 'GI', name: 'Gibraltar' },
	{ code: 'JE', name: 'Jersey' },
	{ code: 'GE', name: 'Georgia' },
	{ code: 'CH', name: 'Switzerland' },
	{ code: 'SE', name: 'Sweden' },
	{ code: 'ES', name: 'Spain' },
	{ code: 'SK', name: 'Slovakia' },
	{ code: 'SI', name: 'Slovenia' },
	{ code: 'RS', name: 'Serbia' },
	{ code: 'TJ', name: 'Tajikistan' },
	{ code: 'CZ', name: 'Czechia' },
	{ code: 'DK', name: 'Denmark' },
	{ code: 'DE', name: 'Germany' },
	{ code: 'TM', name: 'Turkmenistan' },
	{ code: 'NO', name: 'Norway' },
	{ code: 'VA', name: 'Vatican City' },
	{ code: 'HU', name: 'Hungary' },
	{ code: 'FI', name: 'Finland' },
	{ code: 'FR', name: 'France' },
	{ code: 'BG', name: 'Bulgaria' },
	{ code: 'BY', name: 'Belarus' },
	{ code: 'BE', name: 'Belgium' },
	{ code: 'PL', name: 'Poland' },
	{ code: 'BA', name: 'Bosnia and Herzegovina' },
	{ code: 'PT', name: 'Portugal' },
	{ code: 'MT', name: 'Malta' },
	{ code: 'MC', name: 'Monaco' },
	{ code: 'MD', name: 'Moldova' },
	{ code: 'ME', name: 'Montenegro' },
	{ code: 'LV', name: 'Latvia' },
	{ code: 'LT', name: 'Lithuania' },
	{ code: 'LI', name: 'Liechtenstein' },
	{ code: 'RO', name: 'Romania' },
	{ code: 'LU', name: 'Luxembourg' },
	{ code: 'RU', name: 'Russia' },
];


export const countries4 = [
	{ code: 'US', name: 'United States' },
	{ code: 'GU', name: 'Guam' },
];

export const countries5 = [
	{ code: 'AR', name: 'Argentina' },
	{ code: 'CL', name: 'Chile' },
	{ code: 'BR', name: 'Brazil' },
	{ code: 'PE', name: 'Peru' },
	{ code: 'BO', name: 'Bolivia' },
	{ code: 'DZ', name: 'Algeria' },
	{ code: 'EG', name: 'Egypt' },
	{ code: 'NG', name: 'Nigeria' },
	{ code: 'ZA', name: 'South Africa' },
	{ code: 'MA', name: 'Morocco' },
];

*/