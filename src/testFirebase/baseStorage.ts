import { getStorage, ref } from 'firebase/storage';

import { app } from './base';

const storage = getStorage(app);
// export const storageRef = ref(storage);

export const imagesRef = ref(storage, 'images');

export const charger = ref(storage, 'images/desktop.jpg');
