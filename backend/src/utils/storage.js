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
const TALENT_DATA_FILE = path.join(DATA_DIR, 'talent-data.json');

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
    "participantData": {
      "Χρστίνα": "πατατό... Τάρταρα",
      "Άρης": "Ροδόλευκος Πειρασμός",
      "Σιλβάνα": "Τηγανισμανακατέματα ή... stir-fry",
      "Άρης 2": "ΟΠΕΚΕΠΕδάκια",
      "Καλλίτσα": "Ψαρονεύρι με santa baby potatoes"
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

/**
 * Load talent data from file
 */
export const loadTalentData = () => {
  try {
    ensureDataDir();
    
    if (fs.existsSync(TALENT_DATA_FILE)) {
      const fileContent = fs.readFileSync(TALENT_DATA_FILE, 'utf8');
      return JSON.parse(fileContent);
    }
    
    // Return default data if file doesn't exist
    return {
      athleticPerformance: {
        participantData: {},
        scores: {},
        playerVotes: {},
        currentPlayer: 1
      },
      danceMusicalPerformance: {
        participantData: {},
        scores: {},
        playerVotes: {},
        currentPlayer: 1
      },
      theatricalPerformance: {
        participantData: {},
        scores: {},
        playerVotes: {},
        currentPlayer: 1
      }
    };
  } catch (error) {
    console.error('Error loading talent data:', error);
    return null;
  }
};

/**
 * Save talent data to file
 */
export const saveTalentData = (data) => {
  try {
    ensureDataDir();
    fs.writeFileSync(TALENT_DATA_FILE, JSON.stringify(data, null, 2), 'utf8');
    return true;
  } catch (error) {
    console.error('Error saving talent data:', error);
    return false;
  }
};
