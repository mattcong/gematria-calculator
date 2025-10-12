export function getCipherKey(cipherName: string): string {
  const mapping: Record<string, string> = {
    'Standard Gematria': 'standard',
    'Pythagorean Gematria': 'pythagorean',
    'Reverse Pythagorean Gematria': 'reverse-pythagorean',
    'Simple Gematria': 'simple',
    'Multiple 6 Gematria': 'multiple6',
    'Alphanumeric Qabbala': 'alphanumeric',
  }

  return mapping[cipherName] || cipherName.toLowerCase().replace(/\s+/g, '-')
}
