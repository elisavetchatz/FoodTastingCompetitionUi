/**
 * Simple file-based storage utility
 * Saves data to JSON files for persistence
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Data directory path
const DATA_DIR = path.join(__dirname, '../../data');
const DATA_FILE = path.join(DATA_DIR, 'competition-data.json');

/**
 * Ensure data directory exists
 */
const ensureDataDir = () => {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
};

/**
 * Load data from file
 */
export const loadData = () => {
  try {
    ensureDataDir();
    
    if (fs.existsSync(DATA_FILE)) {
      const fileContent = fs.readFileSync(DATA_FILE, 'utf8');
      return JSON.parse(fileContent);
    }
    
    // Return default data if file doesn't exist
    return {
      participantData: {
        "Καλλίτσα": "Μακαρονόπιτα Κ...αλλιώς",
        "Καλλίτσα2": "Φτερουγίσματα με Κασέρια",
        "Μαρία Μικρή": "Σαλάτα της Χοληστερίνης",
        "Μαρία Μικρή2": "Ρολό Κιμά-> Απόπειρα 2",
        "Άρης": "Sevasto...bai",
        "Κοσμάς": "brownies του Κόσμου",
        "Σοφούλα": "Κοτόπουλο Γεμιστό",
        "Χριστίνα Χ.": "Του κολοκυθιού τα εννιάμερα",
        "Σλβάνα": "Σοφρίτο αλά... Σεβαστιώτα",
        "Γιάννης και Δημήτρης": "Μοσχάρι Κρασάτο με Μεθυσμένες Πατάτες",
        "Χριστίνα Β": "Ψαρονεύρι με ρύζι",
        "Μαρία Όμορφη": "Banana CAKE",
        "Μαρία Όμορφη και Σταυρούλα": "Φωλίτσες",
        "Πάολα": "Σνιτσελόνια με Ντιπ",
        "Ελένη": "Μπισκοτίνια με Εσάνς... Μελομακάρονο"
      },
      scores: {},
      playerVotes: {},
      currentPlayer: 1
    };
  } catch (error) {
    console.error('Error loading data:', error);
    return null;
  }
};

/**
 * Save data to file
 */
export const saveData = (data) => {
  try {
    ensureDataDir();
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf8');
    return true;
  } catch (error) {
    console.error('Error saving data:', error);
    return false;
  }
};
