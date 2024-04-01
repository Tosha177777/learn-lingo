import { get, ref } from 'firebase/database';

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

//----------------Auth--------------------//

// export const registration = async auth => {
//   try {
//     const data = await createUserWithEmailAndPassword(auth,);
//   } catch (error) {
//     console.log('error: ', error);
//   }
// };
