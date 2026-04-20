import { create } from 'zustand';

interface ExperimentState {
  appState: 'landing' | 'transitioning' | 'lab';
  setAppState: (state: 'landing' | 'transitioning' | 'lab') => void;
  selectedChemicals: string[];
  addChemical: (chemical: string) => void;
  reactionActive: boolean;
  setReactionActive: (active: boolean) => void;
  beakerColor: string;
  setBeakerColor: (color: string) => void;
  resetExperiment: () => void;
}

export const useExperimentStore = create<ExperimentState>((set) => ({
  appState: 'landing',
  setAppState: (state) => set({ appState: state }),
  selectedChemicals: [],
  addChemical: (chemical) => set((state) => {
    // Keep max 2 chemicals
    const newChems = [...state.selectedChemicals, chemical].slice(-2);
    // Combine colors if 2 selected
    let newColor = chemical;
    if (newChems.length === 2) {
      // Just a simple mix calculation or predetermined colors, actually let's just make it a random bright color or mix hex
      // For simplicity we will set the beakerColor in the component where we trigger the reaction
    }
    return { selectedChemicals: newChems };
  }),
  reactionActive: false,
  setReactionActive: (active) => set({ reactionActive: active }),
  beakerColor: '#00F0FF',
  setBeakerColor: (color) => set({ beakerColor: color }),
  resetExperiment: () => set({ selectedChemicals: [], reactionActive: false, beakerColor: '#00F0FF' }),
}));
