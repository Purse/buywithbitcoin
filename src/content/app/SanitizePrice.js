const countryConfigs = {
  us: {
    currency: 'USD',
    domain: '.com',
    symbol: '\u0024',
    decimals: 2,
    decimal_separator: '.',
  },
  uk: {
    currency: 'GBP',
    domain: '.co.uk',
    symbol: '\u00a3',
    decimals: 2,
    decimal_separator: '.',
  },
  ca: {
    currency: 'CAD',
    domain: '.ca',
    symbol: '\u0024',
    decimals: 2,
    additional_bs: 'CDN',
    decimal_separator: '.',
  },
  de: {
    currency: 'EUR',
    domain: '.de',
    symbol: '\u20ac',
    decimals: 2,
    decimal_separator: ',',
  },
  jp: {
    currency: 'JPY',
    domain: '.co.jp',
    symbol: '\u00A5',
    decimals: 0,
    decimal_separator: '.',
  },
};

export default function (priceStr = '', country) {
  const countryData = countryConfigs[country.toLowerCase()];

  // coerces into float formatted string
  let price = priceStr.replace(new RegExp(`[^0-9.,-]+`, 'g'), ''); // strip all non price characters

  // Guess the decimal_separator using country data and the actual string.
  // Since amazon tends to mix up decimal separators due to their english translation wonkiness.
  let decimal_separater = countryData.decimal_separator;
  if ([',', '.'].includes(price.charAt(price.length - countryData.decimals - 1))) {
    decimal_separater = price.charAt(price.length - 3);
  }

  // strip all non price characters again (using correct decimal_separator)
  price = price.replace(new RegExp(`[^0-9${decimal_separater || '.'}-]+`, 'g'), '');

  // convert decimal_separater to periods
  if (decimal_separater !== '.') {
    price = price.replace(decimal_separater, '.');
  }

  // parse into precision fixed float
  price = parseFloat(price).toFixed(countryData.decimals || 2);

  return parseFloat(price);
}
