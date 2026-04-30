/**
 * Simple CSV generation helper
 * Converts an array of objects into a CSV string
 */
export const generateCSV = (data, columns) => {
  if (!data || !data.length) return '';

  // Header row
  const header = columns.map(col => `"${col.label.replace(/"/g, '""')}"`).join(',');

  // Data rows
  const rows = data.map(item => {
    return columns.map(col => {
      let value = '';
      
      // Support nested keys like 'tripSummary.pickupDate'
      if (col.key.includes('.')) {
        value = col.key.split('.').reduce((obj, key) => (obj ? obj[key] : ''), item);
      } else {
        value = item[col.key];
      }

      // Handle null/undefined
      if (value === null || value === undefined) value = '';
      
      // Convert to string and escape quotes
      const stringValue = String(value).replace(/"/g, '""');
      return `"${stringValue}"`;
    }).join(',');
  });

  return [header, ...rows].join('\n');
};

/**
 * Send CSV as a downloadable response
 */
export const sendCSVResponse = (res, csvContent, filename) => {
  res.setHeader('Content-Type', 'text/csv');
  res.setHeader('Content-Disposition', `attachment; filename=${filename}_${new Date().getTime()}.csv`);
  return res.status(200).send(csvContent);
};
