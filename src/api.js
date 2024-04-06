import { get, ref, limitToFirst, query } from 'firebase/database';
export const getAllTeachers = async db => {
  try {
    const dataRef = ref(db, '/');
    const snapshot = await get(dataRef);
    if (snapshot.exists()) {
      const data = snapshot.val();
      return data;
    } else {
      console.log('No data available');
      return null;
    }
  } catch (error) {
    console.error('Error getting data:', error);
    return null;
  }
};

//---------------
// export const getAllTeachers = async db => {
//   try {
//     const dataRef = ref(db, '/');
//     const firstFourQuery = query(dataRef, limitToFirst(4));
//     const snapshot = await get(firstFourQuery);

//     if (snapshot.exists()) {
//       const data = snapshot.val();
//       console.log('data: ', data);
//       return data;
//     } else {
//       console.log('No data available');
//       return null;
//     }
//   } catch (error) {
//     console.error('Error getting data:', error);
//     return null;
//   }
// };

export const getStartTeachers = async db => {
  try {
    const dataRef = ref(db, '/');
    const firstFourQuery = query(dataRef, limitToFirst(4));
    const snapshot = await get(firstFourQuery);

    if (snapshot.exists()) {
      const data = snapshot.val();
      return data;
    } else {
      console.log('No data available');
      return null;
    }
  } catch (error) {
    console.error('Error getting data:', error);
    return null;
  }
};

//----------------Auth--------------------//
