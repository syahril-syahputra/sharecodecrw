interface IPremiumColor {
    color: string;
    name: string;
    isWhite: boolean;
}

export const PremiumColor: IPremiumColor[] = [
    { color: '#789DBC', name: 'Air Blue', isWhite: true },
    { color: '#FFE3E3', name: 'Rose', isWhite: true },
    { color: '#C9E9D2', name: 'Tea', isWhite: false },
    { color: '#BEAEE2', name: 'Lavender', isWhite: false },
    { color: '#FFCACC', name: 'Pink', isWhite: true },
];
