export function getTimezoneAbbreviation(
  dateString: string,
  returnAll: boolean = false
): string {
  let offset: string;

  if (dateString.endsWith('Z')) {
    offset = '+00:00';
  } else {
    const offsetMatch = dateString.match(/([+-]\d{2}:\d{2})$/);
    if (!offsetMatch) {
      return 'Unknown';
    }
    offset = offsetMatch[1];
  }

  const timezoneMap: Record<string, string[]> = {
    // ... same map as above
  };

  const timezones = timezoneMap[offset];

  if (!timezones || timezones.length === 0) {
    return `UTC${offset}`;
  }

  return returnAll ? timezones.join(' / ') : timezones[0];
}

export function getTimezoneAbbreviationSimply(dateString: string): string {
  // Extract timezone offset
  let offset: string;

  if (dateString.endsWith('Z')) {
    offset = '+00:00';
  } else {
    const offsetMatch = dateString.match(/([+-]\d{2}:\d{2})$/);
    if (!offsetMatch) {
      return 'Unknown';
    }
    offset = offsetMatch[1];
  }

  // Map offsets to common timezone abbreviations
  const timezoneMap: Record<string, string[]> = {
    '+00:00': ['GMT', 'UTC', 'WET'],
    '+01:00': ['CET', 'WAT', 'BST'],
    '+02:00': ['EET', 'CAT', 'SAST', 'CEST'],
    '+03:00': ['EAT', 'MSK', 'AST'],
    '+03:30': ['IRST'],
    '+04:00': ['GST', 'AZT'],
    '+04:30': ['AFT'],
    '+05:00': ['PKT', 'UZT'],
    '+05:30': ['IST'],
    '+05:45': ['NPT'],
    '+06:00': ['BST', 'KGT'],
    '+06:30': ['MMT'],
    '+07:00': ['ICT', 'WIB'],
    '+08:00': ['CST', 'SGT', 'HKT', 'WITA'],
    '+09:00': ['JST', 'KST', 'WIT'],
    '+09:30': ['ACST'],
    '+10:00': ['AEST', 'ChST'],
    '+10:30': ['ACDT'],
    '+11:00': ['AEDT', 'SBT'],
    '+12:00': ['NZST', 'FJT'],
    '+13:00': ['NZDT', 'TOT'],
    '-01:00': ['AZOT', 'CVT'],
    '-02:00': ['BRST', 'GST'],
    '-03:00': ['ART', 'BRT', 'PMST'],
    '-04:00': ['AST', 'EDT', 'CLT'],
    '-05:00': ['EST', 'CDT', 'PET'],
    '-06:00': ['CST', 'MDT', 'GALT'],
    '-07:00': ['MST', 'PDT'],
    '-08:00': ['PST', 'AKDT'],
    '-09:00': ['AKST', 'HDT'],
    '-10:00': ['HST', 'TAHT'],
    '-11:00': ['SST', 'NUT'],
    '-12:00': ['BIT'],
  };

  const timezones = timezoneMap[offset];

  if (!timezones || timezones.length === 0) {
    return `UTC${offset}`;
  }

  // Return the first (most common) timezone or all of them
  return timezones[0]; // Or return timezones.join('/') for all options
}

// Usage examples:
// console.log(getTimezoneAbbreviation("2025-11-30T23:59:59Z"));        // "GMT"
// console.log(getTimezoneAbbreviation("2025-11-30T23:59:59+01:00"));   // "CET"
// console.log(getTimezoneAbbreviation("2025-11-30T23:59:59+05:30"));   // "IST"
// console.log(getTimezoneAbbreviation("2025-11-30T23:59:59-08:00"));   // "PST"
// console.log(getTimezoneAbbreviation("2025-11-30T23:59:59-05:00"));   // "EST"


/**
 * 
console.log(getTimezoneAbbreviation("2025-11-30T23:59:59+01:00"));        // "CET"
console.log(getTimezoneAbbreviation("2025-11-30T23:59:59+01:00", true)); // "CET / WAT / BST"
 */