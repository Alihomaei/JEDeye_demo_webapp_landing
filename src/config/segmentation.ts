// src/config/segmentation.ts

export interface SegmentationClass {
  id: number;
  name: string;
  hexColor: string;
  category: 'anatomy' | 'structures' | 'instruments' | 'other';
  visible: boolean; // Whether to show in legend
}

export const segmentationClasses: SegmentationClass[] = [
  { id: 0,  name: 'Black Background',       hexColor: '#7f7f7f', category: 'other',       visible: false },
  { id: 1,  name: 'Abdominal Wall',         hexColor: '#d28c8c', category: 'anatomy',     visible: true },
  { id: 2,  name: 'Liver',                  hexColor: '#ff7272', category: 'anatomy',     visible: true },
  { id: 3,  name: 'Gastrointestinal Tract', hexColor: '#e7469c', category: 'anatomy',     visible: true },
  { id: 4,  name: 'Fat',                    hexColor: '#bab74b', category: 'anatomy',     visible: true },
  { id: 5,  name: 'Grasper',                hexColor: '#aaff00', category: 'instruments', visible: true },
  { id: 6,  name: 'Connective Tissue',      hexColor: '#ff5500', category: 'anatomy',     visible: true },
  { id: 7,  name: 'Blood',                  hexColor: '#ff0000', category: 'structures',  visible: true },
  { id: 8,  name: 'Cystic Duct',            hexColor: '#ffff00', category: 'structures',  visible: true },
  { id: 9,  name: 'L-hook Electrocautery',  hexColor: '#a9ffb8', category: 'instruments', visible: true },
  { id: 10, name: 'Gallbladder',            hexColor: '#ffa0a5', category: 'anatomy',     visible: true },
  { id: 11, name: 'Hepatic Vein',           hexColor: '#003280', category: 'anatomy',     visible: true },
  { id: 12, name: 'Liver Ligament',         hexColor: '#6f4a00', category: 'anatomy',     visible: true },
  { id: 13, name: 'Outline (ignore)',       hexColor: '#ffffff', category: 'other',       visible: false },
];

// Helper to get visible classes only
export const visibleClasses = segmentationClasses.filter(c => c.visible);

// Helper to group by category
export const classesByCategory = {
  anatomy: segmentationClasses.filter(c => c.category === 'anatomy' && c.visible),
  structures: segmentationClasses.filter(c => c.category === 'structures' && c.visible),
  instruments: segmentationClasses.filter(c => c.category === 'instruments' && c.visible),
};
